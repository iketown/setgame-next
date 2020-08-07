import React from "react";
import { Container, Box, Button } from "@material-ui/core";
import Link from "next/link";
import shortid from "shortid";

const Index: React.FC = () => {
  const nextGameId = shortid.generate();
  return (
    <Container maxWidth="md" fixed>
      <Box
        height="80vh"
        display="flex"
        justifyContent="center"
        alignItems="center"
      >
        <Link href="/solo/[soloGameId]" as={`/solo/${nextGameId}`}>
          <Button size="large" variant="contained" color="primary">
            START GAME
          </Button>
        </Link>
      </Box>
    </Container>
  );
};

export default Index;
