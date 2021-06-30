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
    maxIndex: 5,
  }
  componentDidMount(){
    this.props.dispatch({type:"GET_CHARACTERS"})
  }
  nextPlayer=(initiative)=>{
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
  comparePlayers=(playerA, playerB)=>{
    return playerA.initiative-playerB.initiative;
  }
  componentDidUpdate(){
    console.log(this.props.characters)
  }
  render() {
    return (
      <div className="timer">
      <select>
        {this.props.characters.length > 0 && this.props.characters.map(x=><option value={x.name}>{x.name}</option>)}

        </select>
        <input className="input" placeholder="Time Per Turn" value={this.state.countDown} onChange={(event)=>this.setCountDown(event)}/>
        <input className="input" placeholder="Extra Time Pool" value={this.state.extraPool} onChange={(event)=>this.setExtraPool(event)}/>
        <button onClick={()=>this.startTimer()}>Start Combat</button><div className="row">
        {this.state.running && this.props.characters.sort(function(a,b){return b.initiative-a.initiative}).map(x => <PlayerTimer nextPlayer={this.nextPlayer} myTurn={this.state.currentIndex === this.props.characters.indexOf(x)}  name={x.name} initiative={x.initiative} armorClass={x.armorClass}  hitpoints={x.hitpoints} time={this.state.countDown} extraPool={this.state.extraPool}></PlayerTimer>)}
        </div>
      </div>
    );
  }
}
const mapStateToProps = (state) => {
    return {
      characters: state.characters
    };
}
export default connect(mapStateToProps)(TimeoutComponent)