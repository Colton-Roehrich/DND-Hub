function MassRoll({ rolledDice, setRolledDice, setResult }) {
  const rollDice = (sides, diceToRoll) => {
    let result = 0;
    let diceRolled = 0;
    if (diceToRoll != 0) {
      do {
        result += Math.floor(Math.random() * sides) + 1;
        ++diceRolled;
      } while (diceRolled < diceToRoll);
    }
    return result;
  };
  const rollAllDice = () => {
    let result = 0;
    result += rollDice(100, rolledDice.D100);
    result += rollDice(20, rolledDice.D20);
    result += rollDice(12, rolledDice.D12);
    result += rollDice(10, rolledDice.D10);
    result += rollDice(8, rolledDice.D8);
    result += rollDice(6, rolledDice.D6);
    result += rollDice(4, rolledDice.D4);
    setResult(result);
  };
  const clearAllDice = () => {
    setRolledDice({
      D4: 0,
      D6: 0,
      D8: 0,
      D10: 0,
      D12: 0,
      D20: 0,
      D100: 0
    });
  };
  return (
    <div className="white row ml-2 col-11 d-flex justify-content-around">
      <button
        className="BigRoller col-10 btn btn-success"
        onClick={() => rollAllDice()}
      >
        Roll Summed Dice
      </button>
      <button
        className="SmallRoller col-2 btn btn-danger"
        onClick={() => clearAllDice()}
      >
        Clear Selected Dice
      </button>
    </div>
  );
}
export default MassRoll;
