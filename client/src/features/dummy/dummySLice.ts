/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { backURL } from "@/core/config/env";
import { __cg } from "@/core/lib/lib";
import {
  createAsyncThunk,
  createEntityAdapter,
  createSlice,
  EntityId,
} from "@reduxjs/toolkit";
import axios from "axios";

interface valsType {
  val: number;
  id: string;
}

export interface DummyStateType {
  isPending: boolean;
  isError: boolean;
  error: any;
  data: null;
  ids: EntityId[];
  entities: Record<
    EntityId,
    {
      id: EntityId;
    }
  >;
}

const entity = createEntityAdapter();

const initState: DummyStateType = {
  ...entity.getInitialState(),
  isPending: false,
  isError: false,
  error: null,
  data: null,
};

export const getSomeData = createAsyncThunk<{ items: valsType[] }>(
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
  reducers: {},

  extraReducers: (builder) => {
    builder.addCase(getSomeData.pending, (state) => {
      state.isPending = true;
      state.isError = false;
      state.error = null;
    });

    builder.addCase(getSomeData.fulfilled, (state, action) => {
      state.isPending = false;
      console.log(action.payload);
      entity.setAll(state, action.payload.items);
    });

    builder.addCase(getSomeData.rejected, (state, action) => {
      state.isPending = false;
      state.isError = true;
      state.error = action.payload || action.error;
    });
  },
});

export const getDummy = (state: any) => state.dummy;

export default dummySlice;
