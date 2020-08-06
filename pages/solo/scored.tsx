import React from "react";
import { Container, Grid } from "@material-ui/core";
import GameBoard from "../../src/components/GameBoard/GameBoard";
import SoloGame from "../../src/components/SoloGame/SoloGame";

const SoloScored = () => {
  return (
    <Container maxWidth="md" style={{ marginTop: "2rem" }}>
      <SoloGame />
    </Container>
  );
};

export default SoloScored;
