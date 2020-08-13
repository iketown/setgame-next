import React from "react";
import {
  Dialog,
  DialogContent,
  DialogActions,
  Grid,
  Button,
} from "@material-ui/core";
import { useGame } from "@hooks/useGame";
import { useGameCtx } from "@context/game/GameCtx";
import MaxCardSelect from "./MaxCardsSelect";

const GameOptions = () => {
  const { optionsState, optionsDispatch } = useGameCtx();
  const { setCurrentOptionsAsDefault } = useGame();

  const handleClose = () => optionsDispatch({ type: "CLOSE_DIALOG" });
  return (
    <Dialog
      maxWidth="md"
      fullWidth
      open={optionsState.dialogOpen}
      onClose={handleClose}
    >
      <DialogContent>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <MaxCardSelect />
          </Grid>
          <Grid item xs={12} sm={6} />
          <Grid item xs={12} sm={6} />
          <Grid item xs={12} sm={6} />
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button
          variant="outlined"
          color="primary"
          onClick={setCurrentOptionsAsDefault}
        >
          Save as Default
        </Button>
        <Button variant="contained" color="primary" onClick={handleClose}>
          ok
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default GameOptions;
