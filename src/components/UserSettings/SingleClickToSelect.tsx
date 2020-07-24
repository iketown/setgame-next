import React from "react";
import { FormControlLabel, Switch } from "@material-ui/core";
import { useField } from "react-final-form";
//
//
const SingleClickToSelect = () => {
  const { input } = useField("singleClickToSelect");
  return (
    <FormControlLabel
      control={
        <Switch
          checked={input.value}
          onChange={(e, chk) => input.onChange(chk)}
          name="checkedA"
        />
      }
      label="Single Click To Select"
    />
  );
};

export default SingleClickToSelect;
