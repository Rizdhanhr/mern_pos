import React from "react";
import { ClipLoader } from "react-spinners";

export default function LoadingOverlay({ isActive, text }) {
  if (!isActive) return null;

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        backgroundColor: "rgba(0, 0, 0, 0.5)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 9999
      }}
    >
      <div style={{ textAlign: "center", color: "#fff" }}>
        <ClipLoader color="#ffffff" size={50} />
        {text &&
          <p style={{ marginTop: "10px" }}>
            {text}
          </p>}
      </div>
    </div>
  );
}
