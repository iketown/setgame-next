import { Button, Container } from "@material-ui/core";
import React, { useState, useEffect } from "react";

import Intro from "./00Intro/00Intro";
import SetsLookDifferent from "./01SetsLookDifferent/01SetsLookDifferent";
import NavDots from "./NavDots";
import FourAttrs from "./02FourAttrs/02FourAttrs";
import ToMakeASet from "./03ToMakeASet/ToMakeASet";
import TestContainer from "./04TestShapes/04TestContainer";
import ReadyToPlay from "./05ReadyToPlay/ReadyToPlay";
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
    <FourAttrs key="FourAttrs" {...{ advance }} />,
    <ToMakeASet key="concept0" {...{ advance }} conceptIndex={0} />,
    <TestContainer key="testA" {...{ advance }} testName="shapes" />,
    <ToMakeASet key="concept1" {...{ advance }} conceptIndex={1} />,
    <TestContainer key="testB" {...{ advance }} testName="shapes_numbers" />,
    <ToMakeASet key="concept2" {...{ advance }} conceptIndex={2} />,
    <TestContainer
      key="testC"
      {...{ advance }}
      testName="shapes_numbers_colors"
    />,
    <ToMakeASet key="concept3" {...{ advance }} conceptIndex={3} colorZero />,
    <TestContainer key="testC" {...{ advance }} testName="all_attrs" />,
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
