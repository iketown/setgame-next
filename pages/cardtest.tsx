/* eslint-disable react/no-array-index-key */
import React from "react";
import { Grid, Container } from "@material-ui/core";
import Diamond from "../src/components/cards/shapes/Diamond";

const CardTest = () => {
  return (
    <Container>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(10, 1fr)" }}>
        {Array.from({ length: 100 }).map((_, i) => (
          <div key={i} style={{ width: 60, height: 33 }}>
            <DiamondComponent />
          </div>
        ))}
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(10, 1fr)" }}>
        {Array.from({ length: 100 }).map((_, i) => (
          <div
            style={{
              width: 60,
              height: 33,
              backgroundImage: "url(/images/diamondStripes.svg)",
              backgroundSize: "contain",
              backgroundRepeat: "no-repeat",
            }}
          />
        ))}
      </div>
    </Container>
  );
};

export default CardTest;

const DiamondComponent = () => <Diamond stripes stroke="blue" fill="none" />;

const PublicDiamond = () => (
  <div
    style={{
      width: 60,
      height: 33,
      backgroundImage: "url(/images/diamondStripes.svg)",
      backgroundSize: "contain",
      backgroundRepeat: "no-repeat",
    }}
  />
);
