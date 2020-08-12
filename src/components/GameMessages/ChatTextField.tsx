import Fab from "@material-ui/core/Fab";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import SendIcon from "@material-ui/icons/Send";
import React, { useState } from "react";
import { useUserCtx } from "@context/user/UserCtx";

const useStyles = makeStyles((theme) => ({
  card: {
    marginTop: theme.spacing(2),
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
}));

const ChatTextField: React.FC<{
  onSubmit: ({ message, userId }: { message: string; userId: string }) => void;
}> = ({ onSubmit }) => {
  const { user } = useUserCtx();
  const classes = useStyles();
  const [message, setMessage] = useState("");
  const handleSubmit = () => {
    if (!message || !user?.uid) return;
    onSubmit({ message, userId: user.uid });
    setMessage("");
  };
  if (!user?.uid) return null;
  return (
    <section className={classes.chatInput}>
      <div className={classes.chatTextField}>
        <TextField
          value={message}
          onKeyUp={(e) => {
            if (e.key === "Enter") handleSubmit();
          }}
          onChange={(e) => {
            setMessage(e.target.value);
          }}
          fullWidth
          placeholder="...message"
        />
      </div>
      <div className={classes.chatSendButton}>
        <Fab onClick={handleSubmit} color="primary" aria-label="add">
          <SendIcon />
        </Fab>
      </div>
    </section>
  );
};

export default ChatTextField;
