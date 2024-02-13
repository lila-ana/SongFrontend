import { takeLatest, call, put, all } from "redux-saga/effects";
import {
  fetchSongsRequest,
  fetchSongsSuccess,
  fetchSongsFailure,
  createSongSuccess,
  createSongFailure,
  createSongRequest,
  updateSongRequest,
  updateSongSuccess,
  updateSongFailure,
  deleteSongRequest,
  deleteSongSuccess,
  deleteSongFailure,
} from "./songSlice";
import axios from "axios";
import { API_BASE_URL } from "../../config/endPoint";
import { PayloadAction } from "@reduxjs/toolkit";

function* createSongSaga(
  action: ReturnType<typeof createSongRequest>
): Generator<any, void, any> {
  try {
    const response = yield call(
      axios.post,
      `${API_BASE_URL}api/song`,
      action.payload
    );
    yield put(createSongSuccess(response?.data));
    yield put(fetchSongsRequest());
  } catch (error: any) {
    yield put(createSongFailure(error));
  }
}
function* fetchSongSaga(
  action: ReturnType<typeof fetchSongsRequest>
): Generator<any, void, any> {
  try {
    const response = yield call(
      axios.get,
      `${API_BASE_URL}api/songs`,
      action.payload
    );

    yield put(fetchSongsSuccess(response?.data));
  } catch (error: any) {
    yield put(fetchSongsFailure(error));
  }
}

function* updateSongSaga(
  action: ReturnType<typeof updateSongRequest>
): Generator<any, void, any> {
  try {
    console.log("Updating song...");

    const { id, updatedSong } = action.payload;
    const response = yield call(
      axios.put,
      `${API_BASE_URL}api/song/${id}`,
      updatedSong
    );
    console.log(response, updatedSong, id, "updated datas");
    console.log("Update successful:", response.data);

    yield put(updateSongSuccess(response?.data));
  } catch (error: any) {
    yield put(updateSongFailure(error));
  }
}
function* deleteSongSaga(
  action: PayloadAction<string>
): Generator<any, void, any> {
  try {
    const id = action.payload;
    yield call(axios.delete, `${API_BASE_URL}api/song/${id}`);
    yield put(deleteSongSuccess(id));
  } catch (error: any) {
    yield put(deleteSongFailure(error));
  }
}

export function* watchSongActions() {
  yield all([
    takeLatest(createSongRequest.type, createSongSaga),
    takeLatest(updateSongRequest.type, updateSongSaga),
    takeLatest(deleteSongRequest.type, deleteSongSaga),
    takeLatest(fetchSongsRequest.type, fetchSongSaga),
  ]);
}
