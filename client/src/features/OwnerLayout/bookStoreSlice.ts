import { RootStateType } from "@/store/store";
import { createEntityAdapter, createSlice } from "@reduxjs/toolkit";

export const bookStoresAdapter = createEntityAdapter();

const initState = {
  ...bookStoresAdapter.getInitialState(),
  store: null,
};

export const bookStoreSlice = createSlice({
  name: "bookStores",
  initialState: initState,
  reducers: {
    setBookStore: bookStoresAdapter.setOne,
    addBookStore: bookStoresAdapter.addOne,

    setBookStores: bookStoresAdapter.setAll,
    removeBookStores: bookStoresAdapter.removeAll,

    updateBookStore: bookStoresAdapter.updateOne,
    removeBookStore: bookStoresAdapter.removeOne,
  },
});

export const {
  setBookStore,
  setBookStores,
  removeBookStores,
  addBookStore,
  updateBookStore,
  removeBookStore,
} = bookStoreSlice.actions;

export const getBookStoreState = (state: RootStateType) => state.bookStores;

export const { selectById, selectAll: getAllStores } =
  bookStoresAdapter.getSelectors(getBookStoreState);

export default bookStoreSlice;
