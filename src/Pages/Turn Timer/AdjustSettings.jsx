import { useState } from "react";

function AdjustSettings(props) {
  const {
    countDown,
    setCountDown,
    extraPool,
    setExtraPool,
    startCombat,
    running,
    setRunning,
    valuesSet,
    setValuesSet,
    index,
    nextPlayer,
    timeElapsed
  } = props;
  return (
    <div>
      {valuesSet ? (
        <div className="white">
          time per turn = {countDown}, extra time pool:{extraPool}
        </div>
      ) : (
        <div>
          <input
            className="input"
            placeholder="Time Per Turn"
            value={countDown}
            onChange={event => setCountDown(event.target.value)}
          />
          <input
            className="input"
            placeholder="Extra Time Pool"
            value={extraPool > -1 ? extraPool : ""}
            onChange={event => {
              console.log("setting extra pool to ", event.target.value);
              setExtraPool(event.target.value);
            }}
          />
          <button
            className="btn btn-success"
            onClick={() => setValuesSet(true)}
          >
            Set Values
          </button>
        </div>
      )}
      {!running && valuesSet && index === -1 && (
        <button className="btn btn-success" onClick={() => startCombat()}>
          Start Combat
        </button>
      )}
      {!running && valuesSet && index != -1 ? (
        <button className="btn btn-success" onClick={() => setRunning(true)}>
          Resume Combat
        </button>
      ) : (
        running && (
          <button className="btn btn-warning" onClick={() => setRunning(false)}>
            Pause Combat
          </button>
        )
      )}
      {valuesSet && index != -1 && (
        <div>
          <button className="btn-sm btn-primary " onClick={() => nextPlayer()}>
            Next Turn
          </button>
          <div className="white">
            {" "}
            time elapsed:{" "}
            {Math.floor(timeElapsed / 60) + "m " + (timeElapsed % 60) + "s"}
          </div>
        </div>
      )}
    </div>
  );
}
export default AdjustSettings;
