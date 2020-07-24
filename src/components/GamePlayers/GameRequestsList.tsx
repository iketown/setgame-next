/* eslint-disable consistent-return */
import {
  IconButton,
  List,
  ListItemSecondaryAction,
  Typography,
} from "@material-ui/core";
import { ThumbDown, ThumbUp } from "@material-ui/icons";
import moment from "moment";
import React, { useEffect, useState } from "react";

import { useFBCtx } from "../../../context/firebase/firebaseCtx";
import { useGameCtx } from "../../../context/game/GameCtx";
import { useUserCtx } from "../../../context/user/UserCtx";
import { useGame } from "../../hooks/useGame";
import UserDisplay from "../UserSettings/UserDisplay";

//
//
const GameRequestsList = () => {
  const { isGameAdmin, gameRequests } = useGameCtx();
  const { db } = useFBCtx();
  const { user, userProfile } = useUserCtx();

  const { respondToRequest } = useGame();

  if (!isGameAdmin || !gameRequests) return <div />;
  console.log("gameRequests", gameRequests);
  return (
    <>
      <div>
        {isGameAdmin && gameRequests && (
          <>
            <Typography variant="subtitle2" color="textSecondary">
              REQUESTS
            </Typography>
            <List>
              {Object.entries(gameRequests).map(
                ([uid, { requestTime, requesterProfile }]) => {
                  const {
                    displayName,
                    faceImageNumber,
                    userColor,
                  } = requesterProfile;
                  const reqTime = moment(requestTime).fromNow();
                  const handleRespond = (approved: boolean) => {
                    respondToRequest({ requesterUid: uid, approved });
                  };
                  return (
                    <UserDisplay user={requesterProfile}>
                      <ListItemSecondaryAction>
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
                      </ListItemSecondaryAction>
                    </UserDisplay>
                  );
                }
              )}
            </List>
          </>
        )}
      </div>
    </>
  );
};

export default GameRequestsList;
