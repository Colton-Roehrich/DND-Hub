import React from "react";
import reactDom from "react-dom";
import '../App.css';
//this prolly does work may need to start over: tried using https://www.npmjs.com/package/statman-stopwatch and https://reactjs.org/docs/state-and-lifecycle.html
const Stopwatch = require('statman-stopwatch');
const stopwatch = new Stopwatch();

stopwatch.setStartTimeDelta(5000);
stopwatch.start();
var time = stopwatch.read();

function TurnTimer() {
    return (
      <div>
        <p id="time">{timerTime}</p>
      </div>
      
    );
  }
  
  export default TurnTimer;

 const timerTime = (
   <div>
     <p>{time}</p>
   </div>
 );
 reactDom.render(
   timerTime,
  document.getElementById('root')
  );