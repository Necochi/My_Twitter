import { createSlice } from '@reduxjs/toolkit';

const signFormSlice = createSlice({
  name: 'signForm',
  initialState: {
    isHidden: true,
  },
  reducers: {
    showSignForm: (state) => {
      const newState = state;
      newState.isHidden = false;
    },
    hideSignForm: (state) => {
      const newState = state;
      newState.isHidden = true;
    },
  },
});

export const { showSignForm, hideSignForm } = signFormSlice.actions;
export default signFormSlice.reducer;
