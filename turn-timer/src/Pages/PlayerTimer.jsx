import React, { Component } from 'react'
import { connect } from 'react-redux'
import Swal from "sweetalert2"
import "../Pages_Styling/TurnTimer.css"
class PlayerTimer extends Component {
  state = {
    name: this.props.name || "UNNAMED PLAYER",
    armorClass: this.props.armorClass,
    hitPoints: this.props.hitpoints,
    initiative: null,
    hasInitiative: false,
    countDown: this.props.time || 60,
    extrapool: this.props.extraPool || 60,
    running: false,
  }

  timer = null;
  componentDidMount() {
    if (this.props.myTurn) {
      this.startTimer();
    }
  }
  componentDidUpdate() {
    if (this.props.myTurn) {
      if (this.state.hitPoints == 0) {
        this.nextPlayer();
      } else {
        this.startTimer();
      }
    }
    else {
      this.resetTimer();
      console.log("resetting")
    }
  }
  startTimer = () => {
    if (this.state.running === false) {
      this.timer = setInterval(() => this.tick(), 1000);
      this.setState({ running: true });
    }
  }

  resetTimer = () => {
    clearInterval(this.timer);
    if (this.state.countDown != this.props.time) {
    }
  }
  tick() {
    if (this.state.countDown > 0) {
      const current = this.state.countDown;
      this.setState({ countDown: current - 1 });
    } else if (this.state.extrapool > 0) {

      const current = this.state.extrapool;
      this.setState({ extrapool: current - 1 });
    } else {
      Swal.fire(
        'You took too long',
        'Your Character spends this turn figuring out what to do',
        'warning'
      ).then(
        this.resetTimer())
    }
  }
  nextPlayer = () => {
    this.props.nextPlayer();
    this.setState({
      countDown: this.props.time,
      running: false
    })
    this.resetTimer();
  }
  setInitiative=(event)=>{ 
    this.setState({
      hasInitiative:true,
    })
  }
  render() {
    return (
      <div className={this.props.myTurn?"card col-5 m-1 myTurn":"card col-5 m-1"}>
        <div className="mb-2 row">
          <div className="col-6 name">Name: {this.state.name}
          </div>
          <div className="col-6 name">Hitpoints:{this.state.hitPoints}
            <button className="btn btn-danger" onClick={()=>this.setState({hitPoints:this.state.hitPoints-1})}>-</button>
            <button className="btn btn-success" onClick={()=>this.setState({hitPoints:this.state.hitPoints+1})}>+</button>
          </div>
          <div className="col-6 name">AC: {this.state.armorClass}</div>
          <div className="col-6 name">Initiative:{this.state.hasInitiative?<div>{this.state.initiative}</div>:<div><input value = {this.state.initiative} onChange={(event)=>this.setState({initiative:event.target.value})}/> <button className="btn btn-primary" onClick={(event)=>this.setInitiative(event)}>Set Initiative</button></div>}</div>
        </div>
        <div className="timer row time">
          <div className="timer col-6">Time Remaining</div>
          <div className="timer col-3 ">{this.state.countDown}:
            <div className="btn btn-danger">
              {this.state.extrapool}
            </div>
          </div>
          {this.props.myTurn && <button className="btn btn-primary " onClick={() => this.nextPlayer(this.state.initiative)}>Next Turn</button>}
        </div>
      </div>
    );
  }
}
export default PlayerTimer