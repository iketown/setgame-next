import { Button, Container, Grid, Typography } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { FaThumbsUp, FaCopy } from "react-icons/fa";
import { useRouter } from "next/router";
import { useGameCtx } from "../../../context/game/GameCtx";
import { useGame } from "../../hooks/useGame";
import GamePlayers from "../GamePlayers/GamePlayers";
import GameRequestsList from "../GamePlayers/GameRequestsList";

const PreGame = () => {
  const [thisUrl, setThisUrl] = useState("");
  const [copied, setCopied] = useState(false);
  const { startGame } = useGame();
  const { query } = useRouter();
  const { isPlayer, isGameAdmin, gameId, setGameId } = useGameCtx();

  useEffect(() => {
    if (query?.gameId && gameId !== query.gameId) {
      console.log("setting game id", query.gameId);
      setGameId(query.gameId as string);
    }
  }, [query.gameId, gameId]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setThisUrl(window.location.href);
    }
  }, []);
  const handleStart = () => {
    startGame();
  };

  const adminView = (
    <Grid
      style={{
        height: "100%",
        display: "flex",
        justifyContent: "center",
        alignContent: "center",
      }}
      container
    >
      <Grid item xs={12} style={{ display: "flex", justifyContent: "center" }}>
        <div>
          <CopyToClipboard text={thisUrl} onCopy={() => setCopied(true)}>
            <Button
              style={{ marginRight: "1rem" }}
              variant={copied ? "contained" : "outlined"}
            >
              <span style={{ marginRight: "1rem" }}>Click Here</span>{" "}
              {copied ? <FaThumbsUp /> : <FaCopy />}
            </Button>
          </CopyToClipboard>
        </div>
        <Typography>
          to copy the game url, then paste it into any message (text, email,
          whatsapp etc)
        </Typography>
      </Grid>

      <Grid
        item
        xs={12}
        style={{
          display: "flex",
          justifyContent: "center",
          alignContent: "center",
          alignItems: "center",
          flexDirection: "column",
        }}
      >
        {isGameAdmin && <GameRequestsList />}
        <GamePlayers />
      </Grid>
      <Grid item xs={12} style={{ display: "flex", justifyContent: "center" }}>
        {isGameAdmin && (
          <Button
            size="large"
            variant="contained"
            color="primary"
            onClick={handleStart}
            style={{ marginTop: "3rem" }}
          >
            Start Game
          </Button>
        )}
      </Grid>
    </Grid>
  );

  return (
    <Container maxWidth="md" style={{ height: "calc(100vh - 100px)" }}>
      {adminView}
    </Container>
  );
};

export default PreGame;
