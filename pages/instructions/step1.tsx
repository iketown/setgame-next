/* eslint-disable no-underscore-dangle */
import React, { useState } from "react";
import {
  Typography,
  Grid,
  Container,
  Button,
  Divider,
} from "@material-ui/core";
import SetCard from "@components/cards/SetCard";
import { AnimatePresence, motion } from "framer-motion";
import {
  P,
  Title,
  TwoThirds,
  OneThird,
  FullLine,
  AttrTitle,
} from "./typographyElements";
import { cardVariants } from "./cardVariants";

const MeetTheCards: React.FC<Step> = ({ goToNext }) => {
  const [shape, setShape] = useState<string>("d");
  const [fill, setFill] = useState("f");
  const [quant, setQuant] = useState("1");
  const [color, setColor] = useState("b");
  const [motionKey, setMotionKey] = useState(0);
  const cardId = `${color}${fill}${quant}${shape}`;
  return (
    <Container maxWidth="md">
      <Grid container>
        <Title>Meet the Cards</Title>
        <FullLine>
          <P>
            The game of <b>Set</b> starts with 12 cards on the table.
          </P>
          <P>
            Each player's goal is to find <b>three</b> cards that go together
            and make a "set."
          </P>
          <P>Each card is defined by its unique set of attributes;</P>
        </FullLine>
        <TwoThirds>
          <Divider />
          <AttrSection
            title="Shape"
            currentValue={shape}
            values={[
              { value: "d", display: "Diamonds" },
              { value: "r", display: "Rounds" },
              { value: "s", display: "Squiggles" },
            ]}
            setter={setShape}
            {...{ setMotionKey }}
          />
          <AttrSection
            title="Quantity"
            currentValue={quant}
            values={[
              { value: "1", display: "1" },
              { value: "2", display: "2" },
              { value: "3", display: "3" },
            ]}
            setter={setQuant}
            {...{ setMotionKey }}
          />
          <AttrSection
            title="Color"
            currentValue={color}
            values={[
              { value: "r", display: "Red" },
              { value: "g", display: "Green" },
              { value: "b", display: "Purple" },
            ]}
            setter={setColor}
            {...{ setMotionKey }}
          />
          <AttrSection
            title="Fill"
            currentValue={fill}
            values={[
              { value: "f", display: "Full" },
              { value: "e", display: "Blank" },
              { value: "s", display: "Striped" },
            ]}
            setter={setFill}
            {...{ setMotionKey }}
          />
        </TwoThirds>
        <OneThird>
          <div
            style={{
              position: "relative",
              height: "100%",
              border: "1px solid blue",
            }}
          >
            <AnimatePresence>
              <motion.div
                key={motionKey}
                style={{
                  position: "absolute",
                  top: "50%",
                  tranform: "translateY(-50%)",
                }}
                initial="initial"
                animate="in"
                exit="exit"
                variants={cardVariants}
              >
                <SetCard cardId={cardId} width={140} />
              </motion.div>
            </AnimatePresence>
          </div>
        </OneThird>
      </Grid>
    </Container>
  );
};

export default MeetTheCards;

interface AttrSectionI {
  currentValue: string;
  setter: React.Dispatch<React.SetStateAction<string>>;
  values: { display: string; value: string }[];
  title: string;
  setMotionKey: React.Dispatch<React.SetStateAction<number>>;
}
const AttrSection: React.FC<AttrSectionI> = ({
  currentValue,
  setter,
  values,
  title,
  setMotionKey,
}) => {
  const _setter = (val: string) => {
    setter(val);
    setMotionKey((o) => o + 1);
  };
  return (
    <>
      <P>
        <AttrTitle>{title}</AttrTitle>
        {values.map(({ display, value }) => (
          <AttrButton key={value} {...{ currentValue, value, setter: _setter }}>
            {display}
          </AttrButton>
        ))}
      </P>
      <Divider />
    </>
  );
};

interface AttrButtonI {
  setter: React.Dispatch<React.SetStateAction<string>>;
  currentValue: string;
  value: string;
}
const AttrButton: React.FC<AttrButtonI> = ({
  children,
  setter,
  currentValue,
  value,
}) => {
  const isSelected = currentValue === value;
  return (
    <Button
      variant={isSelected ? "contained" : "outlined"}
      color={isSelected ? "primary" : "default"}
      onClick={() => setter(value)}
      style={{ margin: "5px" }}
    >
      {children}
    </Button>
  );
};
