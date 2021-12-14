import { useState } from "react";
import { useDispatch } from "react-redux";

function PlayerHealth(props) {
  const { player } = props;
  const { current_hitpoints } = player;
  const dispatch = useDispatch();
  const [incomingDamage, setIncomingDamage] = useState(0);
  const setHitPoints = value => {
    dispatch({
      type: "UPDATE_CHARACTER",
      payload: {
        ...player,
        current_hitpoints: value
      }
    });
  };
  return (
    <div className="col-6 name">
      Hitpoints:{current_hitpoints}
      <button
        className="btn-sm btn-danger"
        onClick={() => {
          const hitPointChange =
            -1 * (parseInt(incomingDamage) > 0 ? parseInt(incomingDamage) : 1);
          setHitPoints(parseInt(current_hitpoints) + hitPointChange);
          setIncomingDamage(0);
        }}
      >
        -
      </button>
      <input
        className="col-3"
        value={incomingDamage > 0 ? incomingDamage : ""}
        onChange={event => setIncomingDamage(event.target.value)}
      />
      <button
        className="btn-sm btn-success"
        onClick={() => {
          const hitPointChange =
            parseInt(incomingDamage) > 0 ? parseInt(incomingDamage) : 1;
          setHitPoints(parseInt(current_hitpoints) + hitPointChange);
          setIncomingDamage(0);
        }}
      >
        +
      </button>
    </div>
  );
}
export default PlayerHealth;
