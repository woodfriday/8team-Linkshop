import React from "react";
import { children } from "react";

const CommonModalMobile = ({ children }) => {
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
          bottom: 0,
          left: 0,
          width: "100%",
          height: "411px",
          backgroundColor: "#ffffff",
          padding: "40px 24px 175px",
          borderRadius: "24px",
        }}
      >
        {children}
      </div>
    </div>
  );
};

export default CommonModalMobile;
