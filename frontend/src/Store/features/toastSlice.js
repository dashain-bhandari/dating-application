import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  toasts: [],
};

const toastSlice = createSlice({
  name: 'toast',
  initialState,
  reducers: {
    addToast: (state, action) => {
      const alreadyExist = state.toasts.some(
        toast => toast.msg === action.payload.msg && toast.kind === action.payload.kind
      );

      if (!alreadyExist) {
        state.toasts.push(action.payload);
      }

      // if (!alreadyExist) {
      //   state.toasts.push(action.payload);
      // }
    },

    removeToast: (state, action) => {
      state.toasts = state.toasts.filter((toast) =>
        action.payload.msg !== toast.msg && action.payload.kind !== toast.kind);
    },
  }
});

export const { addToast, removeToast } = toastSlice.actions;
export default toastSlice.reducer;