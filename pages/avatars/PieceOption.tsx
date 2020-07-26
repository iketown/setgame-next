import React from "react";
import { Piece } from "avataaars";

interface PieceOptionI {
  pieceType: string;
  pieceSize: string;
  obj: { [key: string]: string };
  obj2: { [key: string]: string };
}

const PieceOption: React.FC<PieceOptionI> = ({
  pieceType,
  pieceSize = "100",
  obj,
  obj2,
}) => {
  return (
    <Piece
      {...{ pieceType, pieceSize }}
      {...obj}
      {...obj2}
      avatarStyle="Transparent"
    />
  );
};

export default PieceOption;
