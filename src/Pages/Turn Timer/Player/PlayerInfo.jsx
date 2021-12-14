import { Fragment } from "react";

function PlayerInfo(props) {
  const { player } = props;
  return (
    <Fragment>
      <div className="col-6 name">Name: {player.nickname}</div>
      <div className="col-6 name">AC: {player.armor_class}</div>
    </Fragment>
  );
}
export default PlayerInfo;
