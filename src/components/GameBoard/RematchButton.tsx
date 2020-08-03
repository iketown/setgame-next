import React, { useCallback } from "react";
import { useTimer } from "react-timer-hook";
import { Button } from "@material-ui/core";
import moment from "moment";
//
//
const RematchButton: React.FC<{
  newGameTime: string;
}> = ({ newGameTime }) => {
  const onExpire = useCallback(() => {
    console.log("times up");
  }, []);
  const { seconds } = useTimer({
    expiryTimestamp: moment(newGameTime).unix(),
    onExpire,
  });
  return <div />;
};

export default RematchButton;
