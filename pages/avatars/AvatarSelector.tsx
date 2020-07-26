import React from "react";
import { Grid } from "@material-ui/core";
import PieceOption from "./PieceOption";

//
//

const options = [
  "Eyepatch",
  "Turban",
  "Hat",
  "Hijab",
  "NoHair",
  "WinterHat1",
  "WinterHat2",
  "WinterHat3",
  "WinterHat4",
  "LongHairBigHair",
  "LongHairBob",
  "LongHairBun",
  "LongHairCurly",
  "LongHairCurvy",
  "LongHairDreads",
  "LongHairFrida",
  "LongHairFro",
  "LongHairFroBand",
  "LongHairNotTooLong",
  "LongHairShavedSides",
  "LongHairMiaWallace",
  "LongHairStraight",
  "LongHairStraight2",
  "LongHairStraightStrand",
  "ShortHairDreads01",
  "ShortHairDreads02",
  "ShortHairFrizzle",
  "ShortHairShaggyMullet",
  "ShortHairShortCurly",
  "ShortHairShortFlat",
  "ShortHairShortRound",
  "ShortHairShortWaved",
  "ShortHairSides",
  "ShortHairTheCaesar",
  "ShortHairTheCaesarSidePart",
];

const AvatarSelector = () => {
  return (
    <Grid container>
      {options.map((opt) => (
        <Grid item key={opt}>
          <PieceOption
            pieceSize="100"
            pieceType="top"
            obj={{ topType: opt }}
            obj2={{ hairColor: "Red" }}
          />
        </Grid>
      ))}
    </Grid>
  );
};

export default AvatarSelector;
