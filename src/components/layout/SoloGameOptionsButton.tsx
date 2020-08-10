/* eslint-disable no-console */
/* eslint-disable consistent-return */
import { useUserCtx } from "@context/user/UserCtx";
import { Button, Typography } from "@material-ui/core";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import React, { useState } from "react";
import Link from "next/link";

//
//
const GameOptionsButton: React.FC = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const { user } = useUserCtx();

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  if (!user) return null;

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
        <MenuItem>
          <Link href="/home" as="/home">
            <Typography>Quit Game</Typography>
          </Link>
        </MenuItem>
      </Menu>
    </>
  );
};

export default GameOptionsButton;
