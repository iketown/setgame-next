import {
  Card,
  CardHeader,
  IconButton,
  List,
  ListItem,
  ListItemSecondaryAction,
  ListItemText,
} from "@material-ui/core";
import { ThumbDown, ThumbUp } from "@material-ui/icons";
import moment from "moment";
import React, { useEffect, useState } from "react";

import { useGameCtx } from "../../../context/game/GameCtx";
import { useGame } from "../../hooks/useGame";
import { useUserProfiles } from "../../hooks/useUserProfiles";

//
//
const GameRequests = () => {
  const { gameRef, isGameAdmin } = useGameCtx();
  const [requests, setRequests] = useState<{ [uid: string]: PlayerRequest }>();
  const { userProfiles, setUserIds, userIds } = useUserProfiles();
  const { respondToRequest } = useGame();
  useEffect(() => {
    const joinRequests = gameRef.child("joinRequests");
    joinRequests.on("value", (snap) => {
      const _requests = snap.val();
      const _userIds = _requests && Object.keys(_requests);
      setUserIds(_userIds);
      setRequests(_requests);
    });
    return () => joinRequests.off();
  }, [gameRef]);
  if (!isGameAdmin || !requests || !Object.keys(requests).length)
    return <div />;
  return (
    <>
      <Card>
        <CardHeader
          title="Requests"
          titleTypographyProps={{ variant: "subtitle2" }}
        />
        <div>
          {isGameAdmin && requests && Object.keys(requests).length && (
            <List>
              {Object.entries(requests).map(([uid, obj]) => {
                const displayName = userProfiles[uid]?.displayName || "player";
                const photoURL = userProfiles[uid]?.photoURL || "";
                const reqTime = moment(obj.requestTime).fromNow();
                const handleRespond = (approved: boolean) => {
                  respondToRequest({ requesterUid: uid, approved });
                };
                return (
                  <ListItem key={uid}>
                    <ListItemText primary={displayName} secondary={reqTime} />
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
                  </ListItem>
                );
              })}
            </List>
          )}
        </div>
      </Card>
      {/* <pre>{JSON.stringify(requests)}</pre> */}
      {/* <pre>{JSON.stringify(userProfiles)}</pre> */}
    </>
  );
};

export default GameRequests;
