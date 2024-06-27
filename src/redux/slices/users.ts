import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../axios";

export const fetchUsers = createAsyncThunk<User[]>("users/fetchUsers", async () => {
  const data = await axios.get("/users");
  return data.data as User[];
});

export const fetchRemoveUser = createAsyncThunk(
  "users/fetchRemoveUser",
  async (id) => {
    await axios.delete(`/users/${id}`);
  }
);

type User = {
  _id: String,
  fullName: String;
  email: String;
  isAdmin: Boolean;
  passwordHash: String;
  createdAt: String
}

type UsersState = {
    users: User[],
    status: string
  
}

const initialState: UsersState = {
    users: [],
    status: "loading",
};


const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {},
  // extraReducers: {
  //   //Получение пользователей
  //   [fetchUsers.pending]: (state, action) => {
  //     state.users.status = "loading";
  //   },
  //   [fetchUsers.fulfilled]: (state, action) => {
  //     state.users.items = action.payload;
  //     state.users.status = "loaded";
  //   },
  //   [fetchUsers.rejected]: (state, action) => {
  //     state.users.items = [];
  //     state.users.status = "error";
  //   },

  //   //Удаление пользователя
  //   [fetchRemoveUser.pending]: (state, action) => {
  //     debugger;
  //     state.users.items.data = state.users.items.data.filter(
  //       (obj) => obj.id !== action.meta.arg
  //     );
  //   },
  // },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.users = action.payload;
        state.status = "loaded";
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.users = [];
        state.status = "error";
      })

      //Удаление пользователя
      .addCase(fetchRemoveUser.pending, (state, action) => {
        state.users = state.users.filter(
          (obj) => obj._id !== action.meta.arg
        );
      })
  }
});

export const usersReducer = usersSlice.reducer;
