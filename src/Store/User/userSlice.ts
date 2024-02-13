import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface RegisterState {
  users: User[];
  loading: boolean;
  error: string | null;
}
interface User {
  id: string;
  username: string;
  email: string;
  password: string;
}

const initialState: RegisterState = {
  users: [],
  loading: false,
  error: null,
};

const userSlice = createSlice({
  name: "register",
  initialState,
  reducers: {
    createUserRequest(state) {
      state.loading = true;
      state.error = null;
    },
    createUserSuccess: (state, action: PayloadAction<User>) => {
      state.loading = false;
      state.users.push(action.payload);
      state.error = null;
    },
    createUserFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },
    fetchUserRequest(state) {
      state.loading = true;
      state.error = null;
    },
    fetchUserSuccess: (state, action: PayloadAction<User[]>) => {
      state.loading = false;
      state.users = action.payload;
    },
    fetchUserFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },
    updateUserRequest(state) {
      state.loading = true;
      state.error = null;
    },
    updateUserSuccess: (state, action: PayloadAction<User>) => {
      state.loading = false;
      const updatedUser = action.payload;

      state.users = state.users.map((user) =>
        user.id === updatedUser.id ? updatedUser : user
      );
      state.error = null;
    },

    updateUserFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },
    deleteUserRequest(state) {
      state.loading = true;
      state.error = null;
    },
    deleteUserSuccess: (state, action: PayloadAction<string>) => {
      state.loading = false;
      const id = action.payload;

      state.users = state.users.filter((user) => user.id !== id);
      state.error = null;
    },

    deleteUserFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const {
  createUserRequest,
  createUserSuccess,
  createUserFailure,
  fetchUserRequest,
  fetchUserSuccess,
  fetchUserFailure,
  updateUserRequest,
  updateUserSuccess,
  updateUserFailure,
  deleteUserRequest,
  deleteUserSuccess,
  deleteUserFailure,
} = userSlice.actions;

export default userSlice.reducer;
