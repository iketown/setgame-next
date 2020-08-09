import React from "react";
import { useField } from "react-final-form";
import { TextField } from "@material-ui/core";

const DisplayNameInput: React.FC = () => {
  const { input } = useField("location");

  return (
    <TextField
      label="Location"
      placeholder="city and/or country"
      fullWidth
      {...input}
    />
  );
};

export default DisplayNameInput;
