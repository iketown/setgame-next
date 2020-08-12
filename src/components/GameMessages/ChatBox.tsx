import { useFBCtx } from "@context/firebase/firebaseCtx";
import { useUserCtx } from "@context/user/UserCtx";
import { useUserProfiles } from "@hooks/useUserProfiles";
import { Card, CardActions, CardHeader, List } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import moment from "moment";
import { useRouter } from "next/router";
import React, { useEffect, useMemo, useState } from "react";

import ChatEntry from "./ChatEntry";
import ChatTextField from "./ChatTextField";

//
//
const useStyles = makeStyles((theme) => ({
  card: {
    marginTop: theme.spacing(2),
    maxWidth: "35rem",
    width: "100%",
  },
  chatHeader: {
    textAlign: "left",
  },
  chatInput: {
    display: "flex",
    width: "100%",
    alignItems: "center",
  },
  chatSendButton: {
    margin: theme.spacing(1),
  },
  chatTextField: {
    padding: theme.spacing(1),
    width: "100%",
  },
  messageList: {
    maxHeight: "15rem",
    overflow: "scroll",
    padding: "1rem",
  },
}));

type ServerMessage = { message: string; time: number; userId: string };
type ServerMessages = {
  [messageId: string]: ServerMessage;
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const Chat: React.FC<{ allowStrangers?: boolean }> = ({ allowStrangers }) => {
  const { query } = useRouter();
  const { user } = useUserCtx();
  const gameId = query.gameId as string;
  const classes = useStyles();
  const { setUserIds, userIds: profileIds, userProfiles } = useUserProfiles();
  const { db } = useFBCtx();
  const [messages, setMessages] = useState<[string, ServerMessage][]>([]);

  const chatRef = useMemo(() => {
    return db.ref(`/chats/${gameId}`);
  }, [gameId]);

  useEffect(() => {
    chatRef.on("value", (snap) => {
      if (!snap.exists()) return;
      const {
        messages: serverMsgs,
        userIds,
      }: {
        messages: ServerMessages;
        userIds: { [userId: string]: boolean };
      } = snap.val();
      if (serverMsgs) {
        const orderedMsgs = Object.entries(serverMsgs).sort(
          // eslint-disable-next-line @typescript-eslint/no-unused-vars
          ([idA, { time: timeA }], [idB, { time: timeB }]) => timeA - timeB
        );
        setMessages(orderedMsgs);
      }
      if (userIds) {
        setUserIds(Object.keys(userIds));
      }
    });
    return () => chatRef.off();
  }, [chatRef]);

  const handleSubmitMessage = ({
    message,
    userId,
  }: {
    message: string;
    userId: string;
  }) => {
    const time = moment().valueOf();
    if (!profileIds.includes(userId)) {
      chatRef.child("userIds").update({ [userId]: true });
    }
    chatRef.child("messages").push({ time, userId, message });
  };
  return (
    <>
      <Card className={classes.card}>
        <CardHeader title="Chat" className={classes.chatHeader} />
        <List className={classes.messageList} dense>
          {messages.map(([messageId, messageObj], index, arr) => {
            const nextSenderId = arr[index + 1] && arr[index + 1][1].userId;
            const prevSenderId = arr[index - 1] && arr[index - 1][1].userId;
            const displayTime =
              !nextSenderId || nextSenderId !== messageObj.userId;
            const displayFace =
              !prevSenderId || prevSenderId !== messageObj.userId;
            const isMe = messageObj.userId === user.uid;
            const userProfile = userProfiles && userProfiles[messageObj.userId];
            return (
              <ChatEntry
                {...messageObj}
                {...{ isMe, userProfile, displayTime, displayFace }}
                key={messageId}
              />
            );
          })}
        </List>
        <CardActions>
          <ChatTextField onSubmit={handleSubmitMessage} />
        </CardActions>
      </Card>
      {/* <pre>{JSON.stringify(playerProfiles, null, 2)}</pre>
      <pre>{JSON.stringify(userProfiles, null, 2)}</pre> */}
    </>
  );
};

export default Chat;
