import { all, fork } from "redux-saga/effects";
import authSaga from "./Login/loginSaga";
import { watchSongActions } from "./Songs/songSaga";
import { watchUserActions } from "./User/userSaga";

export default function* rootSaga() {
  yield all([fork(authSaga), fork(watchSongActions), fork(watchUserActions)]);
}
