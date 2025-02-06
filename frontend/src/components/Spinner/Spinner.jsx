import React from "react";

const Spinner = ({second,w}) => {
  const containerStyle = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: `${second}vh`, 
  }

  const spinnerStyle = {
    width: `${w}px`,
    height: `${w}px`,
    border: "5px solid rgba(0, 0, 0, 0.1)", 
    borderTop: "5px solid #0058ca", 
    borderRadius: "50%",
    animation: "spin 1s linear infinite",
  };

  const spinKeyframes = `
    @keyframes spin {
      0% {
        transform: rotate(0deg);
      }
      100% {
        transform: rotate(360deg);
      }
    }
  `;

  
  if (!document.getElementById("spin-keyframes")) {
    const style = document.createElement("style");
    style.id = "spin-keyframes";
    style.innerHTML = spinKeyframes;
    document.head.appendChild(style);
  }

  return (
    <div style={containerStyle}>
      <div style={spinnerStyle}></div>
    </div>
  );
};

export default Spinner;
