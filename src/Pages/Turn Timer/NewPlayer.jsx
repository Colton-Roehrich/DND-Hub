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
        nickname: name,
        armor_class: AC,
        current_hitpoints: hitpoints
      }
    });
  };
  return (
    <div className="white my-5">
      <div className="row col-12">
        <div className="col-4">NAME:</div>
        <input
          className="col-8"
          value={name}
          onChange={event => setName(event.target.value)}
        />
      </div>
      <div className="row col-12">
        <div className="col-4">ARMOR CLASS:</div>
        <input
          className="col-8"
          value={AC}
          onChange={event => setAC(event.target.value)}
        />
      </div>
      <div className="row col-12">
        <div className="col-4">HITPOINTS:</div>
        <input
          className="col-8"
          value={hitpoints}
          onChange={event => setHitpoints(event.target.value)}
        />
      </div>
      <div className="row col-12">
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
