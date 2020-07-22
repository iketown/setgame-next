import React from "react";
import { Form } from "react-final-form";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Typography,
  Grid,
  Button,
} from "@material-ui/core";

import { useGameCtx } from "context/game/GameCtx";
import { useUserCtx } from "context/user/UserCtx";
import MaxCardSelect from "../gameOptions/MaxCardsSelect";
import ColorPicker from "./ColorPicker";
import DisplayNameInput from "./DisplayNameInput";

const UserSettings = () => {
  const { optionsDispatch, optionsState } = useGameCtx();
  const {
    userState,
    userDispatch,
    userProfile,
    updateUserPrefs,
  } = useUserCtx();

  const userDefaults = { userColor: "grey" };
  const handleCancel = () => userDispatch({ type: "CLOSE_SETTINGS" });
  const onSubmit = async (values) => {
    await updateUserPrefs(values);
    handleCancel();
  };
  return (
    <Dialog
      maxWidth="sm"
      fullWidth
      open={userState.dialogOpen}
      onClose={handleCancel}
    >
      <Form
        onSubmit={onSubmit}
        initialValues={{ ...userDefaults, ...userProfile }}
      >
        {({ handleSubmit, values, errors, submitting }) => {
          return (
            <form onSubmit={handleSubmit}>
              <DialogTitle>User Settings</DialogTitle>
              <DialogContent>
                <Grid container spacing={2}>
                  <Grid container item xs={6} sm={4}>
                    <ColorPicker />
                  </Grid>
                  <Grid item xs={6} sm={8}>
                    <DisplayNameInput />
                  </Grid>
                  <Grid item xs={12} sm={6} />
                  <Grid item xs={12} sm={6}>
                    {/* <MaxCardSelect /> */}
                  </Grid>
                </Grid>
              </DialogContent>
              <DialogActions>
                <Button color="secondary" onClick={handleCancel}>
                  cancel
                </Button>
                <Button
                  variant="outlined"
                  disabled={submitting}
                  color="primary"
                  type="submit"
                >
                  save
                </Button>
              </DialogActions>
              <pre style={{ fontSize: 10 }}>
                {JSON.stringify(values, null, 2)}
              </pre>
            </form>
          );
        }}
      </Form>
    </Dialog>
  );
};

export default UserSettings;
