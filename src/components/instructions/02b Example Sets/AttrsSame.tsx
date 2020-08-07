import { Box, Typography } from "@material-ui/core";
import React from "react";

import { FullLine, NextButton, P } from "../typographyElements";
import AttrsExample from "./AttrsExample";
import { equalColor, EqualityStatement } from "./EqualsIcons";

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
          If the first two cards are both <b>diamonds</b>, the third card must
          also be <b>diamonds</b>.
        </Typography>
        <AttrsExample cardIds={["bf2d", "be2d", "bs2d"]} ok />
        <AttrsExample
          cardIds={["bf2d", "be2d", "bs2s"]}
          explanation="two diamond cards, one squiggle card"
        />
      </Box>
      <NextButton onClick={advance}>Got it</NextButton>
    </FullLine>
  );
};

export default AttrsSame;
