import React from "react";

import { useRouter } from "next/router";
import SignInScreen from "../../src/components/SignInScreen";
import { useFBCtx } from "../../context/firebase/firebaseCtx";
import { Grid, Button } from "@material-ui/core";
import UserScreen from "../../src/components/UserScreen";
import useWidth from "../../src/hooks/useWidth";
//
//
const Game = () => {
  const router = useRouter();

  const width = useWidth();
  const { user, db, firebase, firestore } = useFBCtx();
  const { gameId } = router.query;
  console.log({ gameId });

  return (
    <Grid container style={{ marginTop: "1rem" }}>
      <Grid item xs={12} sm={9} style={{ textAlign: "center" }}>
        game board {width}
      </Grid>
      <Grid item xs={12}></Grid>
      <Grid
        item
        xs={12}
        sm={3}
        style={{ display: "flex", justifyContent: "center" }}
      >
        <UserScreen />
      </Grid>
    </Grid>
  );
};

export default Game;
