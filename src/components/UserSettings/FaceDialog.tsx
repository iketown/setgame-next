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
import FaceDrawing from "../faces/FaceDrawing";

interface FaceDialogI {
  open: boolean;
  close: () => void;
}

const FaceGrid = styled.div`
  border: 1px solid orange;
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

const FaceDialog: React.FC<FaceDialogI> = ({ open, close }) => {
  const {
    input: { value, onChange },
  } = useField("faceImageNumber");
  const handleSelectFace = (faceNum: number) => {
    onChange(faceNum);
    close();
  };
  return (
    <Dialog fullScreen open={open} onClose={close}>
      <DialogTitle>title</DialogTitle>
      <DialogContent>
        <FaceGrid>
          {[...Array(80)].map((_, index) => {
            const isSelected = index + 1 === value;
            return (
              <div key={index} className={isSelected ? "selected box" : "box"}>
                <IconButton onClick={() => handleSelectFace(index + 1)}>
                  <FaceDrawing faceImageNumber={index + 1} />
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