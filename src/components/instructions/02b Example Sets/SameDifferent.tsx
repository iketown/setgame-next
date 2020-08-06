import { Box, Typography } from "@material-ui/core";
import React from "react";

import { FullLine, NextButton, P } from "../typographyElements";
import {
  equalColor,
  EqualityStatement,
  Equals,
  notEqualColor,
  NotEquals,
} from "./EqualsIcons";

const SameDifferent: React.FC<{ advance: () => void }> = ({ advance }) => {
  return (
    <FullLine center>
      <P>Any two cards can start a set.</P>
      <P>
        to <em>complete</em> a set, the third card must follow these rules:
      </P>
      <Box
        justifyContent="center"
        display="flex"
        flexDirection="column"
        alignItems="center"
      >
        <EqualityStatement
          equal
          content={
            <Typography>
              if an attribute is the{" "}
              <span style={{ fontWeight: "bold", color: equalColor }}>
                SAME
              </span>{" "}
              on the first two cards,
              <br /> it must also be the{" "}
              <span style={{ fontWeight: "bold", color: equalColor }}>
                SAME
              </span>{" "}
              on the third card.
            </Typography>
          }
        />
        <Typography>
          i.e. If the first two cards are both diamonds, the third card must
          also be diamonds.
        </Typography>
        <EqualityStatement
          content={
            <Typography>
              if an attribute is{" "}
              <span style={{ fontWeight: "bold", color: notEqualColor }}>
                DIFFERENT
              </span>{" "}
              on the first two cards,
              <br /> it must also be{" "}
              <span style={{ fontWeight: "bold", color: notEqualColor }}>
                DIFFERENT
              </span>{" "}
              on the third card.
            </Typography>
          }
        />
        <Typography>
          i.e. If the first card is purple, and the second card is green, <br />{" "}
          the third card can't be purple or green. (it must be red)
        </Typography>
        <NextButton onClick={advance}>Got it</NextButton>
      </Box>
    </FullLine>
  );
};

export default SameDifferent;
