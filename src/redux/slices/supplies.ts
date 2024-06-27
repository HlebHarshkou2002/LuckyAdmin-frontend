import { createSlice, createAsyncThunk, current } from "@reduxjs/toolkit";
import axios from "../axios";

type Provider = {
  providerName: String,
  providerStatus: String,
}

type Supply = {
  _id: String,
  title: String,
  dateOfDelivery: Date,
  comments: String,
  supplyStatus: boolean,
  products: Object[],
  provider: Provider,
  createdAt: Date,
  updatedAt: Date

}

type SuppliesState = {
  supplies: Supply[],
  status: string
}

const initialState: SuppliesState = {
  supplies: [],
  status: "loading",
};

export const fetchSupplies = createAsyncThunk<Supply[]>(
  "products/fetchSupplies",
  async () => {
    const data = await axios.get("/supplies");
    return data.data as Supply[];
  }
);

const suppliesSlice = createSlice({
  name: "supplies",
  initialState,
  reducers: {
    approveSupplyStatus: (state, action) => {
      let newSupplies = [...state.supplies];
      newSupplies = newSupplies.map((el) =>
        (el._id === action.payload.id) ? { ...el, supplyStatus: true } : el
      );

      return {
        ...state,
        supplies: newSupplies,
      };
    },
  },
  // extraReducers: {
  //   //Получение товаров
  //   [fetchSupplies.pending]: (state, action) => {
  //     state.status = "loading";
  //   },
  //   [fetchSupplies.fulfilled]: (state, action) => {
  //     state.supplies = action.payload.data;
  //     state.status = "loaded";
  //   },
  //   [fetchSupplies.rejected]: (state, action) => {
  //     state.supplies = [];
  //     state.status = "error";
  //   },
  // },
  extraReducers: (builder) => {
    builder
      .addCase(fetchSupplies.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(fetchSupplies.fulfilled, (state, action) => {
        state.supplies = action.payload;
        state.status = "loaded";
      })
      .addCase(fetchSupplies.rejected, (state, action) => {
        state.supplies = [];
        state.status = "error";
      })
  }
});

export const suppliesReducer = suppliesSlice.reducer;
export const { approveSupplyStatus } = suppliesSlice.actions;
