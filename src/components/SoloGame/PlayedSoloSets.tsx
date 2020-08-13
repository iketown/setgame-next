import React, { useRef, useEffect } from "react";
import { useSoloGameCtx } from "@context/game/SoloGameCtx";
import { Typography } from "@material-ui/core";
import styled from "styled-components";
import { motion } from "framer-motion";
import SetCard from "../cards/SetCard";

const SetDisplay = styled.div`
  display: flex;
  margin-top: 10px;
  /* border: 1px solid blue; */
  .points {
    display: flex;
    align-items: center;
    justify-content: center;
    align-content: center;
    margin-left: 1rem;
    flex-direction: column;
  }
  .cards {
    display: flex;
    .card {
      margin-left: 5px;
    }
  }
`;
const PlayedSoloSets: React.FC = () => {
  const { soloState } = useSoloGameCtx();
  const { sets } = soloState;
  const listRef = useRef(null);

  // automatically scroll to top when set is added
  useEffect(() => {
    listRef.current?.scrollTo({ top: 0, left: 0 });
  }, [sets]);

  return (
    <div
      ref={listRef}
      style={{ transform: "scale(.8)", height: "400px", overflow: "scroll" }}
    >
      {sets.map((setItem) => {
        const { time, set, points } = setItem;
        return (
          <motion.div
            key={set.join("")}
            layout
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
          >
            <SetDisplay key={time}>
              <div className="cards">
                {set
                  // in order from 1 -> 3
                  .sort((a, b) => Number(a.charAt(2)) - Number(b.charAt(2)))
                  .map((cardId) => {
                    return <SetCard width={60} {...{ cardId }} key={cardId} />;
                  })}
              </div>
              <div className="points">
                <Typography variant="h6">{points}</Typography>
                <Typography variant="caption" color="textSecondary">
                  pts
                </Typography>
              </div>
            </SetDisplay>
          </motion.div>
        );
      })}
    </div>
  );
};

export default PlayedSoloSets;
