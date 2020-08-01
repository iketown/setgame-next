/* eslint-disable react/require-default-props */
import SetCard from "@components/cards/SetCard";
import { Box, Grid, Typography } from "@material-ui/core";
import React, { useState } from "react";

import { FullLine, NextButton } from "../typographyElements";
import AnimatedAttrButtons from "./AnimatedAttrButtons";
import ToMakeASetText from "./ToMakeASetText";

const ToMakeASet: React.FC<{
  advance: () => void;
  conceptIndex: number;
  colorZero?: boolean;
}> = ({ advance, conceptIndex, colorZero }) => {
  const [shapeIndex, setShapeIndex] = useState(0);
  const [numIndex, setNumIndex] = useState(0);
  const [colorIndex, setColorIndex] = useState(colorZero ? 0 : -1);
  const [fillIndex, setFillIndex] = useState(-1);

  const optionsArr: {
    cardConfigs: string[];
    textFields: string[];
    state: [number, React.Dispatch<React.SetStateAction<number>>];
    extraStartText: string;
  }[] = [
    {
      extraStartText: "",
      cardConfigs: ["ddd", "rrr", "sss", "drs"],
      textFields: ["DIAMONDS", "ROUNDS", "SQUIGGLES"],
      state: [shapeIndex, setShapeIndex],
    },
    {
      extraStartText: "also,",
      cardConfigs: ["111", "222", "333", "123"],
      textFields: ["ONES", "TWOS", "THREES"],
      state: [numIndex, setNumIndex],
    },
    {
      extraStartText: "also,",
      cardConfigs: ["rrr", "bbb", "ggg", "rbg"],
      textFields: ["REDS", "PURPLES", "GREENS"],
      state: [colorIndex, setColorIndex],
    },
    {
      extraStartText: "OK. last one...",
      cardConfigs: ["fff", "eee", "sss", "fes"],
      textFields: ["FULL", "EMPTY", "STRIPED"],
      state: [fillIndex, setFillIndex],
    },
  ];
  const currentOption = optionsArr[conceptIndex];
  const doesntExist = ![shapeIndex, numIndex, colorIndex, fillIndex].find(
    (num) => num === 3
  );
  return (
    <Grid container>
      <ToMakeASetText
        extraStartText={currentOption.extraStartText}
        setter={currentOption.state[1]}
        options={currentOption.textFields}
      />

      <Grid item xs={12} style={{ display: "flex", justifyContent: "center" }}>
        <Box
          display="flex"
          justifyContent="space-around"
          width={500}
          position="relative"
        >
          {Array.from({ length: 3 }, (_, i) => {
            const [
              shapeConfig,
              numConfig,
              colorConfig,
              fillConfig,
            ] = optionsArr;
            const shapeKey =
              shapeConfig.cardConfigs[shapeConfig.state[0]]?.charAt(i) || "d";
            const numKey =
              numConfig.cardConfigs[numConfig.state[0]]?.charAt(i) || "1";
            const colorKey =
              colorConfig.cardConfigs[colorConfig.state[0]]?.charAt(i) || "x";
            const fillKey =
              fillConfig.cardConfigs[fillConfig.state[0]]?.charAt(i) || "f";

            const cardId = `${colorKey}${fillKey}${numKey}${shapeKey}`;
            return <SetCard width={130} cardId={cardId} />;
          })}
          {doesntExist && (
            <div style={{ position: "absolute", top: "-1.5rem" }}>
              <Typography variant="caption" color="textSecondary">
                * this set for illustration only. (no two cards are identical)
              </Typography>
            </div>
          )}
        </Box>
      </Grid>
      {optionsArr
        .reverse()
        .map(({ textFields, state: [value, setter] }, optionIndex) => {
          if (3 - optionIndex > conceptIndex) return null;
          return (
            <AnimatedAttrButtons
              key={textFields.join()}
              textFields={textFields}
              setter={setter}
              value={value}
              noAnimation={3 - optionIndex < conceptIndex}
            />
          );
        })}

      <FullLine center>
        <Box marginTop="2rem" />

        <NextButton onClick={advance}>Got it</NextButton>
      </FullLine>
    </Grid>
  );
};

export default ToMakeASet;
