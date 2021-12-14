import { Fragment, useEffect } from "react";
import { useDispatch } from "react-redux";

function Timer(props) {
  const dispatch = useDispatch();
  const {
    setTime,
    nextPlayer,
    player,
    time,
    extra_time_pool,
    myTurn,
    running
  } = props;
  let interval = null;
  const tick = () => {
    if (time > 0) {
      setTime(time - 1);
    } else if (extra_time_pool > 0) {
      setExtraPool(extra_time_pool - 1);
    } else {
      clearInterval(interval);
      interval = null;
      nextPlayer();
    }
  };
  useEffect(() => {
    if (myTurn && running && interval == null) {
      interval = setInterval(() => tick(), 1000);
    } else if ((!myTurn || !running) && interval != null)
      clearInterval(interval);
    return () => clearInterval(interval);
  }, [time, running, myTurn, extra_time_pool]);

  const setExtraPool = newPool => {
    dispatch({
      type: "UPDATE_COMBAT",
      payload: {
        ...player,
        player_id: player.id,
        extraPool: newPool
      }
    });
  };
  return (
    <Fragment>
      <div className="col-6 name">
        Extra Time Pool:
        <div className="red">{player.extra_time_pool}</div>
      </div>
    </Fragment>
  );
}
export default Timer;
