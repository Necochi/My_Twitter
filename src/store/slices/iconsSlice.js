import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

export const getIcons = createAsyncThunk(
  'icons/getIcons',
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetch('https://burtovoy.github.io/pictures.json');
      if (!response.ok) {
        throw new Error('Something is wrong with response');
      }
      const data = response.json();
      return data;
    } catch (error) {
      console.log('Error', error);
      return rejectWithValue(error);
    }
  },
);

const iconsSlice = createSlice({
  name: 'icons',
  initialState: {
    isLoading: true,
    isError: false,
    data: null,
  },
  extraReducers: (builder) => {
    builder
      .addCase(getIcons.pending, (state) => {
        const newState = state;
        newState.isLoading = true;
      })
      .addCase(getIcons.fulfilled, (state, action) => {
        const newState = state;
        newState.isLoading = false;
        newState.data = action.payload.pictures;
      })
      .addCase(getIcons.rejected, (state, error) => {
        const newState = state;
        console.log('Error', error);
        newState.isError = true;
      });
  },
});

export default iconsSlice.reducer;
