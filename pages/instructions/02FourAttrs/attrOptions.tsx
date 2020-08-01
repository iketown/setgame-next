import React from "react";
import Diamond from "@components/cards/shapes/Diamond";
import Round from "@components/cards/shapes/Round";
import Squig from "@components/cards/shapes/Squig";
import { colors } from "@components/cards/colors";

const shapeOptions = [
  {
    key: "d",
    component: (
      <div className="shape" key="diamond">
        <Diamond stroke="none" stripes={false} fill="grey" />
      </div>
    ),
  },
  {
    key: "r",
    component: (
      <div className="shape" key="round">
        <Round stroke="none" stripes={false} fill="grey" />
      </div>
    ),
  },
  {
    key: "s",
    component: (
      <div className="shape" key="squig">
        <Squig stroke="none" stripes={false} fill="grey" />
      </div>
    ),
  },
];
const numberOptions = [
  {
    key: "1",
    component: (
      <div key="1" className="number">
        1
      </div>
    ),
  },
  {
    key: "2",
    component: (
      <div key="2" className="number">
        2
      </div>
    ),
  },
  {
    key: "3",
    component: (
      <div key="3" className="number">
        3
      </div>
    ),
  },
];
const colorOptions = [
  {
    key: "r",
    component: (
      <div
        className="color"
        key="red"
        style={{
          background: colors.r,
        }}
      />
    ),
  },
  {
    key: "g",
    component: (
      <div
        className="color"
        key="green"
        style={{
          background: colors.g,
        }}
      />
    ),
  },
  {
    key: "b",
    component: (
      <div
        className="color"
        key="blue"
        style={{
          background: colors.b,
        }}
      />
    ),
  },
];
const fillOptions = [
  { key: "f", component: <div className="fill full" aria-label="full" /> },
  { key: "e", component: <div className="fill empty" aria-label="empty" /> },
  {
    key: "s",
    component: <div className="fill stripes" aria-label="stripes" />,
  },
];

const attrOptions = {
  shape: shapeOptions,
  number: numberOptions,
  color: colorOptions,
  fill: fillOptions,
};

export default attrOptions;
