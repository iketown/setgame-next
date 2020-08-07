import React from "react";
import { Container } from "@material-ui/core";
import SoloGame from "../../src/components/SoloGame/SoloGame";

const SoloScored: React.FC = () => {
  return (
    <Container maxWidth="md" style={{ marginTop: "2rem" }}>
      <SoloGame />
    </Container>
  );
};

export default SoloScored;
