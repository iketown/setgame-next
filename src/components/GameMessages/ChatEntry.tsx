/* eslint-disable @typescript-eslint/ban-ts-comment */
import { Divider, Tooltip, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import moment from "moment";
import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import FaceDrawing from "../faces/FaceDrawing";
import { colorsObj } from "../GameBoard/playerColors";

const useStyles = makeStyles((theme) => ({
  listItem: {
    display: "grid",
    gridTemplateColumns: "[otherFace] 3rem [text] 1fr [meFace] 3rem",
    alignItems: "center",
  },
  listText: {
    // @ts-ignore
    textAlign: (p) => (p.isMe ? "right" : "left"),
  },
  divider: {
    margin: theme.spacing(1),
  },
}));
//
//
const ChatEntry: React.FC<{
  message: string;
  userId: string;
  time: number;
  isMe?: boolean;
  userProfile?: PlayerProfile;
  displayTime?: boolean;
  displayFace?: boolean;
}> = ({ message, time, isMe, userProfile, displayTime, displayFace }) => {
  const [timeString, setTimeString] = useState("");
  const classes = useStyles({ isMe });
  const divRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const initialSecondsAgo = moment
      .duration(moment().diff(moment(time)))
      .asSeconds();
    if (initialSecondsAgo > 60) {
      setTimeString(moment(time).fromNow());
    }
    // update time string every minute
    const interval = setInterval(() => {
      const secondsAgo = moment
        .duration(moment().diff(moment(time)))
        .asSeconds();
      if (secondsAgo > 60) {
        setTimeString(moment(time).fromNow());
      }
    }, 1000 * 60);
    return () => clearInterval(interval);
  }, [time]);

  useEffect(() => {
    // scroll into view when mounted
    if (divRef.current) {
      const parent = divRef.current.parentElement;
      parent.scrollTo({ top: parent.scrollHeight, behavior: "smooth" });
      // divRef.current.parentElement.scrollTo()
      // divRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, []);

  const dotColor = colorsObj[userProfile?.userColor]
    ? colorsObj[userProfile?.userColor].dark
    : undefined;

  return (
    <>
      <div className={classes.listItem} ref={divRef}>
        <div style={{ gridColumn: isMe ? "meFace" : "otherFace" }}>
          <FaceDisplay
            displayFace={displayFace}
            faceImageNumber={userProfile?.faceImageNumber}
            dotColor={dotColor}
            userProfile={userProfile}
          />
        </div>

        <motion.div
          initial={{
            opacity: 0,
            scaleY: 0,
          }}
          animate={{
            opacity: 1,
            scaleY: 1,
            transition: {
              scaleY: { duration: 0.5 },
              opacity: { duration: 1 },
            },
          }}
          style={{
            gridArea: "1 / text",
            padding: "0 5px",
          }}
        >
          <Typography className={classes.listText} variant="body1">
            {message}
          </Typography>

          <div className={classes.listText}>
            {displayTime ? (
              <Typography variant="caption" color="textSecondary">
                {timeString}
              </Typography>
            ) : null}
          </div>
        </motion.div>
      </div>
      {displayTime && <Divider className={classes.divider} />}
    </>
  );
};

export default ChatEntry;

const FaceDisplay: React.FC<{
  faceImageNumber: number;
  displayFace?: boolean;
  dotColor?: string;
  userProfile: PlayerProfile;
}> = ({ faceImageNumber, displayFace, dotColor, userProfile }) => {
  return (
    <Tooltip title={userProfile?.displayName || "?"}>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          width: "3rem",
        }}
      >
        {displayFace ? (
          <FaceDrawing faceImageNumber={faceImageNumber} />
        ) : (
          <div style={{ color: dotColor }}>•</div>
        )}
      </div>
    </Tooltip>
  );
};
