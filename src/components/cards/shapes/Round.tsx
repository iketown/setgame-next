import * as React from "react";

const RoundStripes: React.FC<{
  stroke: string;
  fill: string;
  stripes: boolean;
}> = ({ stroke, fill, stripes }) => {
  return (
    <svg viewBox="0 0 311 155">
      <defs>
        <rect id="round_a" x={0} y={0} width={299} height={143} rx={71.5} />
      </defs>
      <g fill="none" fillRule="evenodd">
        {stripes && (
          <g transform="translate(6 6)">
            <mask id="round_b" fill="#fff">
              <use xlinkHref="#round_a" />
            </mask>
            <g
              mask="url(#round_b)"
              stroke={stroke || "#979797"}
              strokeLinecap="square"
              strokeWidth={7}
            >
              <path d="M20.5 148.519V-1.519M46.2 148.519V-1.519M71.9 148.519V-1.519M97.6 148.519V-1.519M123.3 148.519V-1.519M149 148.519V-1.519M174.7 148.519V-1.519M200.4 148.519V-1.519M226.1 148.519V-1.519M251.8 148.519V-1.519M277.5 148.519V-1.519" />
            </g>
          </g>
        )}
        <rect
          stroke={stroke || "#979797"}
          strokeWidth={10}
          x={6}
          y={6}
          width={299}
          height={143}
          rx={71.5}
          fill={fill || "none"}
          fillRule="evenodd"
        />
      </g>
    </svg>
  );
};

const MemoRoundStripes = React.memo(RoundStripes);
export default MemoRoundStripes;
