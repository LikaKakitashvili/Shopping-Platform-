import React from "react";

const LineIcon = ({ width = "100%", height = 1, className = "" }) => (
  <svg width={width} height={height} viewBox="0 0 100 1" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <line x1="0" y1="0.5" x2="100" y2="0.5" stroke="#E0E0E0" strokeWidth="1"/>
  </svg>
);

export default LineIcon; 