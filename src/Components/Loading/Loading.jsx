import React from "react";
import './Loading.css';

const LoadingPage = () => {
  const numberOfDots = 8; // Number of dots in the circle

  const dots = Array.from({ length: numberOfDots }).map((_, index) => {
    const angle = (360 / numberOfDots) * index; // Angle for each dot
    const radians = (angle * Math.PI) / 180; // Convert angle to radians
    const x = 50 + 40 * Math.cos(radians); // X-coordinate (center + radius * cos)
    const y = 50 + 40 * Math.sin(radians); // Y-coordinate (center + radius * sin)
    return { x, y, delay: index * 0.15 }; // Position and animation delay
  });

  return (
    <div className="LoadingContainer">
      <div>
        <div className="CircleWrapper">
          {dots.map((dot, index) => (
            <div className="Dot"
              key={index}
              style={{
                top: `${dot.y}%`,
                left: `${dot.x}%`,
                transform: "translate(-50%, -50%)",
              }}
              delay={dot.delay}
            />
          ))}
        </div>
        <p className="LoadingText">Loading...</p>
      </div>
    </div>
  );
};

export default LoadingPage;