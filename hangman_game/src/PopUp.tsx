import React from "react";

type PopupProps = {
  message: string;
};

const Popup: React.FC<PopupProps> = ({ message }) => {
  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        backgroundColor: "rgba(0, 0, 0, 0.5)", // Background overlay
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 999,
      }}
    >
      <div
        style={{
          backgroundColor: "white",
          padding: "2rem",
          borderRadius: "8px",
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
          maxWidth: "400px",
          textAlign: "center",
          position: "relative",
        }}
      >
        <p style={{ margin: "0 0 1rem 0", fontSize: "2.2rem" }}>{message}</p>
      </div>
    </div>
  );
};

export default Popup;
