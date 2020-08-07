import React from "react";
import { Box, LinearProgress, Typography } from "@material-ui/core";

//
//
const GameProgressLine: React.FC<{ cardsLeft: number }> = ({ cardsLeft }) => {
  const MIN = 0;
  const MAX = 81;
  const normalize = (value: number) => ((value - MIN) * 100) / (MAX - MIN);
  return (
    <Box display="flex" alignItems="center" flexDirection="column">
      <Box width="100%">
        <LinearProgress variant="determinate" value={normalize(cardsLeft)} />
      </Box>
      <Box minWidth={100}>
        <Typography
          style={{ marginRight: 5 }}
          component="span"
          variant="body2"
          color="textSecondary"
        >
          deck:
        </Typography>
        <Typography component="span">{cardsLeft}</Typography>
      </Box>
    </Box>
  );
};

export default GameProgressLine;
