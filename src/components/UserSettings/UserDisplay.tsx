import React from "react";
import {
  ListItem,
  ListItemAvatar,
  ListItemText,
  Avatar,
  Card,
  CircularProgress,
} from "@material-ui/core";
import styled from "styled-components";
// import { faceSvgs } from "../faces/faceIndex";
import { colorsObj } from "../GameBoard/playerColors";
import FaceDrawing from "../faces/FaceDrawing";

interface UserDisplayI {
  user: PlayerProfile;
}

const UserDisplay: React.FC<UserDisplayI> = ({ user, children }) => {
  if (!user) return <CircularProgress />;
  const userColorString = user.userColor || "grey";
  const { light, med, dark } = colorsObj[userColorString];
  return (
    <>
      <Card
        style={{
          border: `1px solid ${dark}`,
          background: light,
          marginBottom: "10px",
        }}
      >
        <ListItem dense style={{ padding: 0 }}>
          <ListItemAvatar style={{ marginRight: "1rem" }}>
            <FaceDrawing height="3rem" faceImageNumber={user.faceImageNumber} />
          </ListItemAvatar>
          <ListItemText primary={user.displayName} />
          {children}
        </ListItem>
      </Card>
      {/* <pre>{JSON.stringify(user, null, 2)}</pre> */}
    </>
  );
};

export default UserDisplay;
