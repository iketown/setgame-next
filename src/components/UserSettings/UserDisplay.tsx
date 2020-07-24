import {
  Card,
  CircularProgress,
  ListItem,
  ListItemAvatar,
  ListItemText,
} from "@material-ui/core";
import React from "react";

import FaceDrawing from "../faces/FaceDrawing";
import { colorsObj } from "../GameBoard/playerColors";

// import { faceSvgs } from "../faces/faceIndex";
interface UserDisplayI {
  user: PlayerProfile;
  points?: number;
}

const UserDisplay: React.FC<UserDisplayI> = ({ user, children, points }) => {
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
          width: "13rem",
        }}
      >
        <ListItem dense style={{ padding: 0 }}>
          <ListItemAvatar>
            <FaceDrawing height="3rem" faceImageNumber={user.faceImageNumber} />
          </ListItemAvatar>
          <ListItemText
            primaryTypographyProps={{ noWrap: true }}
            primary={user.displayName}
            secondary={points}
          />
          {children}
        </ListItem>
      </Card>
      {/* <pre>{JSON.stringify(user, null, 2)}</pre> */}
    </>
  );
};

export default UserDisplay;
