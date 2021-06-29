import React, { Component } from 'react'
import { connect } from 'react-redux'
import "../Pages_Styling/TurnTimer.css"
import PlayerTimer from './PlayerTimer';
class TimeoutComponent extends Component {
  state = {
    countDown: 1,
    running: false,
    currentIndex: 0,
    maxIndex: this.props.players.length-1 || 0,
  }
  nextPlayer=()=>{
    if(this.state.currentIndex<this.state.maxIndex){
      this.setState({currentIndex:this.state.currentIndex+1})
    }else{
      this.setState({currentIndex:0})
    }
  }
  render() {
    return (
      <div className="timer">
        {this.props.players.map(x => <PlayerTimer nextPlayer={this.nextPlayer} myTurn={this.state.currentIndex === this.props.players.indexOf(x)} name={x} time={this.state.countDown} extraPool={1}></PlayerTimer>)}
      </div>
    );
  }
}
const mapStateToProps = (state) => {
    return {
      players: ["Fred", "Proto", "Shiro", "Yaza", "Wren"]
    };
}
export default connect(mapStateToProps)(TimeoutComponent)