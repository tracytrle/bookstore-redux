import { configureStore } from "@reduxjs/toolkit";
import bookReducer from "../components/book/bookSlice";

export const store = configureStore({
  reducer: {
    book: bookReducer,
  },
});
