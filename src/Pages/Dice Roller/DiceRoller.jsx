import D4 from "./Dice/D4.png";
import D6 from "./Dice/D6.png";
import D8 from "./Dice/D8.png";
import D10 from "./Dice/D10.png";
import D12 from "./Dice/D12.png";
import D20 from "./Dice/D20.png";
import D100 from "./Dice/D100.svg";
import Die from "./Die";
import { useState } from "react";
import MassRoll from "./MassRoll";
import AdvantageDisadvantage from "./AdvantageDisadvantage";
function DiceRoller() {
  const [rolledDice, setRolledDice] = useState({
    D4: 0,
    D6: 0,
    D8: 0,
    D10: 0,
    D12: 0,
    D20: 0,
    D100: 0
  });
  const [hasAdvantage, setHasAdvantage] = useState(false);
  const [hasDisadvantage, setHasDisadvantage] = useState(false);
  const [images] = useState([
    { src: D4, type: "D4", sides: 4 },
    { src: D6, type: "D6", sides: 6 },
    { src: D8, type: "D8", sides: 8 },
    { src: D10, type: "D10", sides: 10 },
    { src: D12, type: "D12", sides: 12 },
    { src: D20, type: "D20", sides: 20 },
    { src: D100, type: "D100", sides: 100 }
  ]);
  const [result, setResult] = useState(0);
  const RollDie = sides => {
    let rollResult = 0;
    if (hasAdvantage && sides === 20) {
      rollResult = Math.max(
        Math.floor(Math.random() * sides) + 1,
        Math.floor(Math.random() * sides) + 1
      );
    } else if (hasDisadvantage && sides === 20) {
      rollResult = Math.min(
        Math.floor(Math.random() * sides) + 1,
        Math.floor(Math.random() * sides) + 1
      );
    } else {
      rollResult = Math.floor(Math.random() * sides) + 1;
    }
    setResult(rollResult);
  };
  const AddDie = (die, value) => {
    console.log("adding die to array", rolledDice);
    setRolledDice({
      ...rolledDice,
      [die]: value
    });
  };
  const ClearRoll = die => {
    console.log("clearing all dice rolls");
    setRolledDice({
      ...rolledDice,
      [die]: 0
    });
  };
  return (
    <div className="white">
      <div className="d-inline-flex">
        {images.map(image => (
          <Die
            src={image.src}
            width={100}
            AddDie={AddDie}
            ClearRoll={ClearRoll}
            rolledDice={rolledDice}
            type={image.type}
            rollDie={RollDie}
            sides={image.sides}
          />
        ))}
      </div>
      <MassRoll
        rolledDice={rolledDice}
        setRolledDice={setRolledDice}
        setResult={setResult}
      />
      <AdvantageDisadvantage
        hasAdvantage={hasAdvantage}
        hasDisadvantage={hasDisadvantage}
        setHasAdvantage={setHasAdvantage}
        setHasDisadvantage={setHasDisadvantage}
      />
      <div id="result">RESULT: {result}</div>
    </div>
  );
}
export default DiceRoller;
