import { Grid, Typography, Box } from "@material-ui/core";
import { motion } from "framer-motion";
import React from "react";

import AnimatedSet from "../../FrontPage/AnimatedSet";
import { NextButton, P } from "../typographyElements";

const SetsLookDifferent: React.FC<{ advance: (num?: number) => void }> = ({
  advance,
}) => {
  return (
    <Grid container style={{ marginTop: "5rem" }}>
      <Grid item xs={12}>
        <AnimatedSet cardWidth={100} />
      </Grid>
      <Grid item xs={12} style={{ textAlign: "center", padding: "2rem 0" }}>
        <motion.div
          animate="in"
          variants={{ in: { transition: { staggerChildren: 0.5 } } }}
        >
          <P from="left">Sets can look very different from each other,</P>
          <P space from="right">
            and they can be challenging to find.
          </P>
          <Box marginTop="2rem">
            <P from="right">Each card has four attributes:</P>
            <Box display="flex" justifyContent="center" alignItems="center">
              <Typography variant="h5">
                <u>
                  <b>Shape</b>
                </u>
              </Typography>
              <Box marginX="1rem">•</Box>
              <Typography variant="h5">
                <u>
                  <b>Fill</b>
                </u>
              </Typography>
              <Box marginX="1rem">•</Box>
              <Typography variant="h5">
                <u>
                  <b>Color</b>
                </u>
              </Typography>
              <Box marginX="1rem">•</Box>
              <Typography variant="h5">
                <u>
                  <b>Quantity</b>
                </u>
              </Typography>
            </Box>
          </Box>
        </motion.div>
        <NextButton onClick={advance} />
      </Grid>
    </Grid>
  );
};

export default SetsLookDifferent;
