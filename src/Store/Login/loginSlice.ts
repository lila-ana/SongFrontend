import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface LoginState {
  token: string | null;
  isAuthenticated: boolean;
  loading: boolean;
  error: string | null;
}

const storedToken = localStorage.getItem("token");
const initialState: LoginState = {
  token: storedToken ? storedToken : null,
  isAuthenticated: !!storedToken,
  loading: false,
  error: null,
};
const loginSlice = createSlice({
  name: "login",
  initialState,
  reducers: {
    loginRequest(
      state,
      _action: PayloadAction<{ email: string; password: string }>
    ) {
      state.loading = true;
      state.error = null;
    },
    loginSuccess(state, action: PayloadAction<string>) {
      state.loading = false;
      state.isAuthenticated = true;
      state.token = action.payload;
      localStorage.setItem("token", action.payload);
      console.log("first", action.payload);
    },
    loginFailure(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
    },
    logout(state) {
      state.loading = false;
      state.isAuthenticated = false;
      state.token = null;
      localStorage.removeItem("token");
    },
  },
});

export const { loginRequest, loginSuccess, loginFailure, logout } =
  loginSlice.actions;
export default loginSlice.reducer;
