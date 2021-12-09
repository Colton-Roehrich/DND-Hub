import React, { Component } from "react";
import { connect } from "react-redux";
import "../Pages_Styling/TurnTimer.css";
import PlayerTimer from "./PlayerTimer";
class TimeoutComponent extends Component {
  state = {
    countDown: null,
    extraPool: null,
    running: false,
    currentIndex: 0,
    maxIndex: 0,
  };
  componentDidMount() {
    this.props.dispatch({ type: "GET_CHARACTERS" });
  }
  nextPlayer = (initiative) => {
    console.log(this.props.characters);
    this.setState({ maxIndex: this.props.characters.length - 1 });
    if (this.state.currentIndex < this.state.maxIndex) {
      this.setState({ currentIndex: this.state.currentIndex + 1 });
    } else {
      this.setState({ currentIndex: 0 });
    }
  };
  startTimer = () => {
    this.setState({
      running: true,
    });
  };
  setCountDown = (event) => {
    this.setState({
      countDown: event.target.value,
    });
  };
  setExtraPool = (event) => {
    this.setState({
      extraPool: event.target.value,
    });
  };
  comparePlayers = (playerA, playerB) => {
    return playerA.initiative - playerB.initiative;
  };
  render() {
    return (
      <div className="timer">
        <select>
          {this.props.characters.length > 0 &&
            this.props.characters
              .sort((x, y) =>
                x.initiative > y.initiative && y.initiative > 0 ? 1 : -1
              )
              .map((x) => <option value={x.id}>{x.nickname}</option>)}
        </select>
        <input
          className="input"
          placeholder="Time Per Turn"
          value={this.state.countDown}
          onChange={(event) => this.setCountDown(event)}
        />
        <input
          className="input"
          placeholder="Extra Time Pool"
          value={this.state.extraPool}
          onChange={(event) => this.setExtraPool(event)}
        />
        <button onClick={() => this.startTimer()}>Start Combat</button>
        <div className="row">
          {this.state.running &&
            this.props.characters
              .sort(function (a, b) {
                return b.initiative - a.initiative;
              })
              .map((x) => (
                <PlayerTimer
                  nextPlayer={this.nextPlayer}
                  myTurn={
                    this.state.currentIndex === this.props.characters.indexOf(x)
                  }
                  player={x}
                  time={this.state.countDown}
                  extraPool={this.state.extraPool}
                ></PlayerTimer>
              ))}
        </div>
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    characters: state.characters,
  };
};
export default connect(mapStateToProps)(TimeoutComponent);
