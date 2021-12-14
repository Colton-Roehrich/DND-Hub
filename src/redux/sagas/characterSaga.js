import { put, takeLatest } from "redux-saga/effects";
import axios from "axios";

function* updateCharacter(action) {
  try {
    const response = yield axios.put(
      `/characters/${action.payload.id}`,
      action.payload
    );
    yield put({ type: "GET_ACTIVE_CHARACTERS" });
  } catch (error) {
    console.log("Error with characters:", error);
  }
}
function* getInactiveCharacters(action) {
  try {
    const response = yield axios.get("/characters/inactive/");
    yield put({ type: "SET_INACTIVE_CHARACTERS", payload: response.data });
  } catch (error) {
    console.log("Error with characters:", error);
  }
}
function* getActiveCharacters(action) {
  try {
    const response = yield axios.get("/characters/active/");
    yield put({ type: "SET_ACTIVE_CHARACTERS", payload: response.data });
  } catch (error) {
    console.log("Error with characters:", error);
  }
}
function* addCharacter(action) {
  try {
    const response = yield axios.post("/characters/", action.payload);
    yield put({ type: "GET_INACTIVE", payload: response.data[0] });
  } catch (error) {
    console.log("Error with characters:", error);
  }
}
function* characterSaga() {
  yield takeLatest("GET_ACTIVE_CHARACTERS", getActiveCharacters);
  yield takeLatest("GET_INACTIVE_CHARACTERS", getInactiveCharacters);
  yield takeLatest("UPDATE_CHARACTER", updateCharacter);
  yield takeLatest("ADD_CHARACTER", addCharacter);
}

export default characterSaga;
