import { Button, Grid, Container } from "@material-ui/core";
import Link from "next/link";
import React from "react";
import FrontPageMediaCard from "@components/FrontPage/FrontPageMediaCard";

const SoloIndex: React.FC = () => {
  return (
    <Container maxWidth="md" fixed style={{ marginTop: "2rem" }}>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <FrontPageMediaCard
            image="https://images.unsplash.com/photo-1501139083538-0139583c060f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80"
            imageTitle="hourglass"
            header="Scored"
            description="10 points per set, plus up to 20 extra points for finding them FAST...  get on the High Scores list!"
            clickCardLink="/solo/scored"
            actions={
              <Link href="/solo/scored" as="/solo/scored">
                <Button variant="contained" color="primary">
                  Play Scored
                </Button>
              </Link>
            }
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <FrontPageMediaCard
            imageTitle="just chill"
            image="https://images.unsplash.com/photo-1519834411415-51492bcd6027?ixlib=rb-1.2.1&auto=format&fit=crop&w=1324&q=80"
            header="Unscored"
            description="No clock, no points.  Just chill and find sets."
            clickCardLink="/solo/free"
            actions={
              <Link href="/solo/free" as="/solo/free">
                <Button variant="contained" color="primary">
                  Play Free
                </Button>
              </Link>
            }
          />
        </Grid>
      </Grid>
    </Container>
  );
};

export default SoloIndex;
