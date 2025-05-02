import { RootStateType } from "@/store/store";
import {
  createEntityAdapter,
  createSelector,
  createSlice,
} from "@reduxjs/toolkit";

const bookStoresAdapter = createEntityAdapter();

const initState = bookStoresAdapter.getInitialState();

export const bookStoreSlice = createSlice({
  name: "bookStores",
  initialState: initState,
  reducers: {
    setBookStore: bookStoresAdapter.setOne,

    setBookStores: bookStoresAdapter.setAll,
    removeBookStores: bookStoresAdapter.removeAll,
    addBookStore: bookStoresAdapter.addOne,

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

const { selectById } = bookStoresAdapter.getSelectors();

export const getBookStoreState = (state: RootStateType) => state.bookStores;
export const selectBookStoreById = (state: RootStateType, id: string) =>
  createSelector(getBookStoreState, (bookStoresState) =>
    selectById(bookStoresState, id)
  )(state);

export default bookStoreSlice;
