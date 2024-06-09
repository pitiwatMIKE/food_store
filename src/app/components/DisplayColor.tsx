import React from "react";

interface DisplayColorProps {
  colorCode: string;
  size: number;
}

export default function DisplayColor({ colorCode, size }: DisplayColorProps) {
  const circleStyle = {
    backgroundColor: colorCode,
    width: size,
    height: size,
    borderRadius: "50%",
  };

  return <div style={circleStyle}></div>;
}
