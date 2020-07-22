import React from "react";
import {
  ListItem,
  ListItemAvatar,
  ListItemText,
  Avatar,
  Card,
  CircularProgress,
} from "@material-ui/core";
import { colorsObj } from "../GameBoard/playerColors";

interface UserDisplayI {
  user: UserProfile;
}

const UserDisplay: React.FC<UserDisplayI> = ({ user }) => {
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
        <ListItem dense>
          <ListItemAvatar>
            <Avatar style={{ background: med }} />
          </ListItemAvatar>
          <ListItemText primary={user.displayName} />
        </ListItem>
      </Card>
      {/* <pre>{JSON.stringify(user, null, 2)}</pre> */}
    </>
  );
};

export default UserDisplay;
