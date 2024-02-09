import { takeLatest, call, put } from "redux-saga/effects";
import { loginRequest, loginSuccess, loginFailure } from "./loginSlice";
import { API_BASE_URL } from "../../utils/endPoint";
import axios, { AxiosResponse } from "axios";

function loginApi(email: string, password: string): Promise<any> {
  return axios.post(`${API_BASE_URL}auth/login`, { email, password });
}

function* login(action: ReturnType<typeof loginRequest>) {
  try {
    const { email, password } = action.payload || {};
    if (!email || !password) {
      throw new Error("Email and password are required.");
    }
    const response: AxiosResponse = yield call(loginApi, email, password);
    const token = response.data.token;
    yield put(loginSuccess(token));
  } catch (error: any) {
    yield put(loginFailure(error.message));
  }
}

function* watchLogin() {
  yield takeLatest(loginRequest.type, login);
}

export default function* loginSaga() {
  yield watchLogin();
}
