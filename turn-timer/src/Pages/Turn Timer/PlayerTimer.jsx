import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import "../../Pages_Styling/TurnTimer.css";
function PlayerTimer(props) {
  const dispatch = useDispatch();
  const [hitPoints, setHitPoints] = useState(props.player.max_hitpoints);
  const [initiative, setInitiative] = useState(props.player.initiative);
  let interval = null;
  useEffect(() => {
    newInitiative(false);
  }, []);
  useEffect(() => {
    if (props.myTurn && props.running &&(interval === null || !interval.running)) {
      interval = setInterval(() => {
        if (props.time > 0) {
          props.setTime(() => props.time - 1);
        } else if (props.player.extra_time_pool > 0) {
          setExtraPool( props.player.extra_time_pool - 1);
        } else {
          props.nextPlayer();
        }
      }, 1000);
    } else {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  });
  const setExtraPool = (newPool)=>{
    dispatch({
    type: "UPDATE_COMBAT",
    payload: {
      ...props.player,
      player_id: props.player.id,
      extraPool:newPool,
    },
  });
  }
  useEffect(() => {
    return async () => {
      await setInitiative(-5);
      await newInitiative(false);
    };
  }, []);
  const newInitiative = async (isNew) => {
    await dispatch({
      type: "UPDATE_COMBAT",
      payload: {
        player_id: props.player.id,
        initiative: isNew?initiative:-5,
        has_initiative: isNew,
        extraPool:props.extraPool,
      },
    });
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
          <div className="col-6">{props.time}</div>:
          <div className="col-6 red">{props.player.extra_time_pool}</div>
        </div>
      </div>
      {props.myTurn && (
        <button
          className="btn btn-primary "
          onClick={()=>props.nextPlayer()}
        >
          Next Turn
        </button>
      )}
    </div>
  );
}
export default PlayerTimer;
