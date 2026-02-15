import { useMemo } from "react";

const PETAL_COLORS = [
  "hsl(350 60% 65% / 0.3)",
  "hsl(43 76% 48% / 0.25)",
  "hsl(30 70% 60% / 0.2)",
  "hsl(0 60% 70% / 0.25)",
  "hsl(330 50% 60% / 0.2)",
];

const FloatingPetals = () => {
  const petals = useMemo(
    () =>
      Array.from({ length: 18 }, (_, i) => ({
        id: i,
        left: Math.random() * 100,
        delay: Math.random() * 15,
        duration: 10 + Math.random() * 8,
        size: 6 + Math.random() * 10,
        color: PETAL_COLORS[i % PETAL_COLORS.length],
      })),
    []
  );

  return (
    <div className="fixed inset-0 pointer-events-none z-40 overflow-hidden">
      {petals.map((p) => (
        <div
          key={p.id}
          className="absolute rounded-full animate-float-down"
          style={{
            left: `${p.left}%`,
            width: p.size,
            height: p.size,
            backgroundColor: p.color,
            animationDelay: `${p.delay}s`,
            animationDuration: `${p.duration}s`,
            borderRadius: "50% 0 50% 0",
          }}
        />
      ))}
    </div>
  );
};

export default FloatingPetals;
