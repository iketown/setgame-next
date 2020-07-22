import * as React from "react";

function _Diamond({
  stroke,
  fill,
  stripes,
}: {
  stroke: string;
  fill: string;
  stripes: boolean;
}) {
  return (
    <svg viewBox="0 0 312 166">
      <defs>
        <path id="diamond_a" d="M151 0l151 80-151 80L0 80z" />
      </defs>
      <g fill="none" fillRule="evenodd">
        {stripes && (
          <g transform="translate(4 2)">
            <mask id="diamond_b" fill="#fff">
              <use xlinkHref="#diamond_a" />
            </mask>
            <g
              mask="url(#diamond_b)"
              stroke={stroke || "#979797"}
              strokeLinecap="square"
              strokeWidth={2}
            >
              <path d="M-2 194.764V-34.764M7 194.764V-34.764M16 194.764V-34.764M25 194.764V-34.764M34 194.764V-34.764M43 194.764V-34.764M52 194.764V-34.764M61 194.764V-34.764M70 194.764V-34.764M79 194.764V-34.764M88 194.764V-34.764M97 194.764V-34.764M106 194.764V-34.764M115 194.764V-34.764M124 194.764V-34.764M133 194.764V-34.764M142 194.764V-34.764M151 194.764V-34.764M160 194.764V-34.764M169 194.764V-34.764M178 194.764V-34.764M187 194.764V-34.764M196 194.764V-34.764M205 194.764V-34.764M214 194.764V-34.764M223 194.764V-34.764M232 194.764V-34.764M241 194.764V-34.764M250 194.764V-34.764M259 194.764V-34.764M268 194.764V-34.764M277 194.764V-34.764M286 194.764V-34.764M295 194.764V-34.764M304 194.764V-34.764" />
            </g>
          </g>
        )}
        <path
          stroke={stroke || "#979797"}
          strokeWidth={6}
          d="M156 3l151 80-151 80L5 83z"
          fill={fill || "none"}
          fillRule="evenodd"
        />
      </g>
    </svg>
  );
}

const Diamond = React.memo(_Diamond);
export default Diamond;
