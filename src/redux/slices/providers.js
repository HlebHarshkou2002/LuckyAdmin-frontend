import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../axios";

export const fetchProviders = createAsyncThunk(
  "products/fetchProviders",
  async () => {
    const data = await axios.get("/providers");
    return data.data;
  }
);

const initialState = {
  providers: [],
  status: "loading",
};

const providersSlice = createSlice({
  name: "providers",
  initialState,
  reducers: {
    addProvider: (state, action) => {
      let newProviders = [...state.providers];
      newProviders.push(action.payload.fields);
      return {
        ...state,
        providers: newProviders,
      };
    },
  },
  extraReducers: {
    //Получение поставщиков
    [fetchProviders.pending]: (state, action) => {
      state.status = "loading";
    },
    [fetchProviders.fulfilled]: (state, action) => {
      state.providers = action.payload;
      state.status = "loaded";
    },
    [fetchProviders.rejected]: (state, action) => {
      state.providers = [];
      state.status = "error";
    },
  },
});

export const providersReducer = providersSlice.reducer;

export const { addProvider } = providersSlice.actions;
