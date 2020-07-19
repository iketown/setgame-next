import React, { useState } from "react";
import {
  Card,
  CardActions,
  Button,
  CardContent,
  Grid,
  Avatar,
} from "@material-ui/core";
import { useFBCtx } from "../../context/firebase/firebaseCtx";
import SignInScreen from "./SignInScreen";
import { AccountCircle } from "@material-ui/icons";
//
//
const UserScreen = () => {
  const [fakeNoUser, setFakeNoUser] = useState(false);
  const { user, userProfile } = useFBCtx();
  const signedInContent = (
    <Grid container spacing={2}>
      <Grid
        item
        xs={12}
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          padding: "1rem",
        }}
      >
        <Avatar variant="rounded" style={{ height: "4rem", width: "4rem" }}>
          {userProfile?.photoURL ? (
            <img
              alt={userProfile.displayName}
              width={"100%"}
              src={userProfile.photoURL}
            />
          ) : (
            <AccountCircle />
          )}
        </Avatar>
      </Grid>
    </Grid>
  );
  return (
    <Card style={{ width: 253 }}>
      <div>{user && !fakeNoUser ? signedInContent : <SignInScreen />}</div>
      <CardActions>
        <Button onClick={() => setFakeNoUser((o) => !o)}>fake</Button>
      </CardActions>
    </Card>
  );
};

export default UserScreen;
