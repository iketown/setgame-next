import { IconButton } from "@material-ui/core";
import { motion } from "framer-motion";
import React, { useState } from "react";
import { FaCircle, FaDotCircle } from "react-icons/fa";

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
        maxWidth: "46rem",
        margin: "0 auto",
      }}
    >
      {Array.from({ length: quantity }).map((_, i) => {
        const isActive = index === i;
        return (
          <IconButton
            onClick={() => setIndex(i)}
            key={i}
            style={{ margin: "0 5px" }}
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
