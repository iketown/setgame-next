/* eslint-disable react/no-array-index-key */
import React from "react";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
  IconButton,
} from "@material-ui/core";
import { useField } from "react-final-form";
import styled from "styled-components";
import { useFBCtx } from "@context/firebase/firebaseCtx";
import { useUserCtx } from "@context/user/UserCtx";
import FaceDrawing from "../faces/FaceDrawing";

//
//
const FaceGrid = styled.div`
  display: grid;
  grid-gap: 5px;
  grid-template-columns: repeat(auto-fill, minmax(4rem, 1fr));
  .box img {
    transform: scale(1.1);
    transition: 0.3s transform;
    cursor: pointer;
    :hover {
      transform: scale(1.2);
    }
  }
  .selected {
    border: 1px solid blue;
  }
`;

interface FaceDialogI {
  open: boolean;
  close: () => void;
  onChange: (faceNum: number) => void;
  value?: number;
}
const FaceDialog: React.FC<FaceDialogI> = ({
  open,
  close,
  value,
  onChange,
}) => {
  const handleSelectFace = (faceNum: number) => {
    onChange(faceNum);
    close();
  };
  return (
    <Dialog fullScreen open={open} onClose={close}>
      <DialogTitle>Choose a Face:</DialogTitle>
      <DialogContent>
        <FaceGrid>
          {[...Array(81)].map((_, index) => {
            const isSelected = index === value;
            return (
              <div key={index} className={isSelected ? "selected box" : "box"}>
                <IconButton onClick={() => handleSelectFace(index)}>
                  <FaceDrawing faceImageNumber={index} />
                </IconButton>
              </div>
            );
          })}
        </FaceGrid>
      </DialogContent>
      <DialogActions>
        <Button variant="contained" color="secondary" onClick={close}>
          cancel
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default FaceDialog;

export const FormFaceDialog: React.FC<{
  open: boolean;
  close: () => void;
}> = ({ open, close }) => {
  const {
    input: { value, onChange },
  } = useField("faceImageNumber");
  return <FaceDialog {...{ open, close, value, onChange }} />;
};

export const DirectFaceDialog: React.FC<{
  open: boolean;
  close: () => void;
}> = ({ open, close }) => {
  const { firestore } = useFBCtx();
  const { user, userProfile } = useUserCtx();
  const onChange = (faceImageNumber: number) => {
    if (!user) return;
    firestore.doc(`/users/${user.uid}`).update({ faceImageNumber });
  };
  const value = userProfile?.faceImageNumber;
  return <FaceDialog {...{ open, close, value, onChange }} />;
};
