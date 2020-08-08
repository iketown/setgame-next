import React from "react";
import { Container, Box, Button, Grid } from "@material-ui/core";
import Link from "next/link";
import shortid from "shortid";
import SavedSoloGames from "../../src/components/SoloGame/SavedSoloGames";

const Index: React.FC = () => {
  const nextGameId = shortid.generate();
  return (
    <Container maxWidth="md" fixed>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <SavedSoloGames />
        </Grid>
        <Grid item xs={12} sm={6}>
          <Box
            height="80vh"
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
