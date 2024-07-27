import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  content: [],
  page: 1,
  loading: false,
  hasMore: true,
};

export const fetchContent = createAsyncThunk(
  'content/fetchContent',
  async (page, { rejectWithValue }) => {
    try {
      const response = await axios.get(`https://test.create.diagnal.com/data/page${page}.json`);
      return response.data.page['content-items'].content;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const contentSlice = createSlice({
  name: 'content',
  initialState,
  reducers: {
    incrementPage(state) {
      state.page += 1;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchContent.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchContent.fulfilled, (state, action) => {
        state.content = [...state.content, ...action.payload];
        state.loading = false;
        state.hasMore = action.payload.length > 0;
      })
      .addCase(fetchContent.rejected, (state) => {
        state.loading = false;
      });
  },
});

export const { incrementPage } = contentSlice.actions;
export default contentSlice.reducer;
