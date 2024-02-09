import { all } from "redux-saga/effects";
import authSaga from "./Login/loginSaga";

export default function* rootSaga() {
  yield all([authSaga()]);
}
