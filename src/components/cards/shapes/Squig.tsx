import React from "react";

const SquigStripes: React.FC<{
  stroke: string;
  fill: string;
  stripes: boolean;
}> = ({ stroke, fill, stripes }) => {
  return (
    <svg viewBox="0 0 300 154">
      <defs>
        <path
          d="M72 14C29 17 4 59 1 82c-1.428 10.948-3 47 16 58s42-16 63-24c28.321-10.79 46 0 74 8 25.635 7.324 44 9 73 0 49.406-15.333 77-99 49-118s-34 18-75 23c-62 9-67-18-129-15z"
          id="squig_a"
        />
      </defs>
      <g fill="none" fillRule="evenodd">
        {stripes && (
          <g transform="translate(5 5)">
            <mask id="squig_b" fill="#fff">
              <use xlinkHref="#squig_a" />
            </mask>
            <g
              mask="url(#squig_b)"
              stroke={stroke || "#979797"}
              strokeLinecap="square"
              strokeWidth={7}
            >
              <path d="M16.5 148.522V-.522M42.2 148.522V-.522M67.9 148.522V-.522M93.6 148.522V-.522M119.3 148.522V-.522M145 148.522V-.522M170.7 148.522V-.522M196.4 148.522V-.522M222.1 148.522V-.522M247.8 148.522V-.522M273.5 148.522V-.522" />
            </g>
          </g>
        )}
        <path
          d="M77.788 19.386c-43.005 3-68.007 45.006-71.008 68.009-1.428 10.95-3 47.006 16.002 58.007C41.784 156.404 64.787 129.4 85.79 121.4c28.324-10.79 46.005 0 74.007 8.001 25.638 7.325 44.005 9.001 73.008 0 49.411-15.335 77.008-99.013 49.005-118.015-28.003-19.002-34.003 18.002-75.008 23.003-62.006 9.001-67.007-18.002-129.013-15.002z"
          stroke={stroke || "#979797"}
          strokeWidth={10}
          fill={fill || "none"}
          fillRule="evenodd"
        />
      </g>
    </svg>
  );
};

export default SquigStripes;
