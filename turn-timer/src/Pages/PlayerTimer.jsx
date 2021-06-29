import React, { Component } from 'react'
import { connect } from 'react-redux'
import Swal from "sweetalert2"
import "../Pages_Styling/TurnTimer.css"
class PlayerTimer extends Component {
  state = {
    name: this.props.name || "UNNAMED PLAYER",
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
      this.startTimer();
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
  render() {
    return (
      <div className="timer">
        {this.props.myTurn &&
          <button onClick={() => this.nextPlayer()}>NextTurn</button>}
        {this.state.countDown}:
        <div className="btn btn-danger">
          {this.state.extrapool}</div>
      </div>
    );
  }
}
export default PlayerTimer