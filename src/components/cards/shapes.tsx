import Diamond from "./shapes/Diamond";
import Round from "./shapes/Round";
import Squig from "./shapes/Squig";

const shapes: {
  [key: string]: React.MemoExoticComponent<
    (props: { stroke: string; fill: string; stripes: boolean }) => JSX.Element
  >;
} = {
  d: Diamond,
  r: Round,
  s: Squig,
};

export default shapes;
