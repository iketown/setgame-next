import React from "react";
import { Container, Box, Button, Grid } from "@material-ui/core";
import Link from "next/link";
import shortid from "shortid";
import SavedSoloGames from "@components/SoloGame/SavedSoloGames";
import HighScores from "@components/SoloGame/HighScores";

const Index: React.FC = () => {
  const nextGameId = shortid.generate();
  return (
    <Container maxWidth="md" fixed>
      <Grid container spacing={2}>
        <Grid item xs={12} md={6}>
          <Box marginTop="1rem" />
          <SavedSoloGames />
          <Box marginTop="1rem" />
          <HighScores />
        </Grid>
        <Grid item xs={12} md={6}>
          <Box
            padding="20%"
            display="flex"
            justifyContent="center"
            alignItems="center"
          >
            <Link href="/solo/[soloGameId]" as={`/solo/${nextGameId}`}>
              <Button size="large" variant="contained" color="primary">
                START NEW GAME
              </Button>
            </Link>
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Index;
