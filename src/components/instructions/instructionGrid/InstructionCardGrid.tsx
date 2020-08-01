/* eslint-disable react/no-array-index-key */
import { Typography } from "@material-ui/core";
import React from "react";
import styled from "styled-components";

import { CardDiv, ChipDiv, CircleDiv, ResultDiv } from "./InstructionCardBoxes";

const CardGridDiv = styled.div<{ totalWidth: number }>`
  width: ${(p) => p.totalWidth}px;
  display: grid;
  grid-row-gap: 5px;
  justify-content: center;
  align-items: center;
  grid-template-columns: max-content repeat(3, 1fr) max-content;
  grid-template-rows: repeat(5, max-content);

  .gridBox,
  .card {
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .gridBox {
    border-bottom: 1px solid lightgray;
  }
`;

const InstructionRow: React.FC<InstructionRowI> = ({
  title,
  chips,
  result,
  row,
  circle,
}) => {
  return (
    <>
      <Typography
        style={{
          gridArea: `${row}/1`,
          marginRight: "1rem",
          textAlign: "right",
          background: circle ? "#ff4f4f33" : "",
          padding: "3px",
        }}
      >
        {title}
      </Typography>
      {chips.map((same, i) => {
        return <ChipDiv key={`${i}`} area={`${row}/${i + 2}`} {...{ same }} />;
      })}
      <ResultDiv area={`${row}/5`} ok={result} />
      {circle && <CircleDiv area={`${row}/${circle + 1}`} />}
    </>
  );
};

interface InstructionCardGridI {
  rows: InstructionRowI[];
  cards: string[];
}
const InstructionCardGrid: React.FC<InstructionCardGridI> = ({
  rows,
  cards,
}) => {
  return (
    <CardGridDiv totalWidth={350}>
      {cards?.map((cardId, index) => {
        return (
          <CardDiv
            key={`${cardId}${index}`}
            cardId={cardId}
            area={`1/${index + 2}`}
          />
        );
      })}
      {rows?.map((row, i) => {
        return <InstructionRow {...row} key={i} />;
      })}
    </CardGridDiv>
  );
};

export default InstructionCardGrid;
