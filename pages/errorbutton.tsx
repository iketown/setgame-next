import React from "react";
import { Button } from "@material-ui/core";

const ErrorButton = () => {
  const handleKaboom = () => {
    // eslint-disable-next-line no-new
    throw new Error("kaboooom!");
  };
  return (
    <div>
      <Button onClick={handleKaboom}>kaboom</Button>
    </div>
  );
};

export default ErrorButton;
