import React, { useState } from "react";
import { useUserCtx } from "@context/user/UserCtx";
import { Chip, Avatar, Grid, Typography } from "@material-ui/core";
import { AnimatePresence, motion } from "framer-motion";
import { DirectFaceDialog } from "../UserSettings/FaceDialog";
//
//
const ProfileTodos: React.FC = () => {
  const { user, userProfile } = useUserCtx();
  const [faceDialogOpen, setFaceDialogOpen] = useState(false);
  if (!user || !userProfile) return null;
  const todoFields = [
    {
      fieldName: "faceImageNumber",
      display: "Avatar",
      onClick: () => setFaceDialogOpen(true),
    },
    // { fieldName: "displayName", display: "Display Name" },
    // { fieldName: "userColor", display: "Player Color" },
  ];
  const todos = todoFields.filter(({ fieldName }) => !userProfile[fieldName]);
  if (!todos.length) return null;
  return (
    <Grid item xs={12}>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          margin: "5px",
        }}
      >
        <Typography variant="caption" color="textSecondary">
          don't forget to set up your:
        </Typography>
        <AnimatePresence>
          {todos.map(
            ({
              display,
              fieldName,
              // eslint-disable-next-line no-console
              onClick = () => console.log("setup", fieldName),
            }) => {
              return (
                <motion.div
                  layout
                  key={fieldName}
                  initial={{ x: 200, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  exit={{ opacity: 0, transition: { duration: 2 } }}
                >
                  <Chip
                    style={{ margin: "0 5px" }}
                    key={fieldName}
                    label={display}
                    avatar={<Avatar>?</Avatar>}
                    onClick={onClick}
                  />
                </motion.div>
              );
            }
          )}
        </AnimatePresence>
        {/* <pre style={{ fontSize: "10px" }}>
        {JSON.stringify(userProfile, null, 2)}
      </pre> */}
      </div>
      <DirectFaceDialog
        open={faceDialogOpen}
        close={() => setFaceDialogOpen(false)}
      />
    </Grid>
  );
};

export default ProfileTodos;
