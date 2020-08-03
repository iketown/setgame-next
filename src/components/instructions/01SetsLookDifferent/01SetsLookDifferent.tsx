import { Grid } from "@material-ui/core";
import { motion } from "framer-motion";
import React from "react";

import AnimatedSet from "../../FrontPage/AnimatedSet";
import { NextButton, P } from "../typographyElements";

const SetsLookDifferent: React.FC<{ advance: (num?: number) => void }> = ({
  advance,
}) => {
  return (
    <Grid container style={{ height: "calc(100vh - 5rem)" }}>
      <Grid item xs={12}>
        <AnimatedSet cardWidth={100} />
      </Grid>
      <Grid item xs={12} style={{ textAlign: "center", padding: "2rem 0" }}>
        <motion.div
          animate="in"
          variants={{ in: { transition: { staggerChildren: 0.5 } } }}
        >
          <P from="left">Sets can look very different from eachother,</P>
          <P from="right">and they can be challenging to find.</P>
          <P from="right">but all cards have a few common attributes...</P>
        </motion.div>
        <NextButton onClick={advance} />
      </Grid>
      <Grid item xs={12}>
        <AnimatedSet startIndex={20} delay={2000} cardWidth={100} />
      </Grid>
    </Grid>
  );
};

export default SetsLookDifferent;