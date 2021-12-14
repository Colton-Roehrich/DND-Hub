function Timer(props) {
  const { time } = props;
  return (
    <div>
      <h1 className="white">Time remaining: {time}</h1>
    </div>
  );
}
export default Timer;
