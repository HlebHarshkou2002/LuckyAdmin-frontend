import { createSlice, createAsyncThunk, current } from "@reduxjs/toolkit";
import axios from "../axios";

export const fetchSupplies = createAsyncThunk(
  "products/fetchSupplies",
  async () => {
    const data = await axios.get("/supplies");
    return data;
  }
);

// const initialState = {
//   supplies: {
//     items: [],
//     status: "loading",
//   },
// };

const initialState = {
  supplies: [],
  status: "loading",
};

const suppliesSlice = createSlice({
  name: "supplies",
  initialState,
  reducers: {
    approveSupplyStatus: (state, action) => {
      let newSupplies = [...state.supplies];

      console.log(newSupplies.current);
      newSupplies = newSupplies.map((el) =>
        (el._id === action.payload.id) ? { ...el, supplyStatus: true } : el
      );
     
      return {
        ...state,
        supplies: newSupplies,
      };
    },
  },
  extraReducers: {
    //Получение товаров
    [fetchSupplies.pending]: (state, action) => {
      state.status = "loading";
    },
    [fetchSupplies.fulfilled]: (state, action) => {
      state.supplies = action.payload.data;
      state.status = "loaded";
    },
    [fetchSupplies.rejected]: (state, action) => {
      state.supplies = [];
      state.status = "error";
    },
  },
});

export const suppliesReducer = suppliesSlice.reducer;
export const { approveSupplyStatus } = suppliesSlice.actions;
