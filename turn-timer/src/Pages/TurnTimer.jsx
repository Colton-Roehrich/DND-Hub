import React, { Component } from 'react'
import { connect } from 'react-redux'
import "../Pages_Styling/TurnTimer.css"
import PlayerTimer from './PlayerTimer';
class TimeoutComponent extends Component {
  state = {
    countDown: null,
    extraPool: null,
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
  startTimer=()=>{
    this.setState({
      running:true
    })
  }
  setCountDown=(event)=>{
    this.setState({
      countDown:event.target.value
    })
  }
  setExtraPool=(event)=>{
    this.setState({
      extraPool:event.target.value
    })
  }
  render() {
    return (
      <div className="timer">
        <input className="input" placeholder="Time Per Turn" value={this.state.countDown} onChange={(event)=>this.setCountDown(event)}/>
        <input className="input" placeholder="Extra Time Pool" value={this.state.extraPool} onChange={(event)=>this.setExtraPool(event)}/>
        <button onClick={()=>this.startTimer()}>Start Combat</button>
        {this.state.running && this.props.players.map(x => <PlayerTimer nextPlayer={this.nextPlayer} myTurn={this.state.currentIndex === this.props.players.indexOf(x) } name={x} time={this.state.countDown} extraPool={this.state.extraPool}></PlayerTimer>)}
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