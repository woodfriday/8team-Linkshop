import React from "react";
import { children } from "react";

const CommonModal = ({ children }) => {
  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        backgroundColor: "rgba(0, 0, 0, 0.5)",
      }}
    >
      <div
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          backgroundColor: "#ffffff",
          padding: "25px 24px 64px",
          borderRadius: "24px",
          width: "375px",
          height: "300px",
        }}
      >
        {children}
      </div>
    </div>
  );
};

export default CommonModal;
