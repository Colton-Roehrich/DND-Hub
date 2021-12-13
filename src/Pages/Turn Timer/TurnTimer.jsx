import React, { Component, Fragment } from "react";
import { useEffect } from "react";
import { useState } from "react";
import { connect, useDispatch, useSelector } from "react-redux";
import "../../Pages_Styling/TurnTimer.css";
import Timer from "./Timer";
import AdjustSettings from "./AdjustSettings";
import NewPlayer from "./NewPlayer";
import PlayerTimer from "./PlayerTimer";
import InactivePlayers from "./InactivePlayers";
function TimeoutComponent() {
  const dispatch = useDispatch();
  const [timeElapsed, setTimeElapsed] = useState(null);
  const [countDown, setCountDown] = useState(null);
  const [valuesSet, setValuesSet] = useState(false);
  const [time, setTime] = useState(0);
  const [extraPool, setExtraPool] = useState(-1);
  const [running, setRunning] = useState(false);
  const [index, setIndex] = useState(-1);
  const characters = useSelector(state => state.activeCharacters);
  useEffect(() => {
    dispatch({ type: "GET_ACTIVE_CHARACTERS" });
    dispatch({ type: "GET_INACTIVE_CHARACTERS" });
  }, []);

  const nextPlayer = () => {
    if (index < characters.length - 1) {
      setIndex(index + 1);
    } else {
      setIndex(0);
      setTimeElapsed(timeElapsed + 6);
    }
    setTime(countDown);
  };
  const startCombat = () => {
    nextPlayer();
    setRunning(true);
  };
  return (
    <div className="row">
      <div className="row col-6">
        <NewPlayer />
      </div>
      <div className="row col-6">
        <InactivePlayers />
      </div>
      <div className="row col-8 d-flex justify-content-center">
        <div className="col-12">
          <AdjustSettings
            setCountDown={setCountDown}
            countDown={countDown}
            setExtraPool={setExtraPool}
            extraPool={extraPool}
            startCombat={startCombat}
            running={running}
            setRunning={setRunning}
            valuesSet={valuesSet}
            setValuesSet={setValuesSet}
            index={index}
            nextPlayer={nextPlayer}
            timeElapsed={timeElapsed}
            setTimeElapsed={setTimeElapsed}
          />
        </div>
        <div className="col-12">
          <Timer time={time} />
        </div>
      </div>
      <div className="row col-12">
        {characters
          .sort((x, y) =>
            x.initiative < y.initiative
              ? 1
              : x.initiative > y.initiative
              ? -1
              : 0
          )
          .map(x => (
            <PlayerTimer
              className="row col-6"
              nextPlayer={nextPlayer}
              myTurn={index === characters.indexOf(x)}
              valuesSet={valuesSet}
              player={x}
              setTime={setTime}
              time={time}
              extraPool={extraPool}
              running={running}
            />
          ))}
      </div>
    </div>
  );
}
export default TimeoutComponent;
