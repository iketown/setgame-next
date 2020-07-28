/* eslint-disable consistent-return */
import { IconButton, List, Typography } from "@material-ui/core";
import { ThumbDown, ThumbUp } from "@material-ui/icons";
import { motion } from "framer-motion";
import React from "react";

import { useFBCtx } from "../../../context/firebase/firebaseCtx";
import { useGameCtx } from "../../../context/game/GameCtx";
import { useGame } from "../../hooks/useGame";
import UserDisplay from "../UserSettings/UserDisplay";

//
//

const GameRequestsList = () => {
  const { isGameAdmin, gameRequests } = useGameCtx();
  const { db } = useFBCtx();

  const { respondToRequest } = useGame();

  if (!isGameAdmin || !gameRequests) return <div />;
  return (
    <>
      <div>
        {isGameAdmin && gameRequests && (
          <>
            <Typography variant="subtitle2" color="textSecondary">
              REQUESTS
            </Typography>
            <List>
              {Object.entries(gameRequests).map(([uid]) => {
                const handleRespond = (approved: boolean) => {
                  respondToRequest({
                    requesterUid: uid,
                    approved,
                  });
                };
                return (
                  <UserDisplay key={uid} userId={uid}>
                    <motion.div
                      key={uid}
                      style={{ position: "absolute", right: "-4rem" }}
                      animate={{
                        scale: [1.1, 0.9],
                        transition: { yoyo: Infinity, duration: 0.5 },
                      }}
                    >
                      <div>
                        <IconButton
                          color="primary"
                          size="small"
                          onClick={() => handleRespond(true)}
                        >
                          <ThumbUp />
                        </IconButton>
                        <IconButton
                          color="secondary"
                          size="small"
                          onClick={() => handleRespond(false)}
                        >
                          <ThumbDown />
                        </IconButton>
                      </div>
                    </motion.div>
                  </UserDisplay>
                );
              })}
            </List>
          </>
        )}
      </div>
    </>
  );
};

export default GameRequestsList;
