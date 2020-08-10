import GameList from "@components/Lobby/GameList";
import { LobbyCtxProvider } from "@context/lobby/LobbyCtx";
import { Card } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import React from "react";

//
//
const useStyles = makeStyles((theme) => ({
  card: {
    marginTop: theme.spacing(2),
    minWidth: "22rem",
  },
}));

const CurrentGames = () => {
  const classes = useStyles();

  return (
    <Card className={classes.card}>
      <GameList />
    </Card>
  );
};

const WrappedCurrentGames: React.FC = () => {
  return (
    <LobbyCtxProvider>
      <CurrentGames />
    </LobbyCtxProvider>
  );
};
export default WrappedCurrentGames;
