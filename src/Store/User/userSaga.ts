import { takeLatest, call, put, all } from "redux-saga/effects";
import {
  createUserFailure,
  createUserRequest,
  createUserSuccess,
} from "./userSlice";
import { API_BASE_URL } from "../../config/endPoint";
import axios from "axios";

function* createUserSaga(
  action: ReturnType<typeof createUserRequest>
): Generator<any, void, any> {
  try {
    const response = yield call(
      axios.post,
      `${API_BASE_URL}auth/register`,
      action.payload
    );
    yield put(createUserSuccess(response?.data));
  } catch (error: any) {
    yield put(createUserFailure(error));
  }
}
export function* watchUserActions() {
  yield all([takeLatest(createUserRequest.type, createUserSaga)]);
}
