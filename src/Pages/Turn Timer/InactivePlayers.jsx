import { useEffect } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";

function InactivePlayers() {
  const dispatch = useDispatch();
  const inactiveCharacters = useSelector(state =>
    state.inactiveCharacters.sort((x, y) => (x.nickname > y.nickname ? 1 : -1))
  );
  const [current, setCurrent] = useState(0);
  const [selectedCharacter, setSelectedCharacter] = useState(0);
  const AddToCombat = async () => {
    if (current === 0) {
      Swal.fire(
        "Invalid Selection",
        "please select a character before clicking 'add character'",
        "error"
      );
    } else {
      await dispatch({
        type: "ADD_COMBAT",
        payload: {
          id:
            selectedCharacter == 0
              ? inactiveCharacters[0].id
              : selectedCharacter
        }
      });
      await setCurrent(0);
    }
  };
  return (
    <div>
      <div>
        <select
          value={current}
          onChange={event => {
            setCurrent(event.target.value);
            setSelectedCharacter(event.target.value);
          }}
        >
          <option value={0} default disabled>
            Select...
          </option>
          {inactiveCharacters.map(x => (
            <option value={x.id}>{x.nickname}</option>
          ))}
        </select>
        <button className="btn btn-success" onClick={() => AddToCombat()}>
          Add Character
        </button>
      </div>
    </div>
  );
}
export default InactivePlayers;
