import { createSlice } from '@reduxjs/toolkit';

const regFormSlice = createSlice({
  name: 'regForm',
  initialState: {
    isHidden: true,
  },
  reducers: {
    showRegForm: (state) => {
      const newState = state;
      newState.isHidden = false;
    },
    hideRegForm: (state) => {
      const newState = state;
      newState.isHidden = true;
    },
  },
});

export const { showRegForm, hideRegForm } = regFormSlice.actions;
export default regFormSlice.reducer;
