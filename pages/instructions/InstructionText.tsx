import React from "react";
import { Typography } from "@material-ui/core";
import styled from "styled-components";

const StyledInstructionDiv = styled.div`
  text-align: center;
`;

const InstructionText: React.FC = ({ children }) => {
  return (
    <StyledInstructionDiv>
      <Typography variant="subtitle2">
        This would be an instruction.{" "}
      </Typography>
      <Typography variant="subtitle2">One or two sentences, tops</Typography>
    </StyledInstructionDiv>
  );
};

export default InstructionText;
