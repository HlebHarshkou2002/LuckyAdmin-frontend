import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../axios";

export const fetchShopInfo = createAsyncThunk(
  "products/fetchShopInfo",
  async () => {
    const data = await axios.get("/content");
    return data.data;
  }
);

const initialState = {
  shopInfo: [],
  status: "loading",
};

const shopInfoSlice = createSlice({
  name: "shopInfo",
  initialState,
  reducers: {
  },
  extraReducers: {
    //Получение поставщиков
    [fetchShopInfo.pending]: (state, action) => {
      state.status = "loading";
    },
    [fetchShopInfo.fulfilled]: (state, action) => {
      state.shopInfo = action.payload;
      state.status = "loaded";
    },
    [fetchShopInfo.rejected]: (state, action) => {
      state.shopInfo = [];
      state.status = "error";
    },
  },
});

export const shopInfoReducer = shopInfoSlice.reducer;
