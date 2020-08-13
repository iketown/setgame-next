import React, { useState, useEffect, useCallback } from "react";
import { FormControlLabel, Switch } from "@material-ui/core";
import { useFBCtx } from "@context/firebase/firebaseCtx";
import { useGameCtx } from "@context/game/GameCtx";

export const AllowNewPlayersSwitch: React.FC = () => {
  const { db } = useFBCtx();
  const { gameId, isGameAdmin } = useGameCtx();
  const [allowsNewPlayers, setAllowsNewPlayers] = useState(false);

  useEffect(() => {
    const gameRef = db.ref(`/games/${gameId}/allowNewPlayers`);
    gameRef.on("value", (snap) => setAllowsNewPlayers(snap.val()));
    return () => gameRef.off("value");
  }, [gameId, db]);
  const updateAllowsNew = useCallback(
    (allows: boolean) => {
      db.ref(`/games/${gameId}/allowNewPlayers`).set(allows);
      db.ref(`/publicGames/${gameId}/allowNewPlayers`).set(allows);
    },
    [db, gameId]
  );
  if (!isGameAdmin) return null;
  return (
    <FormControlLabel
      control={
        <Switch
          checked={allowsNewPlayers}
          onChange={(e, chk) => {
            updateAllowsNew(chk);
          }}
        />
      }
      label={`${allowsNewPlayers ? "Allow" : "No"} New Players`}
    />
  );
};

export default AllowNewPlayersSwitch;
