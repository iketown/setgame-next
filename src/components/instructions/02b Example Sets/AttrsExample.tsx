import React from "react";
import { Box, Typography } from "@material-ui/core";
import { FaPlus, FaEquals, FaThumbsUp, FaThumbsDown } from "react-icons/fa";
import SetCard from "../../cards/SetCard";

const AttrsExample: React.FC<{
  cardIds: string[];
  ok?: boolean;
  explanation?: string;
  marginTop?: string;
}> = ({ cardIds, ok, explanation, marginTop = "1rem" }) => {
  return (
    <Box
      marginTop={marginTop}
      border={ok ? "1px solid green" : "1px solid red"}
      borderRadius="1rem"
      style={{ transform: ok ? "" : "scale(.8)" }}
    >
      <Box display="flex" alignItems="center" padding="1rem">
        <SetCard cardId={cardIds[0]} />
        <Box marginX="1rem">
          <FaPlus />
        </Box>
        <SetCard cardId={cardIds[1]} />
        <Box marginX="1rem">
          <FaPlus />
        </Box>
        <SetCard cardId={cardIds[2]} />
        <Box marginX="1rem">
          <FaEquals />
        </Box>
        {ok ? (
          <FaThumbsUp color="green" size="3rem" />
        ) : (
          <FaThumbsDown color="red" size="3rem" />
        )}
      </Box>
      {explanation && <Typography>{explanation}</Typography>}
    </Box>
  );
};

export default AttrsExample;
