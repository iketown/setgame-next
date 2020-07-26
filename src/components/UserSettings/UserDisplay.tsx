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
  user?: PlayerProfile;
  points?: number;
}

const UserDisplay: React.FC<UserDisplayI> = ({ user, children, points }) => {
  const userColorString = user?.userColor || "grey";
  const { light, med, dark } = colorsObj[userColorString];

  return (
    <>
      <Card
        style={{
          border: `1px solid ${dark}`,
          background: light,
          marginBottom: "10px",
          width: "13rem",
          position: "relative",
          overflow: "unset",
        }}
      >
        <ListItem dense style={{ padding: 0 }}>
          {user ? (
            <>
              <ListItemAvatar>
                <FaceDrawing
                  height="3rem"
                  faceImageNumber={user.faceImageNumber}
                />
              </ListItemAvatar>
              <ListItemText
                primaryTypographyProps={{ noWrap: true }}
                primary={user.displayName}
                secondary={points}
              />
              {children}
            </>
          ) : (
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                width: "100%",
              }}
            >
              <CircularProgress />
            </div>
          )}
        </ListItem>
      </Card>
      {/* <pre>{JSON.stringify(user, null, 2)}</pre> */}
    </>
  );
};

export default UserDisplay;
