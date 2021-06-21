import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { default as Navigation } from "./Shared/Navigation";
import { default as Footer } from "./Shared/Footer";
import { default as Home } from "./Pages/Home";
import { default as About } from "./Pages/About";
import { default as Contact } from "./Pages/Contact";
import { default as DieRoller } from "./Pages/DieRoller";
import { default as TurnTimer} from "./Pages/TurnTimer";
function App() {
  return (
    
    <div className="App">
  <Router>
        <Navigation />
        <Switch>
          <Route path="/" exact component={() => <Home />} />
          <Route path="/about" exact component={() => <About />} />
          <Route path="/contact" exact component={() => <Contact />} />
          <Route path="/DieRoller" exact component={() => <DieRoller />} />
          <Route path="/TurnTimer" exact component={() => <TurnTimer />} />
        </Switch>
        <Footer />
      </Router>
      
        
        
    </div>
  );
}

export default App;
