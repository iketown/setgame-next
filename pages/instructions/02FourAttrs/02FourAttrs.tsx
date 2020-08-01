/* eslint-disable react/no-array-index-key */
import { ButtonBase, Grid, Typography, Box } from "@material-ui/core";
import { motion, Variants } from "framer-motion";
import React, { Fragment } from "react";
import styled from "styled-components";

import { FullLine, P, NextButton } from "../typographyElements";
import { AnimatedCardPile } from "./AnimatedCardPile";
import attrOptions from "./attrOptions";
import { useAttrButtons } from "./useAttrButtons";
import AnimatedSentence from "./AnimatedSentence";

const StyledGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, max-content);
  grid-row-gap: 1rem;
  grid-column-gap: 1rem;
  .number {
    font-size: 2rem;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
  }
  .shape {
    padding: 13px 10px 0;
  }
  .color {
    margin: 10%;
    border-radius: 5px;
    height: 76%;
    box-sizing: border-box;
  }
  .fill {
    border: 2px solid grey;
    margin: 10%;
    border-radius: 5px;
    height: 76%;
    box-sizing: border-box;
    &.full {
      background: grey;
    }
    &.stripes {
      background-image: linear-gradient(
        90deg ${(p) => ", grey, white, white".repeat(12)}
      );
    }
  }
`;

const buttonVariants: Variants = {
  selected: { scale: 1, opacity: 1 },
  unselected: { scale: 0.9, opacity: 0.5 },
};

const FourAttrs: React.FC<{ advance: () => void }> = ({ advance }) => {
  const { gridObjects, cardId } = useAttrButtons();

  return (
    <div>
      <FullLine center>
        <P>Each card has a unique combination of four attributes:</P>
        <P space={false}>shape, number, color and fill.</P>
      </FullLine>
      <Grid container spacing={2} style={{ marginTop: "2rem" }}>
        <Grid
          item
          xs={12}
          sm={7}
          md={6}
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
          }}
        >
          <P>
            <Typography component="span" color="textSecondary">
              (click buttons to see variations )
            </Typography>
          </P>
          <StyledGrid>
            {gridObjects.map(({ title, value, setter }, i) => {
              return (
                <Fragment key={title}>
                  <div style={{ gridArea: `${i + 1} / 1` }}>
                    <Typography variant="h6">{title}</Typography>
                  </div>
                  {attrOptions[title].map(({ component, key }, i) => {
                    const isSelected = key === value;
                    return (
                      <motion.div
                        variants={buttonVariants}
                        animate={isSelected ? "selected" : "unselected"}
                        key={`${key}${i}`}
                      >
                        <ButtonBase key={i} onClick={() => setter(key)}>
                          <div
                            style={{
                              width: "4rem",
                              height: "3rem",
                              border: isSelected
                                ? `1px solid grey`
                                : `1px solid lightgray`,

                              borderRadius: "5px",
                              boxShadow: isSelected
                                ? "3px 3px 2px #0000005c"
                                : "none",
                            }}
                          >
                            {component}
                          </div>
                        </ButtonBase>
                      </motion.div>
                    );
                  })}
                </Fragment>
              );
            })}
          </StyledGrid>
        </Grid>
        <Grid
          item
          xs={12}
          sm={5}
          md={6}
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
          }}
        >
          <AnimatedCardPile {...{ cardId }} />
          {/* <AnimatedSentence {...{ cardId }} /> */}
        </Grid>
      </Grid>
      <Box marginTop="2rem" />
      <FullLine center>
        <P>
          So there are a total of <u>81</u> cards.
        </P>
        <P>
          <Typography component="span" color="textSecondary">
            (3 shapes x 3 numbers x 3 colors x 3 fills)
          </Typography>
        </P>
        <NextButton onClick={advance} />
      </FullLine>
    </div>
  );
};

export default FourAttrs;
