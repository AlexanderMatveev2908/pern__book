/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { backURL } from "@/core/config/env";
import { __cg } from "@/core/lib/lib";
import {
  createAsyncThunk,
  createEntityAdapter,
  createSlice,
} from "@reduxjs/toolkit";
import axios from "axios";

const entity = createEntityAdapter();

const initState = {
  ...entity.getInitialState(),
  isPending: false,
  isError: false,
  error: null,
  data: null,
};

export const getSomeData = createAsyncThunk(
  "dummy/getSomeData",
  async (_, _thunkAPI) => {
    try {
      const res = await axios.get(backURL + "/dummy");
      __cg("dummy call", res);
    } catch (err) {
      console.log(err);
    }
  }
);

const dummySlice = createSlice({
  name: "dummy",
  initialState: initState,
  reducers: {},

  extraReducers: (builder) => {
    builder.addCase(getSomeData.pending, (state) => {
      state.isPending = true;
      state.isError = false;
      state.error = null;
    });

    builder.addCase(getSomeData.fulfilled, (state, action) => {
      state.isPending = false;
      state.data = action.payload as any;
    });

    builder.addCase(getSomeData.rejected, (state, action) => {
      state.isPending = false;
      state.isError = true;
      state.error = action.error as any;
    });
  },
});

export const getDummy = (state: any) => state.dummy;

export default dummySlice;
