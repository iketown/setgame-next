/* eslint-disable consistent-return */
import React, { useMemo, useEffect, useState } from "react";
import moment from "moment";
import { Typography, Container, Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { usePresence } from "@hooks/usePresence";
import Link from "next/link";
import { useGameCtx } from "@context/game/GameCtx";
import UserDisplay from "../UserSettings/UserDisplay";

const useStyles = makeStyles(() => ({
  root: {
    height: "calc(100vh - 10rem)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
  },
  spacer: {
    marginTop: "4rem",
  },
}));
//
//
const GameEnded: React.FC = () => {
  const { gameEnded, state, playerProfiles } = useGameCtx();
  const { setPlayerIds, whosHere } = usePresence();
  const [fromNow, setFromNow] = useState("");
  const { playedSets } = state;
  const usersByPoints = useMemo(() => {
    return (
      playerProfiles &&
      Object.entries(playerProfiles)
        // get their points
        .map(([uid]) => {
          const mySets = !!playedSets && playedSets[uid];
          const points = (mySets && mySets.length * 3) || 0;
          return { uid, points };
        })
        // put them in order, most points at top
        .sort((a, b) => b.points - a.points)
    );
  }, [playedSets, playerProfiles]);

  useEffect(() => {
    if (!gameEnded) return;
    setFromNow(moment(gameEnded).fromNow());
    const interval = setInterval(() => {
      setFromNow(moment(gameEnded).fromNow());
    }, 10000);
    return () => {
      clearInterval(interval);
    };
  }, [gameEnded]);

  useEffect(() => {
    if (!playerProfiles) return;
    setPlayerIds(Object.keys(playerProfiles));
  }, [playerProfiles]);

  const classes = useStyles();
  if (!gameEnded) return <div />;
  return (
    <Container maxWidth="sm" className={classes.root}>
      <Typography variant="h3">GAME ENDED</Typography>
      <Typography variant="h5">{fromNow}</Typography>
      <div className={classes.spacer} />
      <Link href="/home" as="/home">
        <Button size="large" variant="contained" color="primary">
          Home
        </Button>
      </Link>
      <div className={classes.spacer} />
      {usersByPoints?.map(({ uid, points }) => {
        const isHere = whosHere && whosHere[uid];
        return (
          <UserDisplay key={uid} points={points} userId={uid} isHere={isHere} />
        );
      })}
    </Container>
  );
};

export default GameEnded;
