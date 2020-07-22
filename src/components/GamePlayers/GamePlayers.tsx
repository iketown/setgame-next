import {
  Card,
  Avatar,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Typography,
} from "@material-ui/core";
import { useUserCtx } from "context/user/UserCtx";
import React, { useEffect, useState } from "react";

import { useGameCtx } from "../../../context/game/GameCtx";
import { useGame } from "../../hooks/useGame";
import { useUserProfiles } from "../../hooks/useUserProfiles";
import GameRequestButton from "./GameRequestButton";
import UserDisplay from "../UserSettings/UserDisplay";

interface PlayersObj {
  [uid: string]: GamePlayer;
}
interface PlayerProfiles {
  [uid: string]: PlayerProfile;
}

const GamePlayers = () => {
  const { gameRef, isPlayer } = useGameCtx();
  const { requestToJoin } = useGame();
  const { user } = useUserCtx();
  const [players, setPlayers] = useState<PlayersObj>();
  const { setUserIds, userProfiles } = useUserProfiles();
  useEffect(() => {
    const playersRef = gameRef.child("players");
    playersRef.on("value", (snap) => {
      setPlayers(snap.val());
    });
    return () => playersRef.off();
  }, [gameRef]);

  useEffect(() => {
    if (!players || !user) return;
    const playerIds = Object.entries(players).map(([uid]) => uid);
    setUserIds(playerIds);
  }, [players, user]);

  return (
    <div>
      <Typography variant="subtitle2">Players</Typography>
      <List>
        {players &&
          Object.entries(players).map(([uid, { admin, joinedAt }]) => {
            const userProfile = userProfiles && userProfiles[uid];
            return <UserDisplay key={uid} user={userProfile} />;
          })}
      </List>
      {/* <pre style={{ fontSize: 8 }}>{JSON.stringify(players, null, 1)}</pre> */}
      <GameRequestButton />
    </div>
  );
};

export default GamePlayers;
