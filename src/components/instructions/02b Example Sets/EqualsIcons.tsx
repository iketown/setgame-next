import { Card, CardContent, CardMedia } from "@material-ui/core";
import { pink, teal } from "@material-ui/core/colors";
import React from "react";
import { FaEquals, FaNotEqual } from "react-icons/fa";

// equals stuff
export const equalColor = teal[400];
export const equalColorDark = teal[600];

export const Equals: React.FC<{ size?: string }> = ({ size }) => (
  <FaEquals size={size} color={equalColor} />
);

// not-equal stuff
export const notEqualColor = pink[500];
export const notEqualColorDark = pink[700];
export const NotEquals: React.FC<{ size?: string }> = ({ size }) => (
  <FaNotEqual size={size} color={notEqualColor} />
);

// statement card
export const EqualityStatement: React.FC<{
  content: JSX.Element;
  equal?: boolean;
}> = ({ content, equal }) => {
  return (
    <Card style={{ display: "flex", maxWidth: "33rem", margin: "1rem" }}>
      <CardMedia
        style={{
          width: 100,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {equal ? <Equals size="2rem" /> : <NotEquals size="2rem" />}
      </CardMedia>
      <CardContent
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          padding: "10px",
          // border: "1px solid blue",
        }}
      >
        {content}
      </CardContent>
    </Card>
  );
};
