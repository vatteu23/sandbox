import React from 'react';

const GrainyBackgroundSVG = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 100 100"
      width="100%"
      height="100%"
    >
      {/* Create multiple transparent rectangles to achieve grainy effect */}
      {[...Array(500)].map((_, i) => (
        <rect
          key={i}
          x={Math.random() * 100}
          y={Math.random() * 100}
          width="1"
          height="1"
          fill="black"
          opacity="0.05" // Adjust opacity as needed
        />
      ))}
    </svg>
  );
}

export default GrainyBackgroundSVG;