import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

export const getPosts = createAsyncThunk(
  'posts/getPosts',
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetch('/posts');
      if (!response.ok) {
        console.log('Something went wrong with fetching from db posts.');
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.log('Error catched:', error);
      return rejectWithValue(error);
    }
  },
);

export const addNewPost = createAsyncThunk(
  'posts/addNewPost',
  async (postData, { rejectWithValue }) => {
    try {
      const response = await fetch('/posts.json', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(postData),
      });
      if (!response.ok) {
        throw new Error('Failed to add new post');
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.log('Error catched: ', error);
      return rejectWithValue(error);
    }
  },
);

const postsSlice = createSlice({
  name: 'posts',
  initialState: {
    isLoading: true,
    isError: false,
    data: null,
  },
  extraReducers: (builder) => {
    builder
      .addCase(getPosts.pending, (state) => {
        const newState = state;
        newState.isLoading = true;
      })
      .addCase(getPosts.fulfilled, (state, action) => {
        const newState = state;
        newState.isLoading = false;
        newState.data = action.payload;
      })
      .addCase(getPosts.rejected, (state, error) => {
        const newState = state;
        console.log('Error', error);
        newState.isError = true;
      })
      .addCase(addNewPost.pending, (state) => {
        const newState = state;
        newState.isLoading = true;
        newState.isError = false;
      })
      .addCase(addNewPost.fulfilled, (state, action) => {
        const newState = state;
        const newPost = Array.isArray(action.payload)
          ? action.payload[0]
          : action.payload;
        newState.data = state.data ? [...state.data, newPost] : [newPost];
        newState.isError = false;
      })
      .addCase(addNewPost.rejected, (state, action) => {
        const newState = state;
        newState.isLoading = false;
        newState.isError = true;
        console.log('Error', action.payload);
      });
  },
});

export default postsSlice.reducer;
