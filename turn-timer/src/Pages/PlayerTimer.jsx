import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import Swal from "sweetalert2";
import "../Pages_Styling/TurnTimer.css";
function PlayerTimer(props) {
  const dispatch = useDispatch();
  const [extrapool, setExtrapool] = useState(props.extraPool);
  const [currentCount, setCurrentCount] = useState(props.time);
  const [hitPoints, setHitPoints] = useState(props.player.max_hitpoints);
  const [initiative, setInitiative] = useState(props.player.initiative);
  let interval = null;
  function reset() {
    setCurrentCount(props.time);
  }
  useEffect(() => {
    newInitiative(false);
  }, []);
  useEffect(() => {
    if (props.myTurn && (interval === null || !interval.running)) {
      interval = setInterval(() => {
        if (currentCount > 0) {
          setCurrentCount((currentCount) => currentCount - 1);
        } else if (extrapool > 0) {
          setExtrapool((extrapool) => extrapool - 1);
        } else {
          nextPlayer();
        }
      }, 1000);
    } else {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  });

  useEffect(() => {
    return async () => {
      await setInitiative(-5);
      await newInitiative(false);
    };
  }, []);

  const nextPlayer = () => {
    props.nextPlayer();
    reset();
  };
  const newInitiative = async (isNew) => {
    await dispatch({
      type: "UPDATE_COMBAT",
      payload: {
        player_id: props.player.id,
        initiative: initiative,
        has_initiative: isNew,
      },
    });
    setInitiative(-5);
  };
  return (
    <div className={props.myTurn ? "card col-5 m-1 myTurn" : "card col-5 m-1"}>
      <div className="mb-2 row">
        <div className="col-6 name">Name: {props.player.name}</div>
        <div className="col-6 name">
          Hitpoints:{hitPoints}
          <button
            className="btn btn-danger"
            onClick={() => setHitPoints(hitPoints - 1)}
          >
            -
          </button>
          <button
            className="btn btn-success"
            onClick={() => setHitPoints(hitPoints + 1)}
          >
            +
          </button>
        </div>
        <div className="col-6 name">AC: {props.player.armor_class}</div>
        <div className="col-6 name">
          Initiative:
          {props.player.has_initiative ? (
            <div>{props.player.initiative}</div>
          ) : (
            <div className="row">
              <input
                className="col-5"
                value={initiative === -5 ? "" : initiative}
                onChange={(event) => setInitiative(event.target.value)}
              />{" "}
              <button
                className="btn btn-primary col-7"
                onClick={() => newInitiative(true)}
              >
                Set Initiative
              </button>
            </div>
          )}
        </div>
      </div>
      <div className=" row ">
        <div className=" col-6">Time Remaining</div>
        <div className=" col-6 row ">
          <div className="col-6">{currentCount}</div>
          <div className="col-6 red">{extrapool}</div>
        </div>
      </div>
      {props.myTurn && (
        <button
          className="btn btn-primary "
          onClick={() => nextPlayer(initiative)}
        >
          Next Turn
        </button>
      )}
    </div>
  );
}
export default PlayerTimer;
