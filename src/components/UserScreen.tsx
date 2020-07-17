import React, { useState } from "react";
import {
  Card,
  CardActions,
  Button,
  CardContent,
  Grid,
} from "@material-ui/core";
import { useFBCtx } from "../../context/firebaseCtx";
import SignInScreen from "./SignInScreen";
import { AccountCircle } from "@material-ui/icons";
//
//
const UserScreen = () => {
  const [fakeNoUser, setFakeNoUser] = useState(false);
  const { user } = useFBCtx();
  const signedInContent = (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <AccountCircle />
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
