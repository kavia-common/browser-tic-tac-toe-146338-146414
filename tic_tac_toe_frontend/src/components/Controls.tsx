import React from "react";
import { Theme, cardSurface } from "../theme";

export interface ControlsProps {
  onRestart: () => void;
  disabled?: boolean;
}

const btn: React.CSSProperties = {
  padding: "10px 16px",
  borderRadius: 12,
  border: "none",
  fontWeight: 700,
  cursor: "pointer",
  transition: "transform 160ms ease, box-shadow 160ms ease, background 160ms ease",
  boxShadow: "0 8px 18px rgba(37, 99, 235, 0.25)",
  color: "white",
  background: `linear-gradient(135deg, ${Theme.primary}, #1D4ED8)`,
};

export const Controls: React.FC<ControlsProps> = ({ onRestart, disabled }) => {
  return (
    <div style={{ ...cardSurface, padding: 16, display: "flex", justifyContent: "center" }}>
      <button
        aria-label="restart"
        title="Restart game"
        onClick={onRestart}
        disabled={disabled}
        style={{
          ...btn,
          opacity: disabled ? 0.6 : 1,
          cursor: disabled ? "default" : "pointer",
        }}
      >
        ⟳ Restart
      </button>
    </div>
  );
};
