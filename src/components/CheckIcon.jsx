import React from "react";

const CheckIcon = ({ width = 100, height = 100, className = "" }) => (
  <svg width={width} height={height} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <path d="M50 0C22.3868 0 0 22.3868 0 50C0 77.6132 22.3868 100 50 100C77.6132 100 100 77.6132 100 50C100 22.3868 77.6132 0 50 0ZM50 96.1538C24.3077 96.1538 3.84615 75.6923 3.84615 50C3.84615 24.3077 24.3077 3.84615 50 3.84615C75.6923 3.84615 96.1538 24.3077 96.1538 50C96.1538 75.6923 75.6923 96.1538 50 96.1538Z" fill="#56B280"/>
    <path d="M72.3077 33.8462L43.0769 63.0769L27.6923 47.6923L32.3077 43.0769L43.0769 53.8462L67.6923 29.2308L72.3077 33.8462Z" fill="#56B280"/>
  </svg>
);

export default CheckIcon; 