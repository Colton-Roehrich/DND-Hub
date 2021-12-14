import StatusEffectButton from "./StatusEffectButton";
function PlayerStatusEffect(props) {
  const { player } = props;
  const Statuses = [
    { statusName: "Charmed", iconClass: "two-hearts" },
    { statusName: "Grappled", iconClass: "hand" },
    { statusName: "Restrained", iconClass: "chain" },
    { statusName: "Paralyzed", iconClass: "lightning-trio" },
    { statusName: "Stunned", iconClass: "aware" },
    { statusName: "Blinded", iconClass: "bleeding-eye" },
    { statusName: "Deafened", iconClass: "ringing-bell" },
    { statusName: "Invisible", iconClass: "aura" },
    { statusName: "Petrified", iconClass: "locked-fortress" },
    { statusName: "Poisoned", iconClass: "death-skull" },
    { statusName: "Prone", iconClass: "player-despair" },
    { statusName: "Haste", iconClass: "player-dodge" }
  ];
  return (
    <div className="row col-12">
      {Statuses.map(status => (
        <StatusEffectButton
          key={status.statusName}
          player={player}
          statusName={status.statusName}
          iconClass={status.iconClass}
        />
      ))}
    </div>
  );
}
export default PlayerStatusEffect;
