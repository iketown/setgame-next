import React from "react";
import Link from "next/link";
import styled from "styled-components";
import { Button, Typography } from "@material-ui/core";

const PageDiv = styled.div`
  height: calc(100vh - 5rem);
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;
const GameError: React.FC = () => {
  return (
    <PageDiv>
      <Typography
        color="textSecondary"
        display="block"
        gutterBottom
        variant="h4"
      >
        hmm... nothing to see here.
      </Typography>
      <div>
        <Link href="/" as="/">
          <Button size="large" variant="contained" color="primary">
            Home
          </Button>
        </Link>
      </div>
    </PageDiv>
  );
};

export default GameError;
