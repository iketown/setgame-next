/* eslint-disable import/prefer-default-export */
import React from "react";
import { Typography } from "@material-ui/core";

const shapeFails = {
  diff: (
    <Typography color="secondary">
      shapes must either be all the same or <b>ALL DIFFERENT</b>
    </Typography>
  ),
  same: (
    <Typography color="secondary">
      shapes must either be <b>ALL THE SAME</b> or all different
    </Typography>
  ),
};

const getShapeFail = (attr: string, diffOrSame: "diff" | "same") => {
  return {
    diff: (
      <Typography color="secondary">
        <b>
          <u>{attr}</u>
        </b>{" "}
        must either be ALL THE SAME or <b>ALL DIFFERENT</b>
      </Typography>
    ),
    same: (
      <Typography color="secondary">
        <b>
          <u>{attr}</u>
        </b>{" "}
        must either be <b>ALL THE SAME</b> or ALL DIFFERENT
      </Typography>
    ),
  }[diffOrSame];
};

const customShapeFail = (text: string) => {
  return <Typography color="secondary">{text}</Typography>;
};

const shapes1 = {
  testCards: ["xf1d", "xf1d"],
  answerCards: ["xf1d", "xf1s", "xf1r"],
  correctAnswer: "xf1d",
  failMessages: {
    all: getShapeFail("shapes", "same"),
  },
};
const shapes2 = {
  testCards: ["xf1r", "xf1d"],
  answerCards: ["xf1s", "xf1d", "xf1r"],
  correctAnswer: "xf1s",
  failMessages: {
    all: getShapeFail("shapes", "diff"),
  },
};
const shapes3 = {
  testCards: ["xf1r", "xf1r"],
  answerCards: ["xf1s", "xf1r", "xf1d"],
  correctAnswer: "xf1r",
  failMessages: {
    all: getShapeFail("shapes", "same"),
  },
};
// const shapes4 = {
//   testCards: ["xf1d", "xf1s"],
//   answerCards: ["xf1s", "xf1d", "xf1r"],
//   correctAnswer: "xf1r",
//   failMessages: {
//     all: shapeFails.diff,
//   },
// };

const sn1 = {
  testCards: ["xf1r", "xf2r"],
  answerCards: ["xf3r", "xf3d", "xf2s"],
  correctAnswer: "xf3r",
  failMessages: {
    xf3d: getShapeFail("shapes", "same"), // should be
    xf2s: getShapeFail("numbers", "diff"),
    all: "fail",
  },
};
const sn2 = {
  testCards: ["xf2s", "xf2d"],
  answerCards: ["xf2r", "xf3d", "xf1s"],
  correctAnswer: "xf2r",
  failMessages: {
    xf3d: getShapeFail("numbers and shapes", "diff"),
    xf1s: getShapeFail("numbers and shapes", "same"),
    all: "fail",
  },
};
const sn3 = {
  testCards: ["xf3r", "xf1d"],
  answerCards: ["xf2d", "xf1s", "xf2s"],
  correctAnswer: "xf2s",
  failMessages: {
    all: shapeFails.same,
    xf2d: getShapeFail("shapes", "diff"),
    xf1s: getShapeFail("numbers", "diff"),
  },
};

// diff colors, all squigs, all 3
const snc1 = {
  testCards: ["bf3s", "gf3s"],
  answerCards: ["rf2s", "rf3s", "gf2s"],
  correctAnswer: "rf3s",
  failMessages: {
    all: shapeFails.same,
    rf2s: getShapeFail("numbers", "same"),
    gf2s: customShapeFail("2 threes and 2 greens"),
  },
};
// all green, diff shapes, diff numbers
const snc2 = {
  testCards: ["gf1s", "gf3d"],
  answerCards: ["gf2d", "rf2r", "gf2r"],
  correctAnswer: "gf2r",
  failMessages: {
    all: shapeFails.same,
    rf2r: getShapeFail("colors", "same"),
    gf2d: getShapeFail("shapes", "diff"),
  },
};
// diff colors, diff shapes, diff numbers
const snc3 = {
  testCards: ["rf3s", "gf1r"],
  answerCards: ["bf2d", "bf1d", "rf2s"],
  correctAnswer: "bf2d",
  failMessages: {
    all: shapeFails.same,
    bf1d: getShapeFail("numbers", "diff"),
    rf2s: getShapeFail("shapes", "diff"),
  },
};

// ALL
// diff fills, diff colors,  2 squig
const all1 = {
  testCards: ["be2s", "gs2s"],
  answerCards: ["ge2r", "rf2s", "bs2s"],
  correctAnswer: "rf2s",
  failMessages: {
    all: shapeFails.same,
    ge2r: customShapeFail("2 greens, 2 empties"),
    bs2s: customShapeFail("2 purples, 2 stripes"),
  },
};
// red, diff fills colors numbers
const all2 = {
  testCards: ["rs2d", "re1s"],
  answerCards: ["rf3r", "bf3r", "re2d"],
  correctAnswer: "rf3r",
  failMessages: {
    all: shapeFails.same,
    bf3r: getShapeFail("colors", "same"),
    re2d: getShapeFail("shapes", "diff"),
  },
};

// diff colors, diff fills, diff numbers, diff shapes
const all3 = {
  testCards: ["gs3s", "rf1d"],
  answerCards: ["be2d", "be2r", "rs3d"],
  correctAnswer: "be2r",
  failMessages: {
    all: shapeFails.same,
    be2d: customShapeFail("2 diamonds"),
    rs3d: customShapeFail("2 diamonds, 2 reds"),
  },
};

export const allTests = {
  shapes: [shapes1, shapes2, shapes3],
  shapes_numbers: [sn1, sn2, sn3],
  shapes_numbers_colors: [snc1, snc2, snc3],
  all_attrs: [all1, all2, all3],
};
