import React, { useState, useRef } from "react";
import { CountdownCircleTimer } from "react-countdown-circle-timer";
import { useGameCtx } from "@context/game/GameCtx";
import moment from "moment";
import styled from "styled-components";
import { Button, Typography } from "@material-ui/core";

const FullPageDiv = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const renderTime = ({ remainingTime }) => {
  const currentTime = useRef(remainingTime);
  const prevTime = useRef(null);
  const isNewTimeFirstTick = useRef(false);
  const [, setOneLastRerender] = useState(0);

  if (currentTime.current !== remainingTime) {
    isNewTimeFirstTick.current = true;
    prevTime.current = currentTime.current;
    currentTime.current = remainingTime;
  } else {
    isNewTimeFirstTick.current = false;
  }

  // force one last re-render when the time is over to tirgger the last animation
  if (remainingTime === 0) {
    setTimeout(() => {
      setOneLastRerender((val) => val + 1);
    }, 20);
  }

  const isTimeUp = isNewTimeFirstTick.current;

  return (
    <div className="time-wrapper">
      <div key={remainingTime} className={`time ${isTimeUp ? "up" : ""}`}>
        {remainingTime}
      </div>
      {prevTime.current !== null && (
        <div
          key={prevTime.current}
          className={`time ${!isTimeUp ? "down" : ""}`}
        >
          {prevTime.current}
        </div>
      )}
      <style jsx>
        {`
          .timer-wrapper {
            display: flex;
            justify-content: center;
          }

          .time-wrapper {
            position: relative;
            width: 80px;
            height: 60px;
            font-size: 40px;
            font-family: "Roboto";
          }

          .time-wrapper .time {
            position: absolute;
            left: 0;
            top: 0;
            width: 100%;
            height: 100%;
            display: flex;
            justify-content: center;
            align-items: center;
            transform: translateY(0);
            opacity: 1;
            transition: all 0.2s;
          }

          .time-wrapper .time.up {
            opacity: 0;
            transform: translateY(-100%);
          }

          .time-wrapper .time.down {
            opacity: 0;
            transform: translateY(100%);
          }
        `}
      </style>
    </div>
  );
};

const CountdownToGame = ({
  onCountdownEnd,
}: {
  onCountdownEnd: () => void;
}) => {
  const { gameStartTime, dispatch } = useGameCtx();

  const secondsTillStart =
    (gameStartTime &&
      Math.max(
        0,
        moment.duration(moment(gameStartTime).diff(moment())).asSeconds()
      )) ||
    5;

  const handleComplete = () => {
    dispatch({ type: "ACTIVATE_DELAYED_STATE", payload: {} });
    onCountdownEnd();
  };
  if (!secondsTillStart) return null;
  return (
    <FullPageDiv>
      <Typography gutterBottom variant="h3">
        Game Starting
      </Typography>
      <CountdownCircleTimer
        key={secondsTillStart}
        isPlaying={!!secondsTillStart}
        size={200}
        duration={5}
        initialRemainingTime={secondsTillStart}
        colors={[
          ["#004777", 0.33],
          ["#F7B801", 0.33],
          ["#A30000", 0.33],
        ]}
        onComplete={handleComplete}
      >
        {renderTime}
      </CountdownCircleTimer>
    </FullPageDiv>
  );
};

export default CountdownToGame;
