import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  image_id: null,
  image_url: null,
};

export const Upload = createAsyncThunk(
  'upload/image',
  async (formData, thunkAPI) => {
    try {
      return await axios.post(
        'https://strapi-sand.herokuapp.com/api/upload',
        formData
      );
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

export const uploadSlice = createSlice({
  name: 'upload',
  initialState,
  reducers: {
    reset_upload: (state) => {
      state.image_id = null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(Upload.fulfilled, (state, action) => {
      state.image_id = action.payload.data[0].id;
    });
  },
});
export const { reset_upload } = uploadSlice.actions;
export default uploadSlice.reducer;
