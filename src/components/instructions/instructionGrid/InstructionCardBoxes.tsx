/* eslint-disable react/no-array-index-key */
import SetCard from "@components/cards/SetCard";
import { Chip } from "@material-ui/core";
import React from "react";
import { FaCheckCircle, FaTimesCircle } from "react-icons/fa";

interface ChipDivI {
  same?: boolean;
  area: string;
}
export const ChipDiv: React.FC<ChipDivI> = ({ same, area }) => {
  return (
    <div
      className="gridBox"
      style={{
        gridArea: area,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: "1rem",
      }}
    >
      <Chip
        label={same ? "same" : "different"}
        variant={same ? "default" : "outlined"}
      />
    </div>
  );
};

interface CardDivI {
  cardId: string;
  area: string;
}
export const CardDiv: React.FC<CardDivI> = ({ area, cardId }) => {
  return (
    <div
      className="card"
      style={{
        gridArea: area,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <SetCard cardId={cardId} />
    </div>
  );
};

export const CircleDiv: React.FC<{ area: string }> = ({ area }) => {
  return (
    <div
      className="gridBox"
      style={{
        gridArea: area,
        border: `3px dotted red`,
        borderRadius: "2rem",
        width: "90%",
        height: "80%",
        margin: "10% 5%",
      }}
    />
  );
};

interface ResultDivI {
  ok?: boolean;
  area: string;
}
export const ResultDiv: React.FC<ResultDivI> = ({ ok, area }) => {
  return (
    <div style={{ gridArea: area, padding: "10px", fontSize: "30px" }}>
      {ok ? <FaCheckCircle color="green" /> : <FaTimesCircle color="red" />}
    </div>
  );
};
