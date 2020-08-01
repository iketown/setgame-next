import { Box, Button, Typography } from "@material-ui/core";
import Link from "next/link";
import React from "react";

const SoloIndex: React.FC = () => {
  return (
    <div
      style={{
        height: "80vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
      }}
    >
      <Typography variant="h5">solo play coming soon</Typography>
      <Box marginTop="2rem">
        <Link href="/lobby" as="/lobby">
          <Button variant="contained" color="primary">
            lobby
          </Button>
        </Link>
      </Box>
    </div>
  );
};

export default SoloIndex;
