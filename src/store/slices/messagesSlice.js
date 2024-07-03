import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

export const getMessages = createAsyncThunk(
  'messages/getMessages',
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetch('https://burtovoy.github.io/messages.json');
      if (!response.ok) {
        console.log('Somrthing wrong with response');
      }
      const data = response.json();
      return data;
    } catch (error) {
      console.log('Error catched', error);
      return rejectWithValue(error);
    }
  },
);

const messagesSlice = createSlice({
  name: 'msgs',
  initialState: {
    isLoading: true,
    isError: false,
    data: null,
  },
  extraReducers: (builder) => {
    builder
      .addCase(getMessages.pending, (state) => {
        const newState = state;
        newState.isLoading = true;
      })
      .addCase(getMessages.fulfilled, (state, action) => {
        const newState = state;
        newState.isLoading = false;
        newState.data = action.payload.messages;
      })
      .addCase(getMessages.rejected, (state, error) => {
        const newState = state;
        console.log('Error', error);
        newState.isError = true;
      });
  },
});

export default messagesSlice.reducer;
