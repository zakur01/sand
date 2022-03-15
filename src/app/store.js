import { configureStore } from '@reduxjs/toolkit';
import MessageReducer from '../features/messageSlice';
import AuthReducer from '../features/authSlice';
import UploadReducer from '../features/uploadSlice';

export const store = configureStore({
  reducer: {
    messages: MessageReducer,
    auth: AuthReducer,
    upload: UploadReducer,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
  devTools:
    window.__REDUX_DEVTOOLS_EXTENSION__ &&
    window.__REDUX_DEVTOOLS_EXTENSION__(),
});
