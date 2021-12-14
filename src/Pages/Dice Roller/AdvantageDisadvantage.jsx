function AdvantageDisadvantage({
  hasAdvantage,
  setHasAdvantage,
  hasDisadvantage,
  setHasDisadvantage
}) {
  const setAdvantage = () => {
    setHasAdvantage(true);
    setHasDisadvantage(false);
  };
  const setDisadvantage = () => {
    setHasDisadvantage(true);
    setHasAdvantage(false);
  };
  const setPureRoll = () => {
    setHasDisadvantage(false);
    setHasAdvantage(false);
  };
  return (
    <div>
      <div
        id="advantageDiv"
        classname="row col-2 d-flex justify-content-center"
      >
        <h2>Select Advantage</h2>
        <div>
          <input
            id="pureRoll"
            type="radio"
            onChange={() => setPureRoll()}
            checked={!hasAdvantage && !hasDisadvantage}
          />
          <label for="pureRoll">Pure Roll</label>
        </div>
        <div>
          <input
            id="disadvantage"
            type="radio"
            onChange={() => setDisadvantage()}
            checked={hasDisadvantage}
          />
          <label for="disadvantage">Disadvantage</label>
        </div>
        <div>
          <input
            id="advantage"
            type="radio"
            onChange={() => setAdvantage()}
            checked={hasAdvantage}
          />
          <label for="advantage">Advantage Roll</label>
        </div>
      </div>
    </div>
  );
}
export default AdvantageDisadvantage;
