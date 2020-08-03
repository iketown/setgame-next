/* eslint-disable no-underscore-dangle */
import * as React from "react";

function _RoundStripes({
  stroke,
  fill,
  stripes,
}: {
  stroke: string;
  fill: string;
  stripes: boolean;
}) {
  return (
    <svg viewBox="0 0 303 147">
      <defs>
        <rect
          id="prefix__roundA"
          x={0}
          y={0}
          width={299}
          height={143}
          rx={71.5}
        />
      </defs>
      <g fill="none" fillRule="evenodd">
        {stripes && (
          <g transform="translate(2 2)">
            <mask id="prefix__roundB" fill="#fff">
              <use xlinkHref="#prefix__roundA" />
            </mask>
            <g
              mask="url(#prefix__roundB)"
              stroke={stroke || "#979797"}
              strokeLinecap="square"
              strokeWidth={2}
            >
              <path d="M6 188.764V-40.764M15 188.764V-40.764M24 188.764V-40.764M33 188.764V-40.764M42 188.764V-40.764M51 188.764V-40.764M60 188.764V-40.764M69 188.764V-40.764M78 188.764V-40.764M87 188.764V-40.764M96 188.764V-40.764M105 188.764V-40.764M114 188.764V-40.764M123 188.764V-40.764M132 188.764V-40.764M141 188.764V-40.764M150 188.764V-40.764M159 188.764V-40.764M168 188.764V-40.764M177 188.764V-40.764M186 188.764V-40.764M195 188.764V-40.764M204 188.764V-40.764M213 188.764V-40.764M222 188.764V-40.764M231 188.764V-40.764M240 188.764V-40.764M249 188.764V-40.764M258 188.764V-40.764M267 188.764V-40.764M276 188.764V-40.764M285 188.764V-40.764M294 188.764V-40.764" />
            </g>
          </g>
        )}
        <rect
          stroke={stroke || "#979797"}
          strokeWidth={8}
          x={2}
          y={2}
          width={299}
          height={143}
          rx={71.5}
          fill={fill || "none"}
          fillRule="evenodd"
        />
      </g>
    </svg>
  );
}

const RoundeStripes = React.memo(_RoundStripes);
export default RoundeStripes;
