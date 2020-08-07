import { Typography } from "@material-ui/core";
import React from "react";
import { AnimatedEntrance } from "./exampleAnimations";
import {
  equalColorDark,
  EqualityStatement,
  notEqualColorDark,
} from "./EqualsIcons";

const sameStyle: React.CSSProperties = {
  color: equalColorDark,
  fontWeight: "bold",
};
const differentStyle: React.CSSProperties = {
  color: notEqualColorDark,
  fontWeight: "bold",
};

export const example1 = {
  test: true,
  questionCards: ["bf1r", "bf1d"],
  answerCards: ["bf1s", "be2r", "rs3s"],
  correctAnswer: "bf1s",
  preInstructions: (
    <div>
      <div style={{ textAlign: "center" }}>
        <Typography variant="h5">Example 1:</Typography>
      </div>
      <AnimatedEntrance left unique="1left">
        <EqualityStatement
          equal
          content={
            <div>
              <Typography>
                The first two cards are{" "}
                <span style={sameStyle}>single, purple and full. </span>
              </Typography>
              <Typography>
                so the third card needs to be{" "}
                <span style={sameStyle}>single, purple and full. </span>
              </Typography>
            </div>
          }
        />
      </AnimatedEntrance>
      <AnimatedEntrance unique="1right">
        <EqualityStatement
          content={
            <div>
              <Typography>
                the first two cards' shapes are{" "}
                <span style={differentStyle}>oval</span> &
                <span style={differentStyle}> diamond</span>
              </Typography>
              <Typography>
                so the third card needs to be a{" "}
                <span style={differentStyle}>squiggle</span>.
              </Typography>
            </div>
          }
        />
      </AnimatedEntrance>
    </div>
  ),
  postInstructions: (
    <Typography>click the card to complete this set</Typography>
  ),
};

export const example2 = {
  test: true,
  questionCards: ["rs2d", "rf2d"],
  answerCards: ["rs1r", "be2d", "re2d"],
  correctAnswer: "re2d",
  preInstructions: (
    <div>
      <div style={{ textAlign: "center" }}>
        <Typography variant="h5">Example 2:</Typography>
      </div>
      <AnimatedEntrance left unique="2left">
        <EqualityStatement
          equal
          content={
            <div>
              <Typography>
                The first two cards are{" "}
                <span style={sameStyle}>double red diamonds. </span>
              </Typography>
              <Typography>
                so the third card needs to be{" "}
                <span style={sameStyle}>double red diamonds. </span>
              </Typography>
            </div>
          }
        />
      </AnimatedEntrance>
      <AnimatedEntrance unique="2right">
        <EqualityStatement
          content={
            <div>
              <Typography>
                the first two cards' fills are{" "}
                <span style={differentStyle}>striped</span> &
                <span style={differentStyle}> solid</span>
              </Typography>
              <Typography>
                so the third card needs to be{" "}
                <span style={differentStyle}>empty</span>.
              </Typography>
            </div>
          }
        />
      </AnimatedEntrance>
    </div>
  ),
  postInstructions: (
    <Typography>click the card to complete this set</Typography>
  ),
};

export const example3 = {
  test: true,
  questionCards: ["ge1s", "re2s"],
  answerCards: ["be3s", "gs3s", "be3d"],
  correctAnswer: "be3s",
  preInstructions: (
    <div>
      <div style={{ textAlign: "center" }}>
        <Typography variant="h5">Example 3:</Typography>
      </div>
      <AnimatedEntrance left unique="3left">
        <EqualityStatement
          equal
          content={
            <div>
              <Typography>
                The first two cards are{" "}
                <span style={sameStyle}>empty squiggles. </span>
              </Typography>
              <Typography>
                so the third card needs to be{" "}
                <span style={sameStyle}>empty squiggles. </span>
              </Typography>
            </div>
          }
        />
      </AnimatedEntrance>
      <AnimatedEntrance unique="3right">
        <EqualityStatement
          content={
            <div>
              <Typography>
                the first two cards have unique{" "}
                <span style={differentStyle}>colors</span> &
                <span style={differentStyle}> quantities</span>
              </Typography>
              <Typography>
                so the third card needs a unique{" "}
                <span style={differentStyle}>color</span> &{" "}
                <span style={differentStyle}>quantity</span>.
              </Typography>
            </div>
          }
        />
      </AnimatedEntrance>
    </div>
  ),
  postInstructions: (
    <Typography>click the card to complete this set</Typography>
  ),
};
export const example4 = {
  test: true,
  questionCards: ["rf2d", "bf1r"],
  answerCards: ["gf3s", "gs3d", "rf3s"],
  correctAnswer: "gf3s",
  preInstructions: (
    <div>
      <div style={{ textAlign: "center" }}>
        <Typography variant="h5">Example 4:</Typography>
      </div>
      <AnimatedEntrance unique="afewmore">
        <Typography>Let's try a few more examples</Typography>
      </AnimatedEntrance>
    </div>
  ),
  postInstructions: (
    <Typography>click the card to complete this set</Typography>
  ),
};
export const example5 = {
  test: true,
  questionCards: ["bf2d", "re1s"],
  answerCards: ["bf3r", "gs3r", "re3s"],
  correctAnswer: "gs3r",
  preInstructions: (
    <div>
      <div style={{ textAlign: "center" }}>
        <Typography variant="h5">Example 5:</Typography>
      </div>
      <AnimatedEntrance unique="num5">
        <Typography>You've got the hang of it now!</Typography>
      </AnimatedEntrance>
    </div>
  ),
  postInstructions: (
    <Typography>click the card to complete this set</Typography>
  ),
};
export const example6 = {
  test: true,
  questionCards: ["rs2d", "bs1s"],
  answerCards: ["be3r", "rs3d", "gs3r"],
  correctAnswer: "gs3r",
  preInstructions: (
    <div>
      <div style={{ textAlign: "center" }}>
        <Typography variant="h5">Example 6:</Typography>
      </div>
      <AnimatedEntrance unique="lastone">
        <Typography>Ok, last one.</Typography>
      </AnimatedEntrance>
    </div>
  ),
  postInstructions: (
    <Typography>click the card to complete this set</Typography>
  ),
};
