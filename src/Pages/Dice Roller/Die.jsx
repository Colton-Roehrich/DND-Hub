import { Fragment } from "react";
import "../../Pages_Styling/Rpg-Awesome-master/css/rpg-awesome.css";
function Die({
  src,
  width,
  AddDie,
  rolledDice,
  type,
  rollDie,
  sides,
  ClearRoll
}) {
  return (
    <Fragment>
      <div
        className="row col-2 d-flex justify-content-center"
        id="DiceRollPage"
      >
        <button className="col-10 item btn" onClick={() => rollDie(sides)}>
          <img id="DiePic" src={src} width={width}></img>
        </button>
        <div id="buttonRow">
          <button
            className="col-8 btn"
            id="AddToRollList"
            onClick={() => AddDie(type, rolledDice[type] + 1)}
          >
            <i class="ra ra-sword" />
          </button>
          <button
            className="col-6 d-flex justify-content-center btn btn-danger"
            onClick={() => ClearRoll(type)}
          >
            <i id="cancelButton" class="ra ra-cancel" />
          </button>
        </div>
        <div className="col-12 d-flex justify-content-center">
          {rolledDice[type] > 0 && rolledDice[type] + type.toString()}
        </div>
      </div>
    </Fragment>
  );
}
export default Die;
