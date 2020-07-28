/* eslint-disable consistent-return */
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  List,
} from "@material-ui/core";
import { useGameCtx } from "context/game/GameCtx";
import React, { useEffect, useMemo, useState } from "react";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { FaCopy, FaThumbsUp } from "react-icons/fa";

import { useRenderCount } from "@hooks/useRenderCount";
import { useFBCtx } from "../../../context/firebase/firebaseCtx";
import { useUserCtx } from "../../../context/user/UserCtx";
import { useGame } from "../../hooks/useGame";
import { usePreGame } from "../../hooks/usePreGame";
import PreGameInvitePlayerListItem from "./PreGameInvitePlayerListItem";

//
//
const PreGameInvitePlayers = () => {
  useRenderCount("PreGameInvitePlayers");
  const { playerProfiles, gameId } = useGameCtx();
  const { thisPublicGame, friendsLatestFirst } = usePreGame();
  const { db } = useFBCtx();

  const [thisUrl, setThisUrl] = useState("");
  const [copied, setCopied] = useState(false);
  const { inviteToGame } = useGame();
  const { userProfile } = useUserCtx();

  useEffect(() => {
    if (typeof window !== "undefined") {
      setThisUrl(window.location.href);
    }
  }, []);

  return (
    <>
      <Card style={{ width: "25rem" }}>
        <CardHeader title="Invite Players" />
        <CardContent
          style={{
            textAlign: "center",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
          }}
        >
          <List dense>
            {friendsLatestFirst?.map(([uid]) => {
              const isPlaying = playerProfiles && !!playerProfiles[uid];
              const isInvited =
                thisPublicGame?.invites && !!thisPublicGame.invites[uid];
              const handleClickBtn = () => {
                if (isInvited) {
                  console.log("already invited", uid);
                } else {
                  inviteToGame(uid);
                }
                console.log("clicked", uid);
              };
              return (
                <PreGameInvitePlayerListItem
                  key={uid}
                  {...{ uid, isPlaying, isInvited, handleClickBtn }}
                />
              );
            })}
          </List>
        </CardContent>
        <CardActions>
          <CopyToClipboard text={thisUrl} onCopy={() => setCopied(true)}>
            <Button
              style={{ marginRight: "1rem" }}
              variant={copied ? "contained" : "outlined"}
            >
              <span style={{ marginRight: "1rem" }}>Copy URL</span>{" "}
              {copied ? <FaThumbsUp /> : <FaCopy />}
            </Button>
          </CopyToClipboard>
        </CardActions>
      </Card>
      {/* <Accordion TransitionProps={{ unmountOnExit: true }}>
        <AccordionSummary>thisPublicGame</AccordionSummary>
        <AccordionDetails>
          <pre>{JSON.stringify(thisPublicGame, null, 2)}</pre>
        </AccordionDetails>
      </Accordion> */}
    </>
  );
};

export default PreGameInvitePlayers;
