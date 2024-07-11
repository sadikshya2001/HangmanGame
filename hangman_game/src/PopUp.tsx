import React from "react";

type PopupProps = {
  message: string;
};

const Popup: React.FC<PopupProps> = ({ message }) => {
  return (
    <div
      style={{
        position: "fixed",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        backgroundColor: "white",
        padding: "2rem",
        borderRadius: "8px",
        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
        zIndex: 999,
      }}
    >
      <p>{message}</p>
    </div>
  );
};

export default Popup;
