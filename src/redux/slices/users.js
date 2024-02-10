import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../axios";

export const fetchUsers = createAsyncThunk("users/fetchUsers", async () => {
  const data = await axios.get("/users");
  return data;
});

export const fetchRemoveUser = createAsyncThunk(
  "users/fetchRemoveUser",
  async (id) => {
    await axios.delete(`/users/${id}`);
  }
);

const initialState = {
  users: {
    items: [],
    status: "loading",
  },
};

const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {},
  extraReducers: {
    //Получение пользователей
    [fetchUsers.pending]: (state, action) => {
      state.users.status = "loading";
    },
    [fetchUsers.fulfilled]: (state, action) => {
      state.users.items = action.payload;
      state.users.status = "loaded";
    },
    [fetchUsers.rejected]: (state, action) => {
      state.users.items = [];
      state.users.status = "error";
    },

    //Удаление пользователя
    [fetchRemoveUser.pending]: (state, action) => {
      debugger;
      state.users.items.data = state.users.items.data.filter(
        (obj) => obj.id !== action.meta.arg
      );
    },
  },
});

export const usersReducer = usersSlice.reducer;
