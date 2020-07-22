import * as React from "react";

function _SquigStripes({
  stroke,
  fill,
  stripes,
}: {
  stroke: string;
  fill: string;
  stripes: boolean;
}) {
  return (
    <svg viewBox="0 0 291 146">
      <defs>
        <path
          d="M72 14C29 17 4 59 1 82c-1.428 10.948-3 47 16 58s42-16 63-24c28.321-10.79 46 0 74 8 25.635 7.324 44 9 73 0 49.406-15.333 77-99 49-118s-34 18-75 23c-62 9-67-18-129-15z"
          id="prefix__SquigA"
        />
      </defs>
      <g fill="none" fillRule="evenodd">
        {stripes && (
          <g transform="translate(2 1)">
            <mask id="prefix__SquigB" fill="#fff">
              <use xlinkHref="#prefix__SquigA" />
            </mask>
            <g
              mask="url(#prefix__SquigB)"
              stroke={stroke || "#979797"}
              strokeLinecap="square"
              strokeWidth={2}
            >
              <path d="M0 186.764V-42.764M9 186.764V-42.764M18 186.764V-42.764M27 186.764V-42.764M36 186.764V-42.764M45 186.764V-42.764M54 186.764V-42.764M63 186.764V-42.764M72 186.764V-42.764M81 186.764V-42.764M90 186.764V-42.764M99 186.764V-42.764M108 186.764V-42.764M117 186.764V-42.764M126 186.764V-42.764M135 186.764V-42.764M144 186.764V-42.764M153 186.764V-42.764M162 186.764V-42.764M171 186.764V-42.764M180 186.764V-42.764M189 186.764V-42.764M198 186.764V-42.764M207 186.764V-42.764M216 186.764V-42.764M225 186.764V-42.764M234 186.764V-42.764M243 186.764V-42.764M252 186.764V-42.764M261 186.764V-42.764M270 186.764V-42.764M279 186.764V-42.764M288 186.764V-42.764" />
            </g>
          </g>
        )}
        <path
          d="M73.788 15.386c-43.005 3-68.007 45.006-71.008 68.009-1.428 10.95-3 47.006 16.002 58.007C37.784 152.404 60.787 125.4 81.79 117.4c28.324-10.79 46.005 0 74.007 8.001 25.638 7.325 44.005 9.001 73.008 0 49.411-15.335 77.008-99.013 49.005-118.015-28.003-19.002-34.003 18.002-75.008 23.003-62.006 9.001-67.007-18.002-129.013-15.002z"
          stroke={stroke || "#979797"}
          strokeWidth={4}
          fill={fill || "none"}
          fillRule="evenodd"
        />
      </g>
    </svg>
  );
}

const SquigStripes = React.memo(_SquigStripes);
export default SquigStripes;
