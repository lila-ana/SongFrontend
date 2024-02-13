import { combineReducers } from "@reduxjs/toolkit";
import loginReducer from "./Login/loginSlice";
import songReducer from "./Songs/songSlice";
import userReducer from "./User/userSlice";

const rootReducer = combineReducers({
  loginReducer: loginReducer,
  songReducer: songReducer,
  userReducer: userReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;
