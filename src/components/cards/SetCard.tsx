import React, { useRef } from "react";
import styled from "styled-components";
import colors from "./colors";
import shapes from "./shapes";

const Card = styled.div<{
  rotation: number;
  width: number;
  isSelected?: boolean;
  isCheater?: boolean;
}>`
  width: ${(p) => p.width}px;
  height: ${(p) => p.width * 1.4}px;
  border: ${(p) =>
    p.isSelected
      ? `3px solid red`
      : p.isCheater
      ? "2px solid blue"
      : "1px solid lightgrey"};
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  box-shadow: 3px 3px 5px #00000038;
  background: white;
  transform: rotate(${(p) => p.rotation}deg);
  .card {
    width: 55%;
    margin: 3px;
  }
  :hover {
    box-shadow: 5px 5px 7px #00000030;
  }
`;

const SetCard: React.FC<{
  cardId: string;
  width?: number;
  horizontal?: boolean;
  isSelected?: boolean;
  isCheater?: boolean;
}> = ({ cardId, width, horizontal, isSelected, isCheater }) => {
  const [color, fill, quant, shape] = cardId.split("");
  const rotationRef = useRef(Math.random() * 5 - 2.5);
  const Shape = shapes[shape];
  if (!Shape) return <div>{`${shape}_${fill}`}</div>;
  const fillProp = fill === "f" ? colors[color] : "none";
  const stripes = fill === "s";
  const stroke = colors[color];
  const style = horizontal ? { transform: "rotate(90deg)" } : {};
  return (
    <Card
      {...{ isSelected, isCheater }}
      rotation={rotationRef.current}
      width={width || 100}
      style={style}
    >
      {Array.from({ length: Number(quant) }).map((_, index) => {
        return (
          <div key={index} className="card">
            <Shape stroke={stroke} fill={fillProp} stripes={stripes} />
          </div>
        );
      })}
    </Card>
  );
};

export default SetCard;
