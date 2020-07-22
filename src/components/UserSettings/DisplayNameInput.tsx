import React from "react";
import { useField, useForm } from "react-final-form";
import { TextField } from "@material-ui/core";

const DisplayNameInput = () => {
  const { input, meta } = useField("displayName");
  return <TextField label="Display Name" fullWidth {...input} />;
};

export default DisplayNameInput;
