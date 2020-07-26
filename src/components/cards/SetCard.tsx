/* eslint-disable react/no-array-index-key */
import React, { useRef, memo } from "react";
import styled from "styled-components";
import { colors } from "./colors";
import shapes from "./shapes";

const StyledCard = styled.div<{
  rotation: number;
  width: number;
  border?: string;
}>`
  width: ${(p) => p.width}px;
  height: ${(p) => p.width * 1.4}px;
  box-shadow: 1px 1px 2px #0000003d;
  border: ${(p) => p.border || "1px solid rgba(0, 0, 0, 0.1)"};
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: white;
  transform: rotate(${(p) => p.rotation}deg);
  .shape {
    width: 55%;
    margin: ${(p) => p.width * 0.01}px;
  }
  :hover {
    box-shadow: 5px 5px 7px #00000030;
  }
`;

const SetCard: React.FC<{
  cardId: string;
  width?: number;
  horizontal?: boolean;
  border?: string;
  rotation?: number;
}> = ({ cardId, width, horizontal, border, rotation }) => {
  if (!cardId) return null;
  const [color, fill, quant, shape] = cardId.split("");
  const rotationRef = useRef(
    typeof rotation === "number" ? rotation : Math.random() * 5 - 2.5
  );
  const Shape = shapes[shape];
  if (!Shape) return <div>{`${shape}_${fill}`}</div>;
  const fillProp = fill === "f" ? colors[color] : "none";
  const stripes = fill === "s";
  const stroke = colors[color];
  const style = horizontal ? { transform: "rotate(90deg)" } : {};
  return (
    <StyledCard
      rotation={rotationRef.current}
      width={width || 100}
      style={{ ...style }}
      border={border}
      className="card"
    >
      {Array.from({ length: Number(quant) }).map((_, index) => {
        return (
          <div key={`${cardId}${index}`} className="shape">
            <Shape stroke={stroke} fill={fillProp} stripes={stripes} />
          </div>
        );
      })}
    </StyledCard>
  );
};

export default memo(SetCard);
