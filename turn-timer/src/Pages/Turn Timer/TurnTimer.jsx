import React, { Component, Fragment } from "react";
import { useEffect } from "react";
import { useState } from "react";
import { connect, useDispatch, useSelector } from "react-redux";
import "../../Pages_Styling/TurnTimer.css";
import PlayerTimer from "./PlayerTimer";
function TimeoutComponent() {
const dispatch = useDispatch();
  const [countDown, setCountDown] = useState(null);
  const [valuesSet, setValuesSet] = useState(false);
  const [time, setTime] = useState(0);
  const [extraPool, setExtraPool] = useState(-1);
  const [running, setRunning] = useState(false);
  const [index, setIndex] = useState(-1);
  const characters = useSelector((state)=>state.characters);
  useEffect(()=>{
    dispatch({ type: "GET_CHARACTERS" });
  },[])

  const nextPlayer = () => {
    if (index < characters.length - 1 ) {
      setIndex(index+1);
    } else {
      setIndex(0);
    }
    setTime(countDown);
  };
  const startCombat = () => {
    nextPlayer();
    setRunning(true)
  };
    return (
      <div className="timer">
        <select>
          {characters.length > 0 &&
            characters
              .sort((x, y) => x.initiative < y.initiative ? 1 : x.initiative >y.initiative? -1:0)
              .map((x) => <option value={x.id}>{x.nickname}</option>)}
        </select>
        {valuesSet?<div className="white">time per turn = {countDown}, extra time pool:{extraPool}</div>:<div>
        <input
          className="input"
          placeholder="Time Per Turn"
          value={countDown}
          onChange={(event) => setCountDown(event.target.value)}
        />
        <input
          className="input"
          placeholder="Extra Time Pool"
          value={extraPool >-1?extraPool:''}
          onChange={(event) => {
            console.log('setting extra pool to ',event.target.value)
            setExtraPool(event.target.value)}}
        />
        <button className="btn btn-success"onClick={() => setValuesSet(true)}>Set Values</button></div>}
        {!running && valuesSet && index === -1 &&
        <button className="btn btn-success"onClick={() => startCombat()}>Start Combat</button>}
        {!running && valuesSet && index!=-1 ?
        <button className="btn btn-success" onClick={() => setRunning(true)}>Resume Combat</button>
        : running &&
        <button className="btn btn-warning" onClick={() => setRunning(false)}>Pause Combat</button>}
        :
        <h1 className="white">Time remaining: {time}</h1>
        <div className="row">
          {characters
              .sort((x, y) => x.initiative < y.initiative ? 1 : x.initiative > y.initiative ? -1 : 0)
              .map((x) => (
                <PlayerTimer
                  nextPlayer={nextPlayer}
                  myTurn={
                    index === characters.indexOf(x)
                  }
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
