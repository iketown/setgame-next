import { Grid } from "@material-ui/core";
import React, { useState } from "react";

import CardTestOutline from "../04TestShapes/CardTestOutline";
import {
  example1,
  example2,
  example3,
  example4,
  example5,
  example6,
} from "./examples";

const allExamples = [
  example1,
  example2,
  example3,
  example4,
  example5,
  example6,
];

const ExampleSets: React.FC<{ advance: () => void }> = ({ advance }) => {
  const [exampleIndex, setExampleIndex] = useState(0);
  const { preInstructions, postInstructions, ...cardInfo } = allExamples[
    exampleIndex
  ];
  const handleSuccess = () => {
    setTimeout(() => {
      setExampleIndex((old) => {
        if (allExamples[old + 1]) {
          return old + 1;
        }
        advance();
        return old;
      });
    }, 1500);
  };
  return (
    <Grid container>
      <Grid item xs={12} style={{ display: "flex", justifyContent: "center" }}>
        {preInstructions}
      </Grid>
      <CardTestOutline
        key={cardInfo.questionCards.join("")}
        {...cardInfo}
        postInstructions={postInstructions}
        handleSuccess={handleSuccess}
      />
    </Grid>
  );
};

export default ExampleSets;
