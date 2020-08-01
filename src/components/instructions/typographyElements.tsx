import React from "react";
import { Typography, Grid, Button } from "@material-ui/core";
import { motion, AnimatePresence } from "framer-motion";
import { textVariants } from "./textVariants";

export const P: React.FC<{
  space?: boolean;
  from?: "left" | "right" | "top" | "bottom";
}> = ({ children, space = true, from }) => (
  <AnimatePresence>
    <motion.div initial={from} exit="exit" variants={textVariants}>
      <Typography variant="h6" gutterBottom={space}>
        {children}
      </Typography>
    </motion.div>
  </AnimatePresence>
);
export default P;

export const Subtitle: React.FC = ({ children }) => (
  <Typography variant="subtitle1">{children}</Typography>
);

export const Title: React.FC = ({ children }) => (
  <Grid item xs={12} style={{ textAlign: "center", padding: "1rem" }}>
    <Typography color="textSecondary" variant="h4">
      {children}
    </Typography>
  </Grid>
);

export const TwoThirds: React.FC = ({ children }) => (
  <Grid item xs={12} sm={9} md={8}>
    {children}
  </Grid>
);

export const OneThird: React.FC = ({ children }) => (
  <Grid item xs={12} sm={3} md={4}>
    {children}
  </Grid>
);
export const FullLine: React.FC<{ center?: boolean }> = ({
  children,
  center,
}) => (
  <Grid item xs={12} style={{ textAlign: center ? "center" : "inherit" }}>
    {children}
  </Grid>
);

export const AttrTitle: React.FC = ({ children }) => (
  <Typography variant="h5">{children}</Typography>
);

export const NextButton: React.FC<{ onClick: () => void }> = ({
  children,
  onClick,
}) => {
  return (
    <div style={{ margin: "1rem" }}>
      <Button
        size="large"
        variant="contained"
        color="primary"
        onClick={() => onClick()}
      >
        {children || "NEXT"}
      </Button>
    </div>
  );
};

export const GoBackButton: React.FC<{ onClick: () => void }> = ({
  onClick,
  children,
}) => {
  return (
    <div style={{ margin: "1rem" }}>
      <Button onClick={onClick} size="small" variant="outlined">
        {children || "go back"}
      </Button>
    </div>
  );
};
