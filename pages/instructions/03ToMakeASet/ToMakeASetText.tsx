/* eslint-disable react/require-default-props */
import { Box, Typography } from "@material-ui/core";
import React from "react";

import { FullLine, P } from "../typographyElements";

interface ToMakeASetTextProps {
  setter: React.Dispatch<React.SetStateAction<number>>;
  options: string[];
  extraStartText: string;
}
const ToMakeASetText: React.FC<ToMakeASetTextProps> = ({
  setter,
  options,
  extraStartText,
}) => {
  return (
    <FullLine center>
      {extraStartText && <P>{extraStartText}</P>}
      <P>
        a valid <b>SET</b> must be all
      </P>
      {options.map((optionText, optionIndex) => {
        return (
          <Typography variant="h6" component="span" key={optionText}>
            <a href="#" onClick={() => setter(optionIndex)}>
              {optionText}
            </a>
            ,{" "}
          </Typography>
        );
      })}

      <P>
        or{" "}
        <a href="#" onClick={() => setter(3)}>
          one of each
        </a>
        ,
      </P>
      <Box marginTop="2rem" />
    </FullLine>
  );
};

export default ToMakeASetText;
