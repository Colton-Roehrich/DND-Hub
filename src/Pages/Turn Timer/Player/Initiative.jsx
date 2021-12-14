import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

function Initiative(props) {
  const dispatch = useDispatch();
  const { valuesSet, player, extraPool } = props;
  const [initiative, setInitiative] = useState(props.player.initiative);
  useEffect(() => {
    return async () => {
      await setInitiative(-5);
      await newInitiative(false);
    };
  }, []);
  useEffect(() => {
    newInitiative(false);
  }, []);

  const newInitiative = async isNew => {
    await dispatch({
      type: "UPDATE_COMBAT",
      payload: {
        player_id: player.id,
        initiative: isNew ? initiative : -5,
        has_initiative: isNew,
        extraPool: extraPool
      }
    });
  };
  return (
    <div className="col-6 row">
      {valuesSet && (
        <div className="col-6 name">
          Initiative:
          {player.has_initiative ? (
            <div>{player.initiative}</div>
          ) : (
            <div className="row">
              <input
                className="col-5"
                value={initiative === -5 ? "" : initiative}
                onChange={event => setInitiative(event.target.value)}
              />{" "}
              <button
                className="btn-sm btn-primary col-7"
                onClick={() => {
                  newInitiative(true);
                  setInitiative(-5);
                }}
              >
                Set Initiative
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
export default Initiative;
