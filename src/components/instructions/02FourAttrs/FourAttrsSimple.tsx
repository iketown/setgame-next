import React from "react";
import { Grid, Typography } from "@material-ui/core";
import { P, FullLine, NextButton } from "../typographyElements";

//
//
const FourAttrsSimple: React.FC<{ advance: () => void }> = ({ advance }) => {
  const Dot = (
    <Typography variant="h4" component="span" style={{ opacity: 0.25 }}>
      •
    </Typography>
  );
  return (
    <Grid container spacing={2}>
      <FullLine center>
        <P space>Each card has four attributes:</P>
        <Typography gutterBottom variant="h4">
          {Dot} Shape
        </Typography>
        <Typography gutterBottom variant="h4">
          {Dot} Quantity
        </Typography>
        <Typography gutterBottom variant="h4">
          {Dot} Color
        </Typography>
        <Typography gutterBottom variant="h4">
          {Dot} Fill
        </Typography>

        <NextButton onClick={advance} />
      </FullLine>
    </Grid>
  );
};

export default FourAttrsSimple;
