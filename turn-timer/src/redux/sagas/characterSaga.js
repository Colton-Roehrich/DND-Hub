import { put, takeLatest } from "redux-saga/effects";
import axios from "axios";

function* getAllCharacters(action) {
  try {
    const response = yield axios.get("/characters/all/");
    console.log("FETCHED DATA: ", response);
    yield put({ type: "SET_CHARACTERS", payload: response.data });
  } catch (error) {
    console.log("Error with characters:", error);
  }
}
function* characterSaga() {
  yield takeLatest("GET_CHARACTERS", getAllCharacters);
}

export default characterSaga;
