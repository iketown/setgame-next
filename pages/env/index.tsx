import React from "react";
import { Grid } from "@material-ui/icons";
const Environment = () => {
  return (
    <Grid container style={{ marginTop: "1rem" }}>
      <Grid item xs={12} sm={9} style={{ textAlign: "center" }}>
        <div>{process.env.FIREBASE_API_KEY}</div>
        <div>{process.env.FIREBASE_AUTH_DOMAIN}</div>
        <div>{process.env.FIREBASE_PROJECT_ID}</div>
        <div>{process.env.FIREBASE_DATABASE_URL}</div>
      </Grid>
      <Grid
        item
        xs={12}
        sm={3}
        style={{ display: "flex", justifyContent: "center" }}
      ></Grid>
    </Grid>
  );
};

export default Environment;
