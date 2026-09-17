import { claude, uiFont } from "../claudeBrand";

export const WindowChrome: React.FC<{
  title: string;
  width: number;
  height: number;
  children: React.ReactNode;
}> = ({ title, width, height, children }) => {
  return (
    <div
      style={{
        width,
        height,
        backgroundColor: claude.panel,
        borderRadius: 20,
        border: `1px solid rgba(230,195,116,0.35)`,
        boxShadow: "0 0 26px rgba(230,195,116,0.10)",
        overflow: "hidden",
      }}
    >
      <div
        style={{
          height: 44,
          backgroundColor: claude.bg,
          display: "flex",
          alignItems: "center",
          gap: 8,
          padding: "0 16px",
          borderBottom: `1px solid ${claude.border}`,
        }}
      >
        <div style={{ width: 12, height: 12, borderRadius: 999, backgroundColor: "#ff5f57" }} />
        <div style={{ width: 12, height: 12, borderRadius: 999, backgroundColor: "#febc2e" }} />
        <div style={{ width: 12, height: 12, borderRadius: 999, backgroundColor: "#28c840" }} />
        <div
          style={{
            flex: 1,
            display: "flex",
            justifyContent: "center",
            fontFamily: uiFont,
            fontSize: 15,
            color: claude.muted,
            marginRight: 40,
          }}
        >
          {title}
        </div>
      </div>
      <div style={{ width: "100%", height: height - 44 }}>{children}</div>
    </div>
  );
};

export const ClaudeMark: React.FC<{ size?: number }> = ({ size = 22 }) => (
  <div
    style={{
      fontSize: size,
      color: claude.accent,
      lineHeight: 1,
    }}
  >
    ✻
  </div>
);
