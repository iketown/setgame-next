import React from "react";
import styled from "styled-components";

const StyledOverlay = styled.div`
  position: absolute;
  background: #ffffffcf;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 10;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 3rem;
`;

const GameMessageOverlay: React.FC = ({ children }) => {
  return <StyledOverlay>{children || <h1>HAY!</h1>}</StyledOverlay>;
};

export default GameMessageOverlay;
