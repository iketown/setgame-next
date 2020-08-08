import React from "react";
import { useField, useForm } from "react-final-form";
import { TextField } from "@material-ui/core";

const DisplayNameInput = () => {
  const { input, meta } = useField("location");

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
