import { put, takeLatest } from "redux-saga/effects";
import axios from "axios";

function* updateCombat(action) {
  try {
    const response = yield axios.put("/combat/", action.payload);
    console.log("FETCHED DATA: ", response);
    yield put({ type: "GET_CHARACTERS", payload: response.data });
  } catch (error) {
    console.log("Error with combat:", error);
  }
}
function* combatSaga() {
  yield takeLatest("UPDATE_COMBAT", updateCombat);
}

export default combatSaga;
