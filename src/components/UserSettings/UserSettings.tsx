import SignInScreen from "@components/SignIn/SignInScreen";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  IconButton,
  FormControlLabel,
  Switch,
} from "@material-ui/core";
import { useFBCtx } from "context/firebase/firebaseCtx";
import { useUserCtx } from "context/user/UserCtx";
import React, { useState } from "react";
import { Form } from "react-final-form";
import SingleClickToSelect from "./SingleClickToSelect";
import ColorPicker from "./ColorPicker";
import DisplayNameInput from "./DisplayNameInput";
import FaceDialog from "./FaceDialog";
import FaceDrawing from "../faces/FaceDrawing";

const UserSettings = () => {
  const { firebase } = useFBCtx();
  const {
    user,
    userState,
    userDispatch,
    userProfile,
    updateUserPrefs,
    handleSignOut,
  } = useUserCtx();

  const userDefaults = { userColor: "grey" };
  const handleCancel = () => userDispatch({ type: "CLOSE_SETTINGS" });
  const onSubmit = async (values) => {
    await updateUserPrefs(values);
    handleCancel();
  };
  const [faceDialogOpen, setFaceDialogOpen] = useState(false);
  return (
    <Dialog
      maxWidth="sm"
      fullWidth
      open={userState.dialogOpen}
      onClose={handleCancel}
    >
      {user ? (
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
                    <Grid item xs={12} sm={6}>
                      <IconButton onClick={() => setFaceDialogOpen(true)}>
                        <FaceDrawing faceImageNumber={values.faceImageNumber} />
                      </IconButton>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <SingleClickToSelect />
                    </Grid>
                  </Grid>
                </DialogContent>
                <DialogActions>
                  <Button onClick={handleSignOut}>sign out</Button>
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
                <FaceDialog
                  open={faceDialogOpen}
                  close={() => setFaceDialogOpen(false)}
                />
                <pre style={{ fontSize: 10 }}>
                  {JSON.stringify(values, null, 2)}
                </pre>
              </form>
            );
          }}
        </Form>
      ) : (
        <DialogContent>
          <SignInScreen />
        </DialogContent>
      )}
    </Dialog>
  );
};

export default UserSettings;
