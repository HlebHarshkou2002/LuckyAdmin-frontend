import { createSlice, createAsyncThunk, current } from "@reduxjs/toolkit";
import axios from "../axios";
import { act } from "react-dom/test-utils";

export const fetchProducts = createAsyncThunk(
  "products/fetchProducts",
  async () => {
    const data = await axios.get("/products");
    return data;
  }
);

export const fetchRemoveProduct = createAsyncThunk(
  "products/fetchRemoveProduct",
  async (id) => {
    await axios.delete(`/products/${id}`);
  }
);

const initialState = {
  products: [],
  status: "loading",
  filteredProducts: [],
  isSalesExist: true,
  genres: {
    items: [],
    status: "loading",
  },
};

const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    filterSales: (state, action) => {
      let filteredProducts = [...state.products];


      filteredProducts = filteredProducts.filter((product) => {
        for (let category of action.payload.filterCategories) {
          if (product.categories.includes(category)) {
            return true;
          }
        }

        for (let providerName of action.payload.filterProviders) {
          if (product.provider?.providerName === providerName) {
            return true;
          }
        }

        if ((action.payload.startDate !== "") && (action.payload.endDate !== "")) {
          for (let sale of product.sales) {
            if ((sale.dateOfSale >= action.payload.startDate) && (sale.dateOfSale <= action.payload.endDate)) {
              return true;
            }
          }
        }
      })

      if ((action.payload.startDate !== "") && (action.payload.endDate !== "")) {
        filteredProducts = filteredProducts.map((product) => {
          let newSales = product.sales.filter((sale) => {
            if ((sale.dateOfSale >= action.payload.startDate) && (sale.dateOfSale <= action.payload.endDate)) {
              return true;
            }
          });
          return { ...product, sales: newSales };
        });
      }


      let isSalesExist = true;
      if ((filteredProducts.length === 0) && ((action.payload.filterCategories.length > 0) || (action.payload.filterProviders.length > 0) || (action.payload.startDate !== ""))) {
        isSalesExist = false;
      }
      if ((action.payload.filterCategories.length === 0) && (action.payload.filterProviders.length === 0) && (action.payload.startDate === "")) {
        isSalesExist = true
      }

      return {
        ...state,
        filteredProducts: filteredProducts,
        isSalesExist: isSalesExist
      };
    },
    searchByTitle: (state, action) => {
      let filteredProducts = [...state.products];

      filteredProducts = filteredProducts.filter((product) => {
        if (product.title.toLowerCase().includes(action.payload.value.toLowerCase())) {
          return true
        } else {
          return false
        }
      })

      return {
        ...state,
        filteredProducts
      };
    },
    addProduct: (state, action) => {
      let newProducts = [...state.products];
      newProducts.push(action.payload.fields)
      return {
        ...state,
        products: newProducts
      };
    },
    sortByTitle: (state, action) => {
      let newProducts = [...state.products];
      if (action.payload.isTitleSorting) {
        newProducts.sort((a, b) => a.title > b.title ? 1 : -1)
      }
      return {
        ...state,
        filteredProducts: newProducts
      };
    },
    sortBySalesCount: (state, action) => {
      let newProducts = [...state.products];
      if (action.payload.isSalesCountSorting) {
        newProducts.sort((a, b) => a.saleCount > b.saleCount ? 1 : -1)
      }
      return {
        ...state,
        filteredProducts: newProducts
      };
    }
  },
  extraReducers: {
    //Получение товаров
    [fetchProducts.pending]: (state, action) => {
      state.status = "loading";
    },
    [fetchProducts.fulfilled]: (state, action) => {
      state.products = action.payload.data;
      state.filteredProducts = [];
      state.status = "loaded";
    },
    [fetchProducts.rejected]: (state, action) => {
      state.products = [];
      state.status = "error";
    },

    //Удаление товара
    [fetchRemoveProduct.pending]: (state, action) => {
      state.products = state.products.filter(
        (obj) => obj._id !== action.meta.arg
      );
      state.status = "loaded";
    }
  },
});

export const productsReducer = productsSlice.reducer;

export const { filterByCategory } = productsSlice.actions;
export const { filterByProvider } = productsSlice.actions;
export const { searchByTitle } = productsSlice.actions;
export const { filterByDate } = productsSlice.actions;
export const { addProduct } = productsSlice.actions;
export const { sortByTitle } = productsSlice.actions;
export const { sortBySalesCount } = productsSlice.actions;
export const { filterSales } = productsSlice.actions;
