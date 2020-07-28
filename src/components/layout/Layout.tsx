import {
  AppBar,
  IconButton,
  Toolbar,
  Typography,
  Button,
} from "@material-ui/core";
import Link from "next/link";
import React from "react";
import { FaHome, FaUserCircle, FaUsers } from "react-icons/fa";
import { useGameCtx } from "context/game/GameCtx";
import { useUserCtx } from "context/user/UserCtx";
import UserSettings from "@components/UserSettings/UserSettings";
import { useRouter } from "next/router";
import { useLayoutStyles } from "./layoutStyles";
import useWidth from "../../hooks/useWidth";
import FaceDrawing from "../faces/FaceDrawing";
import GameOptionsButton from "./GameOptionsButton";

interface LayoutI {
  pageTitle?: string;
}

const Layout: React.FC<LayoutI> = ({ children, pageTitle }) => {
  const router = useRouter();
  const classes = useLayoutStyles();
  const width = useWidth();
  const { userDispatch, userProfile } = useUserCtx();
  const gameId = router.query?.gameId as string;
  return (
    <div>
      <div className={classes.grow}>
        <AppBar position="static">
          <Toolbar>
            <Link href="/">
              <Typography className={classes.title} variant="h6" noWrap>
                set.city
              </Typography>
            </Link>
            {pageTitle && (
              <Typography
                color="textSecondary"
                className={classes.title}
                variant="h6"
                style={{ marginLeft: "1rem" }}
              >
                • {pageTitle}
              </Typography>
            )}
            <div className={classes.grow} />
            <div>
              {gameId && <GameOptionsButton gameId={gameId} />}
              <Link href="/lobby" as="/lobby">
                <IconButton color="inherit">
                  <FaHome />
                </IconButton>
              </Link>
              <IconButton
                color="inherit"
                onClick={() => userDispatch({ type: "OPEN_SETTINGS" })}
              >
                {typeof userProfile?.faceImageNumber === "number" ? (
                  <FaceDrawing
                    height="30px"
                    faceImageNumber={userProfile.faceImageNumber}
                  />
                ) : (
                  <FaUserCircle />
                )}
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
