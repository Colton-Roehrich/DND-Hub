import { useState } from "react";
import { useDispatch } from "react-redux";

function NewPlayer() {
  const [name, setName] = useState("");
  const [AC, setAC] = useState(10);
  const [hitpoints, setHitpoints] = useState(0);
  const dispatch = useDispatch();
  const addCharacter = () => {
    dispatch({
      type: "ADD_CHARACTER",
      payload: {
        name: name,
        AC: AC,
        hitpoints: hitpoints
      }
    });
  };
  return (
    <div className="white my-5">
      <div className="row col-8">
        <div className="col-2">NAME:</div>
        <input
          className="col-2"
          value={name}
          onChange={event => setName(event.target.value)}
        />
      </div>
      <div className="row col-8">
        <div className="col-2">ARMOR CLASS:</div>
        <input
          className="col-2"
          value={AC}
          onChange={event => setAC(event.target.value)}
        />
      </div>
      <div className="row col-8">
        <div className="col-2">HITPOINTS:</div>
        <input
          className="col-2"
          value={hitpoints}
          onChange={event => setHitpoints(event.target.value)}
        />
      </div>
      <div className="row col-8">
        <div className="col-4 d-flex justify-content-center">
          <button className="btn btn-success" onClick={() => addCharacter()}>
            Add Character
          </button>
        </div>
      </div>
    </div>
  );
}
export default NewPlayer;
