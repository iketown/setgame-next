import React from "react";
import { Typography, Divider, Tooltip } from "@material-ui/core";
import styled from "styled-components";
import cardCodes from "../../../utils/cardCodes";
import { Equals, NotEquals } from "../02b Example Sets/EqualsIcons";

const StyledRow = styled.div<{ cardWidth: number }>`
  display: grid;
  width: ${(p) => p.cardWidth * 4}px;
  /* border: 1px solid orange; */
  padding: 5px 2rem 0;
  justify-items: center;
  align-items: center;
  grid-template-columns: ${(p) =>
    `${p.cardWidth}px 1fr ${p.cardWidth}px 1fr ${p.cardWidth}px`};
  .card {
    /* border: 1px solid blue; */
  }
  .divider {
    grid-area: 2 / 1 / 2 / -1;
    width: 100%;
    margin: 10px 0;
  }
`;

interface AttrRowProps {
  cardWidth?: number;
  cardIds: string[];
  correctAnswer: string;
  attrName: "color" | "fill" | "quantity" | "shape";
}
const AttrRow: React.FC<AttrRowProps> = ({
  cardWidth = 160,
  cardIds,
  correctAnswer,
  attrName,
}) => {
  const attrPosition = ["color", "fill", "quantity", "shape"].indexOf(attrName);

  const code0 = cardIds[0].charAt(attrPosition);
  const code1 = cardIds[1].charAt(attrPosition);
  const codeCorrect = correctAnswer.charAt(attrPosition);
  const isEqual = code0 === code1;

  const word0 = cardCodes[attrName][code0];
  const word1 = cardCodes[attrName][code1];
  const wordCorrect = cardCodes[attrName][codeCorrect];
  return (
    <>
      <StyledRow cardWidth={cardWidth}>
        <Typography className="card">{word0}</Typography>
        <div>{isEqual ? <Equals /> : <NotEquals />}</div>
        <Typography className="card">{word1}</Typography>
        <div>{isEqual ? <Equals /> : <NotEquals />}</div>
        <Tooltip
          style={{ fontSize: "1rem" }}
          placement="top"
          title={<Typography variant="h5">{wordCorrect}</Typography>}
        >
          <Typography style={{ cursor: "pointer" }} className="card">
            ?
          </Typography>
        </Tooltip>
        <Divider className="divider" />
      </StyledRow>
    </>
  );
};

export default AttrRow;
