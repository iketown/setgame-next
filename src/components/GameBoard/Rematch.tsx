/* eslint-disable no-nested-ternary */
import React, { useEffect, useState, useCallback } from "react";
import { Grid, Typography, Button, CircularProgress } from "@material-ui/core";
import { FaThumbsUp, FaThumbsDown } from "react-icons/fa";
import { useFBCtx } from "@context/firebase/firebaseCtx";
import { motion } from "framer-motion";
import { useGameCtx } from "../../context/game/GameCtx";
import { useUserCtx } from "../../context/user/UserCtx";
import FaceDrawing from "../faces/FaceDrawing";
import { colorsObj } from "./playerColors";
//
//
const Rematch = () => {
  const { playerProfiles, gameId } = useGameCtx();
  const { db } = useFBCtx();
  const { user } = useUserCtx();
  const [rematchObj, setRematchObj] = useState<{ [uid: string]: boolean }>({});

  useEffect(() => {
    const ref = db.ref(`games/${gameId}/rematch`);
    ref.on("value", (snap) => {
      setRematchObj(snap.val());
    });
    return () => ref.off();
  }, []);

  const toggleRematch = () => {
    const myStatus = rematchObj && rematchObj[user.uid];
    db.ref(`games/${gameId}/rematch`).update({ [user.uid]: !myStatus });
  };

  if (!user?.uid) return null;
  return (
    <div style={{ width: "100%", marginTop: "2rem" }}>
      <Typography variant="h5">rematch ?</Typography>
      {playerProfiles &&
        Object.entries(playerProfiles)
          .sort(([a], [b]) => {
            if (!rematchObj) return 0;
            return rematchObj[a] ? -1 : rematchObj[b] ? 1 : 0;
          })
          .map(([playerId, { displayName, faceImageNumber, userColor }]) => {
            const yesRematch = rematchObj && rematchObj[playerId];
            const isMe = user.uid === playerId;
            return (
              <motion.div
                layout
                key={playerId}
                style={{ marginBottom: "1rem" }}
                animate={
                  isMe
                    ? { x: [5, -5], transition: { yoyo: Infinity } }
                    : { x: 0 }
                }
              >
                <Button
                  size={isMe ? "large" : "small"}
                  disabled={!isMe}
                  onClick={toggleRematch}
                  variant={yesRematch ? "contained" : "outlined"}
                  style={{
                    backgroundColor: yesRematch
                      ? colorsObj[userColor]?.light
                      : "#d3d3d32e",
                    border: `1px solid ${colorsObj[userColor].dark || "black"}`,
                  }}
                >
                  <FaceDrawing {...{ faceImageNumber }} />
                  <span style={{ margin: "0 1rem" }}>{displayName}</span>
                  {yesRematch ? (
                    <FaThumbsUp size="20px" />
                  ) : (
                    <FaThumbsDown size="20px" />
                  )}
                </Button>
              </motion.div>
            );
          })}
      {/* <pre>{JSON.stringify(rematchObj, null, 2)}</pre> */}
    </div>
  );
};

export default Rematch;
