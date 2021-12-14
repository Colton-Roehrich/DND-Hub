import { useDispatch } from "react-redux";
import "../../../../Pages_Styling/Rpg-Awesome-master/css/rpg-awesome.css";

function StatusEffectButton(props) {
  const dispatch = useDispatch();
  const { player, statusName, iconClass } = props;
  const setStatusEffect = async status => {
    if (player.status_effect === status) {
      await dispatch({
        type: "UPDATE_COMBAT",
        payload: {
          ...player,
          status_effect: "none"
        }
      });
    } else if (
      player.status_effect === "none" ||
      player.status_effect === null
    ) {
      await dispatch({
        type: "UPDATE_COMBAT",
        payload: {
          ...player,
          player_id: player.id,
          status_effect: status
        }
      });
    }
  };
  return (
    <button
      onClick={() => setStatusEffect(statusName)}
      className={
        player.status_effect == statusName
          ? `btn btn-primary ra ra-${iconClass} ra-lg col-1`
          : `btn btn-secondary ra ra-${iconClass} ra-lg col-1`
      }
      title={statusName}
    ></button>
  );
}
export default StatusEffectButton;
