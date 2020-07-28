import FaceDrawing from "@components/faces/FaceDrawing";
import useProfile from "@hooks/useProfile";
import {
  Button,
  CircularProgress,
  ListItem,
  ListItemAvatar,
  ListItemSecondaryAction,
  ListItemText,
} from "@material-ui/core";
import React, { useEffect, useMemo, useState } from "react";
import { FaThumbsUp } from "react-icons/fa";

interface PreGameInvitePlayerListItemI {
  uid: string;
  isPlaying: boolean;
  isInvited: boolean;
  handleClickBtn: () => void;
}

const PreGameInvitePlayerListItem: React.FC<PreGameInvitePlayerListItemI> = ({
  uid,
  isPlaying,
  isInvited,
  handleClickBtn,
}) => {
  const { profile } = useProfile(uid);

  const getButtonContent = () => {
    switch (true) {
      case isPlaying:
        return <FaThumbsUp />;
      case isInvited:
        return <CircularProgress size="1rem" />;
      default:
        return "invite";
    }
  };

  return (
    <ListItem key={uid} style={{ width: "25rem" }}>
      <ListItemAvatar>
        <FaceDrawing faceImageNumber={profile?.faceImageNumber} />
      </ListItemAvatar>
      <ListItemText primary={profile?.displayName} />
      <ListItemSecondaryAction>
        <Button
          onClick={handleClickBtn}
          disabled={isPlaying}
          variant={isPlaying ? "contained" : "outlined"}
        >
          {getButtonContent()}
        </Button>
      </ListItemSecondaryAction>
    </ListItem>
  );
};

export default PreGameInvitePlayerListItem;
