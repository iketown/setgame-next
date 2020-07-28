import {
  Card,
  CircularProgress,
  ListItem,
  ListItemAvatar,
  ListItemText,
} from "@material-ui/core";
import React from "react";
import { useProfile } from "@hooks/useProfile";
import FaceDrawing from "../faces/FaceDrawing";
import { colorsObj } from "../GameBoard/playerColors";

// import { faceSvgs } from "../faces/faceIndex";
interface UserDisplayI {
  userId?: string;
  points?: number;
}

const UserDisplay: React.FC<UserDisplayI> = ({ userId, children, points }) => {
  const { profile } = useProfile(userId);
  const userColorString = profile?.userColor || "grey";
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
          {profile ? (
            <>
              <ListItemAvatar>
                <FaceDrawing
                  height="3rem"
                  faceImageNumber={profile.faceImageNumber}
                />
              </ListItemAvatar>
              <ListItemText
                primaryTypographyProps={{ noWrap: true }}
                primary={profile.displayName}
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
