import { Button, Container, Grid, Typography } from "@material-ui/core";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { FaThumbsUp } from "react-icons/fa";

import { useGameCtx } from "../../../context/game/GameCtx";
import { useGame } from "../../hooks/useGame";
import GamePlayers from "../GamePlayers/GamePlayers";
import GameRequestsList from "../GamePlayers/GameRequestsList";
import Layout from "../layout/Layout";

const PreGame = () => {
  const [thisUrl, setThisUrl] = useState("");
  const [copied, setCopied] = useState(false);
  const { startGame } = useGame();
  const { isPlayer, isGameAdmin } = useGameCtx();

  useEffect(() => {
    if (typeof window !== "undefined") {
      console.log(window.location.href);
      setThisUrl(window.location.href);
    }
  }, []);
  const { asPath } = useRouter();
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
              {copied && <FaThumbsUp style={{ margin: "0 1rem 0 0" }} />} Click
              Here {copied && <FaThumbsUp style={{ margin: "0 0 0 1rem" }} />}
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
    <Layout>
      <Container
        maxWidth="md"
        style={{ height: "calc(100vh - 100px)", border: "1px solid orange" }}
      >
        {adminView}
      </Container>
    </Layout>
  );
};

export default PreGame;
