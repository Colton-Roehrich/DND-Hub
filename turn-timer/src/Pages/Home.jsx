import { BrowserRouter as Router,NavLink, Link, withRouter, Route } from "react-router-dom";
import React from "react";
import '../App.css';


import { default as About } from "../Pages/About";
import { default as Contact } from "../Pages/Contact";
import { default as DieRoller } from "../Pages/DieRoller";

var dragonDieLink = "https://cdn.shopify.com/s/files/1/0890/1750/files/full_colorno_txt_no_flames_9955d095-d56c-4bfe-905f-d54071c4d4da_600x.png";
var hourglassLink = "https://www.dandwiki.com/w/images/b/b5/Latest%3Fcb%3D20090512212031.png";
var spellbookLink = "https://i.pinimg.com/originals/9b/f5/39/9bf539fb3665c23eebdece0c778623c0.png";
var monsterLink =   "http://media.wizards.com/2014/images/dnd/newtodnd/beholder_1.png"
function Home(props) {
  return (
    <div className="home">
      <div className="grid-container">
            <div className="item1">
              
              <header className="App-header">
          
                  <Link class="nav-link" to="/DieRoller">
                    <h4>Die Roller</h4>
                    <img src={dragonDieLink} id="die roller" className="App-logo" alt="logo" />
                    <span class="sr-only">(current)</span>
                  </Link>
                
              </header>
            </div>

            <div className="item2">
            <Link class="nav-link" to="/TurnTimer">
              <h4>Turn Timer</h4>
              <header className="App-header">
                  <img src={hourglassLink} id="turn tracker" className="App-logo" alt="logo" />
                <span class="sr-only">(current)</span>
              </header>
            </Link>
            
            </div>

            <div className="item3">
            <h4>Spells and Weapons</h4>
            <header className="App-header">
                <img src={spellbookLink} id="spells and weapons" className="App-logo" alt="logo" />
                <span class="sr-only">(current)</span>
                </header>
            </div>

            <div className="item4">
            <h4>Die Roller</h4>
            <header className="App-header">
                <img src={monsterLink} id="die roller" className="App-logo" alt="logo" />
            </header>
            </div>
        </div>
    </div>
  );
}

export default Home;