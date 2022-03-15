import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import messageServices from './messageService';

const initialState = {
  messages: [],
  isError: false,
  isLoading: false,
  isSuccess: false,
  // user: '',
  message: '',
  user_id: null,
};

export const GetMessages = createAsyncThunk(
  'messages/get',
  async (_, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.token;

      return await messageServices.getMessages();
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.age ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const PostMessage = createAsyncThunk(
  'messages/post',
  async (payload, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.token;

      return await messageServices.postMessage(payload, token);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.response ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const DeleteMessage = createAsyncThunk(
  'messages/delete',
  async (id, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.token;
      return await messageServices.deleteMessage(id, token);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.response ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

//! slice
export const messageSlice = createSlice({
  name: 'messages',
  initialState,
  reducers: {
    reset: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(PostMessage.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(PostMessage.fulfilled, (state, action) => {
        state.isSuccess = true;
        state.isLoading = false;
        state.messages.push(action.payload.data.data);

        // state.user =
        //   action.payload.data.data.attributes.user.data.attributes.username;
      })
      .addCase(PostMessage.rejected, (state, action) => {
        state.isError = true;
        state.isLoading = false;
        state.message = action.payload;
      })

      .addCase(GetMessages.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(GetMessages.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.messages = action.payload.data.data;
      })
      .addCase(GetMessages.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(DeleteMessage.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(DeleteMessage.fulfilled, (state, action) => {
        state.isSuccess = true;
        state.isLoading = false;
        state.messages = state.messages.filter(
          (message) => message.id !== action.payload.data.data.id
        );
      })
      .addCase(DeleteMessage.rejected, (state, action) => {
        state.isError = true;
        state.isLoading = false;
      });
  },
});

export const { reset } = messageSlice.actions;
export default messageSlice.reducer;
