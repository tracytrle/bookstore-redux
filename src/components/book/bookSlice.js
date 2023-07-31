import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchBooks } from "./bookAPI.js";
import apiService from "../../app/apiService";
import { toast } from "react-toastify";

export const initialState = {
  books: [],
  readingList: [],
  bookDetail: null,
  status: null,
};

export const addToReadingList = createAsyncThunk(
  "book/addToReadingList",
  async (book) => {
    const response = await apiService.post(`/favorites`, book);
    return response.data;
  }
);

export const getReadingList = createAsyncThunk(
  "book/getReadingList",
  async () => {
    const res = await apiService.get(`/favorites`);
    return res.data;
  }
);

export const removeFromReadingList = createAsyncThunk(
  "book/removeFromReadingList",
  async (removeBookId) => {
    const res = await apiService.delete(`/favorites/${removeBookId}`);
    console.log(res);
    return res.data;
  }
);

export const getDetailBook = createAsyncThunk(
  "/book/getDetailBook",
  async (bookId) => {
    const res = await apiService.get(`/books/${bookId}`);
    return res.data;
  }
);
/*
export const fetchData = createAsyncThunk(
  "book/fetchData",
  async ({ pageNum, limit, query }) => {
    try {
      let url = `/books?_page=${pageNum}&_limit=${limit}`;
      if (query) url += `&q=${query}`;
      const res = await apiService.get(url);
      return res;
    } catch (error) {
      return error;
    }
  }
);
*/
export const fetchData = createAsyncThunk("book/fetchData", async (props) => {
  const res = await fetchBooks(props);
  return res.data;
});

export const bookSlice = createSlice({
  name: "book",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(fetchData.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchData.fulfilled, (state, action) => {
        state.status = null;
        // state.books.push(action.payload);
        state.books = action.payload;
      })
      .addCase(fetchData.rejected, (state, action) => {
        state.status = "failed";
      });

    builder
      .addCase(addToReadingList.pending, (state) => {})
      .addCase(addToReadingList.fulfilled, (state, action) => {
        console.log(action.payload);
        toast.success("The book has been added to the reading list!");
      })
      .addCase(addToReadingList.rejected, (state, action) => {
        toast.error(action.error.message);
      });

    builder
      .addCase(getReadingList.pending, (state) => {
        state.status = "pending";
      })
      .addCase(getReadingList.fulfilled, (state, action) => {
        state.status = null;
        // state.readingList.push(action.payload);
        state.readingList = action.payload;
      })
      .addCase(getReadingList.rejected, (state, action) => {
        state.status = "failed";
      });

    builder
      .addCase(removeFromReadingList.pending, (state) => {
        state.status = "pending";
      })
      .addCase(removeFromReadingList.fulfilled, (state, action) => {
        state.status = null;
        toast.success("The book has been removed");
      })
      .addCase(removeFromReadingList.rejected, (state, action) => {
        state.status = "failed to remove book";
      });

    builder
      .addCase(getDetailBook.pending, (state) => {
        state.status = "pending";
      })
      .addCase(getDetailBook.fulfilled, (state, action) => {
        state.status = null;
        // state.bookDetail.push(action.payload);
        state.bookDetail = action.payload;
      })
      .addCase(getDetailBook.rejected, (state, action) => {
        state.status = "failed";
      });
  },
});
export default bookSlice.reducer;
