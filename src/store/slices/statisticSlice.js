import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

export const getStatistic = createAsyncThunk(
  'statistic/getStatistic',
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetch('https://burtovoy.github.io/statistic.json');
      if (!response.ok) {
        throw new Error('Something is wrong with response');
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error caught', error);
      return rejectWithValue(error.message);
    }
  },
);

const statisticSlice = createSlice({
  name: 'statistic',
  initialState: {
    isLoading: true,
    isError: false,
    data: null,
  },
  extraReducers: (builder) => {
    builder
      .addCase(getStatistic.pending, (state) => {
        const newState = state;
        newState.isLoading = true;
      })
      .addCase(getStatistic.fulfilled, (state, action) => {
        const newState = state;
        newState.isLoading = false;
        newState.data = action.payload.statistic;
      })
      .addCase(getStatistic.rejected, (state, error) => {
        const newState = state;
        console.log('Error', error);
        newState.isLoading = false;
        newState.isError = true;
      });
  },
});

export default statisticSlice.reducer;
