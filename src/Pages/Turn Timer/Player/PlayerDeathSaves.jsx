import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

function PlayerDeathSaves(props) {
  const dispatch = useDispatch();
  const { nextPlayer, myTurn, running, player } = props;
  const [failedSaves, setFailedSaves] = useState(0);
  const [successfulSaves, setSuccessfulSaves] = useState(0);
  const { dead, current_hitpoints } = player;
  const setDead = dead => {
    dispatch({ type: "UPDATE_CHARACTER", payload: { ...player, dead: dead } });
  };
  useEffect(() => {
    if (current_hitpoints > 0 && dead) {
      setDead(false);
    }
    if ((myTurn && dead && running) || (myTurn && successfulSaves >= 3)) {
      nextPlayer();
    }
  });
  return (
    <div className="col-6">
      {!dead && current_hitpoints <= 0 && successfulSaves < 3 && myTurn ? (
        <div>
          <span>
            <div className="green">{successfulSaves}</div>
            <div className="red">{failedSaves}</div>
          </span>
          <button
            className="btn btn-success"
            onClick={() => {
              nextPlayer();
              if (successfulSaves == 2) {
                setFailedSaves(0);
              }
              setSuccessfulSaves(successfulSaves + 1);
            }}
          >
            Success
          </button>

          <button
            className="btn btn-danger"
            onClick={() => {
              nextPlayer();
              if (failedSaves === 2) {
                setDead(true);
              }
              setFailedSaves(failedSaves + 1);
            }}
          >
            Fail
          </button>
        </div>
      ) : (
        !dead &&
        current_hitpoints <= 0 && (
          <button
            className="btn btn-danger"
            onClick={() => {
              if (successfulSaves === 3) {
                setSuccessfulSaves(0);
              }
              if (failedSaves === 2) {
                setDead(true);
              }
              setFailedSaves(failedSaves + 1);
            }}
          >
            Fail
          </button>
        )
      )}
      {dead && <div className="red">YOU ARE DEAD</div>}
    </div>
  );
}
export default PlayerDeathSaves;
