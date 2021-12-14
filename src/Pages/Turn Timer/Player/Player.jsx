import React from "react";
import { useDispatch } from "react-redux";
import PlayerDeathSaves from "./PlayerDeathSaves";
import PlayerStatusEffect from "./StatusEffect/PlayerStatusEffect";
import PlayerHealth from "./PlayerHealth";
import Initiative from "./Initiative";
import PlayerInfo from "./PlayerInfo";
import Timer from "./Timer";
import "../../../Pages_Styling/TurnTimer.css";
function Player(props) {
  const {
    player,
    myTurn,
    running,
    nextPlayer,
    time,
    setTime,
    valuesSet,
    extraPool
  } = props;
  const dispatch = useDispatch();
  const { id } = player;
  return (
    <div className={myTurn ? "card col-5 m-1 myTurn" : "card col-5 m-1"}>
      <div className="row">
        <PlayerInfo player={player} />
        <Timer
          extra_time_pool={player.extra_time_pool}
          myTurn={myTurn}
          running={running}
          time={time}
          setTime={setTime}
          nextPlayer={nextPlayer}
          player={player}
        />
        <PlayerHealth player={player} />
        <Initiative
          player={player}
          valuesSet={valuesSet}
          extraPool={extraPool}
        />
        {player.current_hitpoints <= 0 && (
          <PlayerDeathSaves
            player={player}
            nextPlayer={nextPlayer}
            myTurn={myTurn}
            running={running}
          />
        )}
        <PlayerStatusEffect player={player} />
        <button
          className="btn btn-danger"
          onClick={() =>
            dispatch({ type: "DELETE_COMBAT", payload: { character_id: id } })
          }
        >
          Remove from combat
        </button>
      </div>
    </div>
  );
}
export default Player;
