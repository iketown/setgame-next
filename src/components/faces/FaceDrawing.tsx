import React from "react";
import styled from "styled-components";
import { FaRegSmile } from "react-icons/fa";

const FaceDiv = styled.div<{
  faceImageNumber: number | string;
  height: number | string;
}>`
  background-image: url(${(p) => `/images/face_${p.faceImageNumber}.webp`});
  width: ${(p) => p.height};
  height: ${(p) => p.height};
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
`;
interface FaceDrawingI {
  faceImageNumber?: number | string;
  height?: number | string;
  style?: React.CSSProperties;
}

const FaceDrawing: React.FC<FaceDrawingI> = ({
  faceImageNumber,
  height = "3rem",
  style,
}) => {
  if (typeof faceImageNumber !== "number")
    return (
      <FaRegSmile
        size="large"
        style={{
          padding: "5px",
          height,
          width: height,
          fontSize: "2rem",
          color: "grey",
        }}
      />
    );
  return (
    <FaceDiv faceImageNumber={faceImageNumber} height={height} style={style} />
  );
  // return (
  //   <div style={{ height, margin: "3px" }}>
  //     <img
  //       alt={`face ${faceImageNumber}`}
  //       style={{ width: "100%", height: "auto" }}
  //       src={`/images/face_${faceImageNumber}.svg`}
  //     />
  //   </div>
  // );
};

export default FaceDrawing;
