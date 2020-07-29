/* eslint-disable no-console */
/* eslint-disable consistent-return */
import { useGameCtx } from "@context/game/GameCtx";
import { useGameInvites } from "@hooks/useGameInvites";
import { usePreGame } from "@hooks/usePreGame";
import { useRenderCount } from "@hooks/useRenderCount";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  List,
} from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { FaCopy, FaThumbsUp } from "react-icons/fa";

import PreGameInvitePlayerListItem from "./PreGameInvitePlayerListItem";

//
//
const PreGameInvitePlayers: React.FC = () => {
  useRenderCount("PreGameInvitePlayers");
  const { playerProfiles } = useGameCtx();
  const { thisPublicGame, friendsLatestFirst } = usePreGame();

  const [thisUrl, setThisUrl] = useState("");
  const [copied, setCopied] = useState(false);
  const { inviteToGame } = useGameInvites();

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
