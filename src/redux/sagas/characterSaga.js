import { put, takeLatest } from "redux-saga/effects";
import axios from "axios";

function* updateCharacter(action) {
  try {
    const response = yield axios.put(
      `/characters/${action.payload.id}`,
      action.payload
    );
    console.log("FETCHED DATA: ", response);
    yield put({ type: "GET_CHARACTERS" });
  } catch (error) {
    console.log("Error with characters:", error);
  }
}
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
  yield takeLatest("UPDATE_CHARACTER", updateCharacter);
}

export default characterSaga;
