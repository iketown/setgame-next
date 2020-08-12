import React from "react";
import { Button } from "@material-ui/core";
import Link from "next/link";
import shortid from "shortid";

const StartSoloGameButton: React.FC = () => {
  const nextGameId = shortid.generate();
  return (
    <Link href="/solo/[soloGameId]" as={`/solo/${nextGameId}`}>
      <Button size="large" variant="contained" color="primary">
        NEW SOLO GAME
      </Button>
    </Link>
  );
};

export default StartSoloGameButton;
