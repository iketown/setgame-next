import React, { useEffect } from "react";
import { Grid, Typography } from "@material-ui/core";
import { SoloGameCtxProvider } from "@context/game/SoloGameCtx";
import SoloGame from "@components/SoloGame/SoloGame";
import { GameCtxProvider } from "@context/game/GameCtx";

const Orientation: React.FC = () => {
  return (
    <div>
      <Typography>hey hi there</Typography>
      <SoloGame specialDeck={["rf2s", "re2s", "rs2s"]} />
    </div>
  );
};

const OrientationWrapper = () => {
  return (
    <GameCtxProvider key="orientation">
      <SoloGameCtxProvider>
        <Orientation />
      </SoloGameCtxProvider>
    </GameCtxProvider>
  );
};
export default OrientationWrapper;
