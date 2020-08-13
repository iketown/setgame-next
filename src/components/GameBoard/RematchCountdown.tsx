import React from "react";
import moment from "moment";
import Timer from "react-compound-timer";

const RematchCountdown: React.FC<{
  nextGameStart: string;
  autoNavToGame: () => void;
}> = ({ nextGameStart, autoNavToGame }) => {
  const initialTime = moment
    .duration(moment(nextGameStart).diff(moment()))
    .asMilliseconds();
  if (initialTime < 0) {
    return null;
  }
  return (
    <div style={{ marginLeft: "10px" }}>
      <Timer
        checkpoints={[
          {
            time: 10 * 1000,
            callback: autoNavToGame,
          },
        ]}
        initialTime={initialTime}
        direction="backward"
        lastUnit="s"
      >
        <Timer.Seconds />
      </Timer>
    </div>
  );
};

export default RematchCountdown;
