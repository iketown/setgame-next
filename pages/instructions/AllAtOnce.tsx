import React, { useState } from "react";
import { Typography, Container } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { motion, AnimatePresence } from "framer-motion";
import CardMakeup from "../../src/components/instructions/CardMakeup";
import Step1 from "./step1";
import Step2 from "./step2";
import Step3 from "./step3";

const useStyles = makeStyles(() => ({
  container: {
    border: "1px solid orange",
    height: "calc(100vh - 4rem)",
  },
}));

const slideVariants = {
  animate: {
    x: 0,
    opacity: 1,
    transition: {
      duration: 0.5,
    },
  },
  initial: {
    x: "100vw",
    opacity: 0,
  },
  exit: { x: "-100vw", opacity: 0, transition: { duration: 0.5 } },
};

const Index: React.FC = () => {
  const classes = useStyles();
  const [currentStep, setCurrentStep] = useState(0);
  const steps = [
    <Step1 key={1} {...{ goToNext }} />,
    <Step2 key={2} {...{ goToNext }} />,
    <Step3 key={3} {...{ goToNext }} />,
  ];
  function goToNext() {
    setCurrentStep((old) => (old + 1) % steps.length);
  }

  return (
    <Container maxWidth="md" fixed className={classes.container}>
      <div style={{ position: "relative" }}>
        <AnimatePresence>
          <motion.div
            style={{ position: "absolute" }}
            key={currentStep}
            initial="initial"
            animate="animate"
            exit="exit"
            variants={slideVariants}
          >
            {steps[currentStep]}
          </motion.div>
        </AnimatePresence>
      </div>
    </Container>
  );
};

export default Index;
