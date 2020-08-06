import { Box, Button, Grid, Typography } from "@material-ui/core";
import Link from "next/link";
import React from "react";

import FrontPageMediaCard from "@components/FrontPage/FrontPageMediaCard";

const ReadyToPlay: React.FC = () => {
  return (
    <Grid container spacing={2}>
      <Grid item xs={12} style={{ textAlign: "center" }}>
        <Box marginTop="2rem" />
        <Typography variant="h3">CONGRATULATIONS!</Typography>
        <Typography variant="h4" color="textSecondary">
          Ready to play ?
        </Typography>
      </Grid>
      <Grid item xs={12}>
        <Box marginTop="2rem" />
      </Grid>
      <Grid
        item
        xs={12}
        sm={6}
        style={{
          display: "flex",
          justifyContent: "center",
          justifyItems: "center",
          alignItems: "center",
        }}
      >
        <FrontPageMediaCard
          imageTitle="a group of people"
          image="https://images.unsplash.com/photo-1558978325-66dcf73b99b0?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2100&q=80"
          header="Orientation"
          description={<span>how to select cards, change settings, etc.</span>}
          actions={
            <Link href="/orientation" as="/orientation">
              <Button>Orientation</Button>
            </Link>
          }
          clickCardLink="/orientation"
        />
      </Grid>
      <Grid
        item
        xs={12}
        sm={6}
        style={{
          display: "flex",
          justifyContent: "center",
          justifyItems: "center",
          alignItems: "center",
        }}
      >
        <FrontPageMediaCard
          imageTitle="a group of people"
          image="https://images.unsplash.com/photo-1531917115039-473b5a388f40?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2100&q=80"
          header="The Lobby"
          description={
            <span>
              Join up with other players and play <b>SET</b> online
            </span>
          }
          actions={
            <Link href="/lobby" as="/lobby">
              <Button>Go to Lobby</Button>
            </Link>
          }
          clickCardLink="/lobby"
        />
      </Grid>
      <Grid
        item
        xs={12}
        sm={6}
        style={{ display: "flex", justifyContent: "center" }}
      >
        <FrontPageMediaCard
          imageTitle="a clock"
          image="https://images.unsplash.com/37/tEREUy1vSfuSu8LzTop3_IMG_2538.jpg?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2100&q=80"
          header="Solo Game"
          description="Hone your set hunting skills.  You vs the clock"
          clickCardLink="/solo"
          actions={
            <Link href="/solo" as="/solo">
              <Button>Solo Game</Button>
            </Link>
          }
        />
      </Grid>
    </Grid>
  );
};

export default ReadyToPlay;
