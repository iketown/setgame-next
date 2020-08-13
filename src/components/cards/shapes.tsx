import Diamond from "./shapes/Diamond";
import Round from "./shapes/Round";
import Squig from "./shapes/Squig";

const shapes: {
  [key: string]: React.FC<{
    stroke: string;
    fill: string;
    stripes: boolean;
  }>;
} = {
  d: Diamond,
  r: Round,
  s: Squig,
};

export default shapes;
