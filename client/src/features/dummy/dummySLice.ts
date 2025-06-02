/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { backURL } from "@/core/config/env";
import { __cg } from "@/core/lib/lib";
import {
  createAsyncThunk,
  createEntityAdapter,
  createSlice,
  EntityState,
} from "@reduxjs/toolkit";
import axios from "axios";

interface ValItemType {
  val: number;
  id: string;
}

export interface DummyStateType extends EntityState<ValItemType, string> {
  isPending: boolean;
  isError: boolean;
  error: any;
  data: null;
}

export const entityAd = createEntityAdapter<ValItemType>();

const initState: DummyStateType = {
  ...entityAd.getInitialState(),
  isPending: false,
  isError: false,
  error: null,
  data: null,
};

export const getSomeData = createAsyncThunk<{ items: ValItemType[] }>(
  "dummy/getSomeData",
  async (_, _thunkAPI) => {
    try {
      const { data } = await axios.get(backURL + "/dummy");
      return data;
    } catch (err: any) {
      console.log(err);
      return _thunkAPI.rejectWithValue(err?.response?.data);
    }
  }
);

const dummySlice = createSlice({
  name: "dummy",
  initialState: initState,
  reducers: {
    setAllItems: entityAd.setAll,
    addOne: entityAd.addOne,
    clearItems: entityAd.removeAll,
    removeItem: entityAd.removeOne,
    updateItem: entityAd.updateOne,
    delItems: entityAd.removeMany,

    setOne: entityAd.setOne,

    updateList: entityAd.updateMany,
  },

  extraReducers: (builder) => {
    builder.addCase(getSomeData.pending, (state) => {
      state.isPending = true;
      state.isError = false;
      state.error = null;
    });

    builder.addCase(getSomeData.fulfilled, (state, action) => {
      state.isPending = false;
      console.log(action.payload);
      entityAd.setAll(state, action.payload.items);
    });

    builder.addCase(getSomeData.rejected, (state, action) => {
      state.isPending = false;
      state.isError = true;
      state.error = action.payload || action.error;
    });
  },
});

export const {
  setAllItems,
  removeItem,
  addOne: addItem,
  clearItems,
  updateItem,
  updateList,
  delItems,
  setOne,
} = dummySlice.actions;

export const getDummy = (state: any) => state.dummy;

export const { selectAll: selectAllDummy, selectById: getMyItem } =
  entityAd.getSelectors(getDummy);

export default dummySlice;
