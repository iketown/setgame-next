import React, { useState } from "react";
import { Typography, Grid, Container, Button } from "@material-ui/core";
import { motion } from "framer-motion";
import SetCard from "@components/cards/SetCard";

const cardVariants = {
  in: { x: 0, y: 0, opacity: 1 },
  out: { opacity: 0, y: "-200px" },
};

const Step2: React.FC<Step> = ({ goToNext }) => {
  const [cardIn, setCardIn] = useState(false);
  return (
    <Container maxWidth="md">
      <Grid container>
        <Grid item xs={12} sm={6}>
          <Typography variant="h4">Step2</Typography>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Typography>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsam vitae
            unde cumque magnam dolores, sint ab voluptatibus eveniet ipsa
            assumenda.
          </Typography>
        </Grid>
        <Grid item xs={12} sm={6}>
          <motion.div animate={cardIn ? "in" : "out"} variants={cardVariants}>
            <SetCard cardId="rf1d" width={140} />
          </motion.div>
          <Button onClick={() => setCardIn((o) => !o)}> fly in</Button>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Button onClick={goToNext}>Go to next</Button>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Step2;
