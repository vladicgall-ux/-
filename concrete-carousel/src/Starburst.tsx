export const Starburst: React.FC<{ size?: number; color?: string }> = ({
  size = 900,
  color = "#fff200",
}) => {
  const rays = 20;
  const points: string[] = [];
  for (let i = 0; i < rays * 2; i++) {
    const angle = (Math.PI * i) / rays;
    const r = i % 2 === 0 ? size / 2 : size / 2.62;
    const x = 50 + (Math.cos(angle) * r) / (size / 100);
    const y = 50 + (Math.sin(angle) * r) / (size / 100);
    points.push(`${x},${y}`);
  }

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      style={{ position: "absolute" }}
    >
      <polygon points={points.join(" ")} fill={color} opacity={0.22} />
    </svg>
  );
};
