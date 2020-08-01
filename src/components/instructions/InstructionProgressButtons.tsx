import React from "react";
import { Button } from "@material-ui/core";
import styled from "styled-components";

const StyledButtonDiv = styled.div`
  display: flex;
  justify-content: space-between;
`;

interface InstructionProgressButtonsI {
  setFrameIndex: React.Dispatch<React.SetStateAction<number>>;
  frameIndex: number;
}
const InstructionProgressButtons: React.FC<InstructionProgressButtonsI> = ({
  setFrameIndex,
  frameIndex,
}) => {
  const handleClick = (delta: number) => {
    setFrameIndex((old) => old + delta);
  };
  return (
    <StyledButtonDiv>
      <Button onClick={() => handleClick(-1)} variant="outlined">
        Prev {frameIndex - 1}
      </Button>
      <Button onClick={() => handleClick(1)} variant="outlined">
        Next {frameIndex + 1}
      </Button>
    </StyledButtonDiv>
  );
};

export default InstructionProgressButtons;
