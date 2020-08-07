/* eslint-disable no-underscore-dangle */
import { Typography } from "@material-ui/core";
import { blue, green, purple, red } from "@material-ui/core/colors";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { CountdownCircleTimer } from "react-countdown-circle-timer";
import { motion, AnimatePresence } from "framer-motion";
import { useSoloGameCtx } from "@context/game/SoloGameCtx";

const RenderTime: React.FC<{
  remainingTime: number;
  secondsPerBonus: number;
}> = ({ remainingTime, secondsPerBonus }) => {
  const [bonusPoints, setBonusPoints] = useState(6);
  const { soloDispatch } = useSoloGameCtx();

  useEffect(() => {
    const secondsPerPoint = secondsPerBonus / 6;
    const _bonusPoints = Math.ceil(remainingTime / secondsPerPoint);
    setBonusPoints(_bonusPoints);
    soloDispatch({
      type: "SET_BONUS_POINTS",
      payload: { bonusPoints: _bonusPoints },
    });
  }, [remainingTime, secondsPerBonus]);

  return (
    <motion.div
      initial={{ scale: 0, opacity: 0 }}
      animate={
        bonusPoints ? { scale: 1, opacity: 1 } : { scale: 0, opacity: 0 }
      }
      style={{ textAlign: "center" }}
    >
      <Typography variant="caption">Bonus Points</Typography>
      <div
        style={{
          position: "relative",
          padding: "30%",
        }}
      >
        <AnimatePresence>
          <motion.div
            key={bonusPoints}
            style={{
              position: "absolute",
              left: "50%",
              translateX: "-50%",
              translateY: "-50%",
            }}
            initial={{ y: 40, opacity: 0 }}
            animate={{ y: 0, opacity: 1, transition: { duration: 0.5 } }}
            exit={{ y: -40, opacity: 0, transition: { duration: 0.5 } }}
          >
            <Typography variant="h3">{bonusPoints}</Typography>
          </motion.div>
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

const CountdownToGame: React.FC<{
  onCountdownEnd: () => void;
}> = ({ onCountdownEnd }) => {
  const { soloState } = useSoloGameCtx();
  const secondsPerBonus = 21;
  const { latestSetTime } = soloState;
  const secondsLeft = latestSetTime
    ? moment
        .duration(
          moment(latestSetTime).add(secondsPerBonus, "seconds").diff(moment())
        )
        .asSeconds()
    : 0;
  const handleComplete = () => {
    onCountdownEnd();
  };

  return (
    <CountdownCircleTimer
      key={latestSetTime}
      isPlaying={secondsLeft > 0}
      size={200}
      duration={secondsPerBonus}
      initialRemainingTime={Math.max(secondsLeft, 0)}
      colors={[
        [green[400], 0.2],
        [blue[400], 0.4],
        [purple[400], 0.6],
        [red[400], 0.8],
      ]}
      onComplete={handleComplete}
    >
      {({ remainingTime }) => {
        return <RenderTime {...{ remainingTime, secondsPerBonus }} />;
      }}
    </CountdownCircleTimer>
  );
};

export default CountdownToGame;
