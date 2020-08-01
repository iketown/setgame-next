import React from "react";
import styled from "styled-components";
import SetCard from "../cards/SetCard";

//
//
const StyledCardDiv = styled.div`
  display: flex;
  justify-content: space-around;
`;
const InstructionCardDisplay: React.FC = () => {
  return (
    <StyledCardDiv>
      <SetCard cardId="bf3d" />
    </StyledCardDiv>
  );
};

export default InstructionCardDisplay;
