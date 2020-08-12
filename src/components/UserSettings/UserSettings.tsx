import SignInScreen from "@components/SignIn/SignInScreen";
import { useUserCtx } from "@context/user/UserCtx";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  IconButton,
  Typography,
} from "@material-ui/core";
import { FaTimes } from "react-icons/fa";
import React, { useState } from "react";
import { Form } from "react-final-form";
import FaceDrawing from "../faces/FaceDrawing";
import ColorPicker from "./ColorPicker";
import DisplayNameInput from "./DisplayNameInput";
import LocationInput from "./LocationInput";
import { FormFaceDialog } from "./FaceDialog";

const UserSettings: React.FC = () => {
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
      aria-labelledby="user-settings-dialog"
      onClose={handleCancel}
    >
      {user ? (
        <Form
          onSubmit={onSubmit}
          initialValues={{ ...userDefaults, ...userProfile }}
        >
          {({ handleSubmit, values, submitting }) => {
            return (
              <form onSubmit={handleSubmit}>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    padding: "0 8px 0 0",
                  }}
                >
                  <DialogTitle disableTypography id="user-settings-dialog">
                    <Typography variant="h6">User Settings</Typography>
                  </DialogTitle>
                  <IconButton onClick={handleCancel}>
                    <FaTimes />
                  </IconButton>
                </div>
                <DialogContent>
                  <Grid container spacing={2}>
                    <Grid container item xs={6} sm={4}>
                      <ColorPicker />
                    </Grid>
                    <Grid item xs={6} sm={8}>
                      <DisplayNameInput />
                    </Grid>
                    <Grid item xs={12} sm={4}>
                      <Typography
                        display="block"
                        variant="caption"
                        color="textSecondary"
                      >
                        Face:
                      </Typography>
                      <IconButton onClick={() => setFaceDialogOpen(true)}>
                        <FaceDrawing faceImageNumber={values.faceImageNumber} />
                      </IconButton>
                    </Grid>
                    <Grid item xs={12} sm={8}>
                      <LocationInput />
                    </Grid>
                  </Grid>
                </DialogContent>
                <DialogActions>
                  <Button onClick={handleSignOut}>sign out</Button>

                  <Button
                    variant="outlined"
                    disabled={submitting}
                    color="primary"
                    type="submit"
                  >
                    save
                  </Button>
                </DialogActions>
                <FormFaceDialog
                  open={faceDialogOpen}
                  close={() => setFaceDialogOpen(false)}
                />
                {process.env.NODE_ENV === "development" && (
                  <pre style={{ fontSize: 10 }}>
                    {JSON.stringify(values, null, 2)}
                  </pre>
                )}
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
