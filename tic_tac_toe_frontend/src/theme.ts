export const Theme = {
  primary: "#2563EB", // Blue
  secondary: "#F59E0B", // Amber
  success: "#10B981",
  error: "#EF4444",
  gradientFrom: "rgba(37, 99, 235, 0.10)", // blue-500/10
  gradientTo: "#F9FAFB", // gray-50
  background: "#F9FAFB",
  surface: "#FFFFFF",
  text: "#111827",
  muted: "#6B7280",
  border: "rgba(17, 24, 39, 0.08)",
  shadow: "0 10px 25px rgba(0, 0, 0, 0.06)",
};

export const oceanBackground: React.CSSProperties = {
  minHeight: "100%",
  width: "100%",
  background: `linear-gradient(135deg, ${Theme.gradientFrom}, ${Theme.gradientTo})`,
};

export const cardSurface: React.CSSProperties = {
  background: Theme.surface,
  borderRadius: 16,
  boxShadow: Theme.shadow,
  border: `1px solid ${Theme.border}`,
};
