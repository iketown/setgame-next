/* eslint-disable no-console */
/* eslint-disable consistent-return */
import { useFBCtx } from "@context/firebase/firebaseCtx";
import { useUserCtx } from "@context/user/UserCtx";
import { useGame } from "@hooks/useGame";
import { Button } from "@material-ui/core";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import React, { useEffect, useState } from "react";

//
//
const GameOptionsButton: React.FC<{ gameId: string }> = ({ gameId }) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const { user } = useUserCtx();
  const [players, setPlayers] = useState<{ [uid: string]: { admin: boolean } }>(
    {}
  );
  const { db } = useFBCtx();
  const { removeMeFromGame, endGame } = useGame();

  useEffect(() => {
    if (!gameId) return;
    const playerRef = db.ref(`games/${gameId}/players`);
    playerRef.on("value", (snap) => {
      if (!snap.exists || !snap.val()) return;
      setPlayers(snap.val());
    });
    return () => {
      playerRef.off();
    };
  }, [gameId]);
  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  if (!players || !user || !players[user.uid]) return null;
  const isAdmin = players[user.uid].admin;
  const handleExitGame = () => {
    if (isAdmin) {
      endGame(gameId);
    } else {
      removeMeFromGame(gameId);
    }
    handleClose();
  };
  return (
    <>
      <Button color="inherit" onClick={handleMenu}>
        Game Options
      </Button>
      <Menu
        id="menu-appbar"
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        keepMounted
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        open={!!anchorEl}
        onClose={handleClose}
      >
        <MenuItem onClick={handleExitGame}>
          {isAdmin ? "End Game" : "Exit Game"}
        </MenuItem>
      </Menu>
    </>
  );
};

export default GameOptionsButton;
