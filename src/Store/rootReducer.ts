import { combineReducers } from "@reduxjs/toolkit";
import loginReducer from "./Login/loginSlice";

const rootReducer = combineReducers({
  loginReducer: loginReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;
