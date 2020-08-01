import { Button, Container, Grid, IconButton } from "@material-ui/core";
import { motion } from "framer-motion";
import React, { useState } from "react";
import { FaDotCircle, FaCircle } from "react-icons/fa";
import Intro from "./00Intro/00Intro";
import SetsLookDifferent from "./01SetsLookDifferent/01SetsLookDifferent";

const NavDots = ({
  quantity,
  index,
  setIndex,
}: {
  quantity: number;
  index: number;
  setIndex: (num: number) => void;
}) => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-around",
        alignItems: "center",
        width: "100%",
      }}
    >
      {Array.from({ length: quantity }).map((_, i) => {
        const isActive = index === i;
        return (
          <IconButton
            onClick={() => setIndex(i)}
            size="small"
            key={i}
            style={{ margin: "0 1rem" }}
          >
            <motion.span
              animate={isActive ? "active" : "inactive"}
              variants={{
                active: { opacity: 1 },
                inactive: { opacity: 0.4, transition: { duration: 1 } },
              }}
              key={i}
            >
              {!isActive ? (
                <FaDotCircle size="10px" />
              ) : (
                <FaCircle size="10px" />
              )}
            </motion.span>
          </IconButton>
        );
      })}
    </div>
  );
};

export default NavDots;
