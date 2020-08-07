import { Box, Typography } from "@material-ui/core";
import React from "react";

import { FullLine, NextButton, P } from "../typographyElements";
import AttrsExample from "./AttrsExample";
import { notEqualColor, EqualityStatement } from "./EqualsIcons";

const AttrsSame: React.FC<{ advance: () => void }> = ({ advance }) => {
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
          If one card has <b>DIAMONDS</b>, and another card has <b>OVALS</b>,{" "}
          <br /> then the third card can't have EITHER of them. (it must be a{" "}
          <b>SQUIGGLE</b>)
        </Typography>
        <AttrsExample cardIds={["bf2d", "be2r", "bs2s"]} ok />
        <AttrsExample
          cardIds={["bf2d", "be2r", "bs2r"]}
          explanation="two cards with ovals = NOT A SET"
        />
        <AttrsExample
          cardIds={["gf2d", "ge2r", "ge2s"]}
          explanation="two cards with empty shapes = NOT A SET"
          marginTop="0"
        />
        <AttrsExample
          cardIds={["rf1d", "ge2r", "rs3s"]}
          explanation="two red cards = NOT A SET"
          marginTop="0"
        />
        <AttrsExample
          cardIds={["rf1d", "ge2r", "bs3s"]}
          explanation="even if ALL attributes are different, its still a set"
          marginTop="0"
          ok
        />
      </Box>
      <NextButton onClick={advance}>Got it</NextButton>
    </FullLine>
  );
};

export default AttrsSame;
