import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import "../../Pages_Styling/TurnTimer.css";
function PlayerTimer(props) {
  const dispatch = useDispatch();
  const [incomingDamage, setIncomingDamage] = useState(0);
  const [dead, setDead] = useState(false);
  const [failedSaves, setFailedSaves] = useState(0);
  const [successfulSaves, setSuccessfulSaves] = useState(0);
  const [initiative, setInitiative] = useState(props.player.initiative);
  const { current_hitpoints } = props.player;
  let interval = null;
  const setHitPoints = value => {
    dispatch({
      type: "UPDATE_CHARACTER",
      payload: {
        ...props.player,
        current_hitpoints: value
      }
    });
  };
  useEffect(() => {
    newInitiative(false);
  }, []);
  useEffect(() => {
    if (
      props.myTurn &&
      props.running &&
      (interval === null || !interval.running)
    ) {
      if (dead || successfulSaves >= 3 || failedSaves >= 3) {
        props.nextPlayer();
      }
      interval = setInterval(() => {
        if (props.time > 0) {
          props.setTime(() => props.time - 1);
        } else if (props.player.extra_time_pool > 0) {
          setExtraPool(props.player.extra_time_pool - 1);
        } else {
          props.nextPlayer();
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

  const setExtraPool = newPool => {
    dispatch({
      type: "UPDATE_COMBAT",
      payload: {
        ...props.player,
        player_id: props.player.id,
        extraPool: newPool
      }
    });
  };
  const newInitiative = async isNew => {
    await dispatch({
      type: "UPDATE_COMBAT",
      payload: {
        player_id: props.player.id,
        initiative: isNew ? initiative : -5,
        has_initiative: isNew,
        extraPool: props.extraPool
      }
    });
  };
  return (
    <div className={props.myTurn ? "card col-5 m-1 myTurn" : "card col-5 m-1"}>
      {!dead && props <= 0 && successfulSaves < 3 && props.myTurn ? (
        <div>
          <span>
            <div className="green">{successfulSaves}</div>
            <div className="red">{failedSaves}</div>
          </span>
          <button
            className="btn btn-success"
            onClick={() => {
              props.nextPlayer();
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
              props.nextPlayer();
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
      <div className="mb-2 row">
        <div className="col-6 name">Name: {props.player.name}</div>
        <div className="col-6 name">
          Hitpoints:{current_hitpoints}
          <button
            className="btn-sm btn-danger"
            onClick={() => {
              const hitPointChange =
                -1 *
                (parseInt(incomingDamage) > 0 ? parseInt(incomingDamage) : 1);
              setHitPoints(parseInt(current_hitpoints) + hitPointChange);
              setIncomingDamage(0);
            }}
          >
            -
          </button>
          <input
            className="col-3"
            value={incomingDamage > 0 ? incomingDamage : ""}
            onChange={event => setIncomingDamage(event.target.value)}
          />
          <button
            className="btn-sm btn-success"
            onClick={() => {
              const hitPointChange =
                parseInt(incomingDamage) > 0 ? parseInt(incomingDamage) : 1;
              setHitPoints(parseInt(current_hitpoints) + hitPointChange);
              setIncomingDamage(0);
            }}
          >
            +
          </button>
        </div>
        <div className="col-6 name">
          AC: {props.player.armor_class}
          {props.player.has_initiative && (
            <div>
              Extra Time Pool:
              <div className="red">{props.player.extra_time_pool}</div>
            </div>
          )}
        </div>
        {props.valuesSet && (
          <div className="col-6 name">
            Initiative:
            {props.player.has_initiative ? (
              <div>{props.player.initiative}</div>
            ) : (
              <div className="row">
                <input
                  className="col-5"
                  value={initiative === -5 ? "" : initiative}
                  onChange={event => setInitiative(event.target.value)}
                />{" "}
                <button
                  className="btn-sm btn-primary col-7"
                  onClick={() => newInitiative(true)}
                >
                  Set Initiative
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
export default PlayerTimer;
