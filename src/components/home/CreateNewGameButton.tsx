import React, { useState, useEffect } from "react";
import { Button, Typography } from "@material-ui/core";
import { useLobbyCtx } from "@context/lobby/LobbyCtx";
import { useGame } from "@hooks/useGame";
import { useUserCtx } from "@context/user/UserCtx";
import { getUniqueName } from "@utils/getUniqueName";
import { useFBCtx } from "@context/firebase/firebaseCtx";
import { useRouter } from "next/router";
//
//
const CreateNewGameButton = () => {
  const { myGames } = useLobbyCtx();
  const { db } = useFBCtx();
  const { push } = useRouter();
  const { createPendingGame } = useGame();
  const { user, userDispatch } = useUserCtx();
  const [newGameId, setNewGameId] = useState("");
  const imAvailable = !myGames || myGames?.length < 2;
  const changeGameId = () => {
    setNewGameId(getUniqueName());
  };
  useEffect(() => {
    if (!newGameId) {
      setNewGameId(getUniqueName());
    }
    db.ref(`games/${newGameId}`)
      .once("value")
      .then((snap) => {
        if (snap.exists()) {
          changeGameId();
        }
      });
  }, [newGameId]);
  return (
    <>
      {imAvailable && (
        <Button
          onClick={async () => {
            if (user?.uid) {
              await createPendingGame(newGameId);
              push(`/games/[gameId]`, `/games/${newGameId}`);
            } else {
              userDispatch({ type: "OPEN_SETTINGS" });
            }
          }}
          variant="contained"
          color="primary"
        >
          new game
        </Button>
      )}
      {/* {imAvailable && !!newGameId && (
        <Typography
          onClick={changeGameId}
          display="block"
          variant="caption"
          color="textSecondary"
          style={{ cursor: "pointer", marginTop: "5px" }}
          noWrap
        >
          {newGameId}
        </Typography>
      )} */}
    </>
  );
};

export default CreateNewGameButton;
