import * as React from "react";

const Diamond: React.FC<{
  stroke: string;
  fill: string;
  stripes: boolean;
}> = ({ stroke, fill, stripes }) => {
  return (
    <svg viewBox="0 0 325 175">
      <defs>
        <path id="diamond_a" d="M151 0l151 80-151 80L0 80z" />
      </defs>
      <g fill="none" fillRule="evenodd">
        {stripes && (
          <g transform="translate(11 7)">
            <mask id="diamond_b" fill="#fff">
              <use xlinkHref="#diamond_a" />
            </mask>
            <g
              mask="url(#diamond_b)"
              stroke={stroke || "#979797"}
              strokeLinecap="square"
              strokeWidth={7}
            >
              <path d="M21.5 167.459V-1.459M47.2 167.459V-1.459M72.9 167.459V-1.459M98.6 167.459V-1.459M124.3 167.459V-1.459M150 167.459V-1.459M175.7 167.459V-1.459M201.4 167.459V-1.459M227.1 167.459V-1.459M252.8 167.459V-1.459M278.5 167.459V-1.459" />
            </g>
          </g>
        )}
        <path
          stroke={stroke || "#979797"}
          strokeWidth={10}
          d="M162 7l151 80-151 80L11 87z"
          fill={fill || "none"}
          fillRule="evenodd"
        />
      </g>
    </svg>
  );
};

const MemoDiamondStripes = React.memo(Diamond);
export default MemoDiamondStripes;
