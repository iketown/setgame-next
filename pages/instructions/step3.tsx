import React from "react";
import { Typography, Grid, Container, Button } from "@material-ui/core";

const Step3: React.FC<Step> = ({ goToNext }) => {
  return (
    <Container maxWidth="md">
      <Grid container>
        <Grid item xs={12} sm={6}>
          <Typography variant="h4">Step3</Typography>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Typography>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsam vitae
            unde cumque magnam dolores, sint ab voluptatibus eveniet ipsa
            assumenda.
          </Typography>
        </Grid>
        <Grid item xs={12} sm={6} />
        <Grid item xs={12} sm={6}>
          <Button onClick={goToNext}>Go to next</Button>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Step3;
