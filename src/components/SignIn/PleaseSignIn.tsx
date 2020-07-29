import React from "react";
import { Container, Typography, Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { useUserCtx } from "@context/user/UserCtx";

const useStyles = makeStyles(() => ({
  root: {
    textAlign: "center",
    padding: "auto",
    margin: "10vh auto",
  },
  signInButton: {
    margin: "2rem",
  },
}));

const PleaseSignIn: React.FC = () => {
  const classes = useStyles();
  const { userDispatch, userState } = useUserCtx();
  const isOpen = userState.dialogOpen;

  return (
    <Container maxWidth="sm" className={classes.root}>
      <Typography variant="h3">Please sign in</Typography>

      {!isOpen && (
        <Button
          size="large"
          variant="contained"
          color="primary"
          onClick={() => userDispatch({ type: "OPEN_SETTINGS" })}
          className={classes.signInButton}
        >
          Sign In
        </Button>
      )}
      <Typography color="textSecondary" variant="subtitle1">
        to continue
      </Typography>
    </Container>
  );
};

export default PleaseSignIn;
