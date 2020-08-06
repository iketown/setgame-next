import { Button, Container } from "@material-ui/core";
import React, { useState, useEffect } from "react";

import SetsLookDifferent from "@components/instructions/01SetsLookDifferent/01SetsLookDifferent";
import Intro from "@components/instructions/00Intro/00Intro";
import NavDots from "@components/instructions/NavDots";
import FourAttrs from "@components/instructions/02FourAttrs/02FourAttrs";
import FourAttrsSimple from "@components/instructions/02FourAttrs/FourAttrsSimple";
import ToMakeASet from "@components/instructions/03ToMakeASet/ToMakeASet";
import TestContainer from "@components/instructions/04TestShapes/04TestContainer";
import ReadyToPlay from "@components/instructions/05ReadyToPlay/ReadyToPlay";
import ExampleSets from "../../src/components/instructions/02b Example Sets/ExampleSets";
import SameDifferent from "../../src/components/instructions/02b Example Sets/SameDifferent";
//
//

const InstructionsPage: React.FC = () => {
  const [frameIndex, setFrameIndex] = useState(0);

  useEffect(() => {
    const lastIndex = localStorage.getItem("instructionsIndex");
    if (lastIndex) setFrameIndex(Number(lastIndex));
  }, []);
  useEffect(() => {
    localStorage.setItem("instructionsIndex", String(frameIndex));
  }, [frameIndex]);
  const advance = (number = 1) => {
    setFrameIndex((old) => old + number);
  };
  const frames = [
    <Intro key="intro" {...{ advance }} />,
    <SetsLookDifferent key="setslookdifferent" {...{ advance }} />,
    <FourAttrsSimple key="FourAttrs" {...{ advance }} />,
    <SameDifferent {...{ advance }} />,
    <ExampleSets key="examplesets" {...{ advance }} />,

    <ReadyToPlay key="ready2play" />,
    <div key="junk" style={{ marginTop: "4rem" }}>
      <Button
        key="bakbutton"
        size="large"
        onClick={() => setFrameIndex((o) => o - 1)}
      >
        back
      </Button>
    </div>,
  ];

  return (
    <>
      <NavDots
        quantity={frames.length}
        index={frameIndex}
        setIndex={setFrameIndex}
      />
      <Container fixed maxWidth="md" style={{ marginTop: "2rem" }}>
        {frames[frameIndex]}
        {/* <InstructionCardDisplay /> */}
        {/* <InstructionProgressButtons {...{ setFrameIndex, frameIndex }} /> */}
        {/* <InstructionCardGrid
        rows={[shapeRow, colorRow, quantrow]}
        cards={["be2s", "be3s", "rf2r"]}
      /> */}
      </Container>
    </>
  );
};

export default InstructionsPage;

// const shapeRow: InstructionRowI = {
//   title: "shape",
//   row: 2,
//   chips: [true, true, false], // same = true, different= false
//   result: false,
//   circle: 3, // card # of mismatch (1 2 or 3 )
// };

// const colorRow: InstructionRowI = {
//   title: "color",
//   row: 3,
//   chips: [true, true, true],
//   result: true,
// };

// const quantrow: InstructionRowI = {
//   title: "number",
//   row: 4,
//   chips: [true, false, true],
//   result: false,
//   circle: 2,
// };
