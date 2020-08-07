import React from "react";
import SoloGame from "@components/SoloGame/SoloGame";
import { Container } from "@material-ui/core";

const Index: React.FC = () => {
  return (
    <Container maxWidth="md" fixed>
      <SoloGame />
    </Container>
  );
};

export default Index;
