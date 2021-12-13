import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import "../../Pages_Styling/TurnTimer.css";
function PlayerTimer(props) {
  const {
    player,
    myTurn,
    running,
    nextPlayer,
    time,
    setTime,
    extraPool,
    valuesSet
  } = props;
  const {
    current_hitpoints,
    has_initiative,
    id,
    extra_time_pool,
    nickname,
    armor_class,
    status_effect,
    status_effect_time
  } = player;
  const dispatch = useDispatch();
  const [incomingDamage, setIncomingDamage] = useState(0);
  const [dead, setDead] = useState(false);
  const [failedSaves, setFailedSaves] = useState(0);
  const [successfulSaves, setSuccessfulSaves] = useState(0);
  const [initiative, setInitiative] = useState(props.player.initiative);
  let interval = null;
  const setHitPoints = value => {
    dispatch({
      type: "UPDATE_CHARACTER",
      payload: {
        ...player,
        current_hitpoints: value
      }
    });
  };
  useEffect(() => {
    newInitiative(false);
  }, []);
  useEffect(() => {
    if (myTurn && running && (interval === null || !interval.running)) {
      if (dead || successfulSaves >= 3 || failedSaves >= 3) {
        nextPlayer();
      }
      interval = setInterval(() => {
        if (time > 0) {
          setTime(() => time - 1);
        } else if (extra_time_pool > 0) {
          setExtraPool(extra_time_pool - 1);
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

  const setExtraPool = newPool => {
    dispatch({
      type: "UPDATE_COMBAT",
      payload: {
        ...player,
        player_id: id,
        extraPool: newPool
      }
    });
  };
  const newInitiative = async isNew => {
    await dispatch({
      type: "UPDATE_COMBAT",
      payload: {
        player_id: id,
        initiative: isNew ? initiative : -5,
        has_initiative: isNew,
        extraPool: extraPool
      }
    });
  };
  return (
    <div className={myTurn ? "card col-5 m-1 myTurn" : "card col-5 m-1"}>
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
      <div className="mb-2 row">
        <div className="col-6 name">Name: {nickname}</div>
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
              setDead(false);
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
          AC: {armor_class}
          {has_initiative && (
            <div>
              Extra Time Pool:
              <div className="red">{extra_time_pool}</div>
            </div>
          )}
        </div>
        {valuesSet && (
          <div className="col-6 name">
            Initiative:
            {has_initiative ? (
              <div>{initiative}</div>
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
      <button></button>
      <button></button>
      <button></button>
      <button></button>
      <button></button>
      <button></button>
      <button
        className="btn btn-danger"
        onClick={() =>
          dispatch({ type: "DELETE_COMBAT", payload: { character_id: id } })
        }
      >
        Remove from combat
      </button>
    </div>
  );
}
export default PlayerTimer;
