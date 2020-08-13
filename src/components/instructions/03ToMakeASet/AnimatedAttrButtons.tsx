/* eslint-disable consistent-return */
/* eslint-disable react/require-default-props */
import { Button, Grid } from "@material-ui/core";
import { motion, Variants } from "framer-motion";
import React, { useCallback, useEffect, useRef } from "react";

interface AnimatedAttrButtonsI {
  textFields: string[];
  setter: React.Dispatch<React.SetStateAction<number>>;
  value: number;
  noAnimation?: boolean;
}
const AnimatedAttrButtons: React.FC<AnimatedAttrButtonsI> = ({
  textFields,
  setter,
  value,
  noAnimation,
}) => {
  const intervalRef = useRef(0);

  useEffect(() => {
    return () => clearInterval(intervalRef.current);
  }, []);

  const autoPushEachButton = useCallback(() => {
    if (noAnimation) return null;
    intervalRef.current = setInterval(() => {
      setter((old) => {
        if (old < 3) return old + 1;
        clearInterval(intervalRef.current);
        return old;
      });
    }, 1000);
  }, [noAnimation, setter]);

  return (
    <Grid item xs={12} style={{ display: "flex", justifyContent: "center" }}>
      <motion.div
        style={{
          display: "flex",
          justifyContent: "space-around",
          alignItems: "center",
          marginTop: "2rem",
        }}
        animate="in"
        variants={{
          in: { transition: { staggerChildren: noAnimation ? 0 : 0.3 } },
        }}
        onAnimationComplete={() => {
          if (noAnimation) {
            // do nothing
          } else {
            autoPushEachButton();
          }
        }}
      >
        {textFields.map((text, i) => {
          return (
            <AttrButton
              isSelected={value === i}
              onClick={() => setter(i)}
              key={text}
              text={text}
              activeColor={noAnimation ? "default" : "secondary"}
            />
          );
        })}

        {/* <AttrButton text="rounds" /> */}
        {/* <AttrButton text="squiggles" /> */}
        <AttrButton
          isSelected={value === 3}
          onClick={() => setter(3)}
          text="one of each"
          activeColor={noAnimation ? "default" : "secondary"}
          or
        />
      </motion.div>
    </Grid>
  );
};

export default AnimatedAttrButtons;

const buttonVariants: Variants = {
  in: { x: 0, opacity: 1 },
  initial: { x: 200, opacity: 0 },
};

const AttrButton = ({
  text,
  or,
  onClick,
  isSelected,
  activeColor,
}: {
  text: string;
  or?: boolean;
  onClick: () => void;
  isSelected: boolean;
  activeColor: "secondary" | "default";
}) => {
  return (
    <motion.div initial="initial" variants={buttonVariants}>
      {or && <span style={{ margin: "0 5px" }}>or</span>}
      <Button
        onClick={() => onClick()}
        style={{ margin: "5px" }}
        variant={isSelected ? "contained" : "outlined"}
        color={isSelected ? activeColor : "default"}
      >
        {text}
      </Button>
    </motion.div>
  );
};
