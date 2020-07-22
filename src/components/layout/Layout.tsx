import { AppBar, IconButton, Toolbar, Typography } from "@material-ui/core";
import Link from "next/link";
import React from "react";
import { FaHome, FaUserCircle, FaUsers } from "react-icons/fa";

import { useGameCtx } from "context/game/GameCtx";
import { useUserCtx } from "context/user/UserCtx";
import UserSettings from "@components/UserSettings/UserSettings";
import { useLayoutStyles } from "./layoutStyles";

const Layout: React.FC = ({ children }) => {
  const classes = useLayoutStyles();
  const { optionsDispatch, optionsState } = useGameCtx();
  const { userDispatch } = useUserCtx();
  return (
    <div>
      <div className={classes.grow}>
        <AppBar position="static">
          <Toolbar>
            <Link href="/">
              <Typography className={classes.title} variant="h6" noWrap>
                tre
              </Typography>
            </Link>
            <div className={classes.grow} />
            <div>
              <Link href="/lobby">
                <IconButton color="inherit">
                  <FaHome />
                </IconButton>
              </Link>
              <IconButton
                color="inherit"
                onClick={() => userDispatch({ type: "OPEN_SETTINGS" })}
              >
                <FaUserCircle />
              </IconButton>
              <IconButton color="inherit" edge="end">
                <FaUsers />
              </IconButton>
            </div>
          </Toolbar>
        </AppBar>
      </div>
      {children}
      <UserSettings />
    </div>
  );
};

export default Layout;
