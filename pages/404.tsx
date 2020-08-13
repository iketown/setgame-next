import React from "react";
import { Typography, Button } from "@material-ui/core";
import Link from "next/link";

const FourOFourPage = () => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        marginTop: "25vh",
      }}
    >
      <div>
        <Typography variant="h1">404</Typography>
        <Typography variant="caption">aww nuts. nothing here.</Typography>
      </div>
      <div style={{ marginTop: "2rem" }}>
        <Link href="/" as="/">
          <Button variant="contained" color="primary" size="large">
            HOME
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default FourOFourPage;
