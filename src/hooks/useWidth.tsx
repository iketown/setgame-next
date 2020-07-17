import { useTheme, Theme } from "@material-ui/core/styles";
import { useMediaQuery } from "@material-ui/core";
import { Breakpoint } from "@material-ui/core/styles/createBreakpoints";
type BreakpointOrNull = Breakpoint | null;
//
//
function useWidth() {
  const theme: Theme = useTheme();
  const keys: Breakpoint[] = [...theme.breakpoints.keys].reverse();
  return (
    keys.reduce((output: BreakpointOrNull, key: Breakpoint) => {
      // eslint-disable-next-line react-hooks/rules-of-hooks
      const matches = useMediaQuery(theme.breakpoints.up(key));
      return !output && matches ? key : output;
    }, null) || "xs"
  );
}

export default useWidth;
