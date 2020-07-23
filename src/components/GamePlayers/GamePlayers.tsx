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
  const { gameRef, isPlayer, playerProfiles } = useGameCtx();
  const { user } = useUserCtx();

  return (
    <div>
      <Typography variant="subtitle2">Players</Typography>
      <List>
        {playerProfiles &&
          Object.entries(playerProfiles).map(([uid, playerProfile]) => {
            return <UserDisplay key={uid} user={playerProfile} />;
          })}
      </List>
      {/* <pre style={{ fontSize: 8 }}>{JSON.stringify(players, null, 1)}</pre> */}
      <GameRequestButton />
    </div>
  );
};

export default GamePlayers;
