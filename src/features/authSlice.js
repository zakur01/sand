import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import authServices from './authServices';

const User_local = JSON.parse(localStorage.getItem('user'));

const initialState = {
  User: User_local ? User_local.user.username : null,
  user_id: User_local ? User_local.user.id : null,
  token: User_local ? User_local.jwt : null,
  isAuthenticated: User_local ? true : false,
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: '',
};
// export const

export const RegAuth = createAsyncThunk(
  'auth/register',
  async (formData, thunkAPI) => {
    try {
      return await authServices.register(formData);
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

export const LoginAuth = createAsyncThunk(
  'auth/login',
  async (formData, thunkAPI) => {
    try {
      return await authServices.login(formData);
    } catch (error) {
      const message =
        (error.respones &&
          error.response.data &&
          error.response.data.message) ||
        error.response ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const Logout = createAsyncThunk('auth/logout', async (_, thunkAPI) => {
  try {
    return await authServices.logout();
  } catch (error) {
    const message =
      (error.respones && error.response.data && error.response.data.message) ||
      error.response ||
      error.toString();
    return thunkAPI.rejectWithValue(message);
  }
});

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    reset: (state) => {
      state.user_id = null;
      state.User = null;
      state.token = null;
      state.isAuthenticated = false;
      state.isError = false;
      state.isSuccess = false;
      state.isLoading = false;
      state.message = '';
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(LoginAuth.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(LoginAuth.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isAuthenticated = true;
        state.User = action.payload.data.user.username;
        state.token = action.payload.data.jwt;
        state.user_id = action.payload.data.user.id;
      })
      .addCase(LoginAuth.rejected, (state, action) => {
        state.isError = true;
        state.isLoading = false;
        state.message = action.payload;
      })
      .addCase(RegAuth.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(RegAuth.fulfilled, (state, action) => {
        state.isSuccess = true;
        state.isLoading = false;
        state.User = action.payload.data.user.username;
        state.token = action.payload.data.jwt;
        state.user_id = action.payload.data.user.id;
        state.isAuthenticated = true;
      })
      .addCase(RegAuth.rejected, (state, action) => {
        state.isError = true;
        state.isLoading = false;
        state.isAuthenticated = false;
        state.message = action.payload.data;
      });
  },
});

export const { reset } = authSlice.actions;
export default authSlice.reducer;
