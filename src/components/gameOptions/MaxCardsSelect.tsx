import { useGameCtx } from "@context/game/GameCtx";
import { useGameOptions } from "@hooks/useGameOptions";
import { FormControl, InputLabel, MenuItem, Select } from "@material-ui/core";
import React from "react";

const MaxCardsSelect: React.FC = () => {
  const { optionsState } = useGameCtx();
  const { setOptionValue } = useGameOptions();
  const handleChange = (e) => {
    const maxCards = e.target.value;
    setOptionValue("maxCards", maxCards);
  };
  return (
    <FormControl fullWidth>
      <InputLabel id="demo-simple-select-label">Max Cards</InputLabel>
      <Select
        labelId="demo-simple-select-label"
        id="demo-simple-select"
        value={optionsState.maxCards}
        onChange={handleChange}
      >
        {[12, 15, 18, 21, 24, 27].map((num) => {
          return (
            <MenuItem key={num} value={num}>
              {num || "no maximum"}
            </MenuItem>
          );
        })}
      </Select>
    </FormControl>
  );
};

export default MaxCardsSelect;
