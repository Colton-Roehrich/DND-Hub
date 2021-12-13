import { put, takeLatest } from "redux-saga/effects";
import axios from "axios";

function* updateCombat(action) {
  try {
    const response = yield axios.put("/combat/", action.payload);
    console.log("FETCHED DATA: ", response);
    yield put({ type: "GET_ACTIVE_CHARACTERS", payload: response.data });
  } catch (error) {
    console.log("Error with combat:", error);
  }
}
function* addCombat(action) {
  try {
    const response = yield axios.post("/combat/", action.payload);
    yield put({ type: "GET_ACTIVE_CHARACTERS", payload: response.data });
    yield put({ type: "GET_INACTIVE_CHARACTERS" });
  } catch (error) {
    console.log("Error with combat:", error);
  }
}
function* deleteCombat(action) {
  try {
    yield axios.delete("/combat/" + action.payload.character_id);
    yield put({ type: "GET_ACTIVE_CHARACTERS" });
    yield put({ type: "GET_INACTIVE_CHARACTERS" });
  } catch (error) {
    console.log("Error with combat:", error);
  }
}
function* combatSaga() {
  yield takeLatest("UPDATE_COMBAT", updateCombat);
  yield takeLatest("ADD_COMBAT", addCombat);
  yield takeLatest("DELETE_COMBAT", deleteCombat);
}

export default combatSaga;
