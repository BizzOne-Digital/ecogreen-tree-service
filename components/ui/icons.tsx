import { Axe, Leaf, Scissors, ShieldCheck, Trash2, TreeDeciduous, Zap, type LucideIcon } from "lucide-react";

const SERVICE_ICON_MAP: Record<string, LucideIcon> = {
  tree: TreeDeciduous, scissors: Scissors, leaf: Leaf, trash: Trash2, zap: Zap, axe: Axe, shield: ShieldCheck,
};

export const serviceIcon = (name: string) => SERVICE_ICON_MAP[name] ?? TreeDeciduous;

export function FacebookIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M24 12a12 12 0 1 0-13.9 11.9v-8.4H7.1V12h3V9.4c0-3 1.8-4.7 4.5-4.7 1.3 0 2.7.2 2.7.2v3h-1.5c-1.5 0-2 .9-2 1.9V12h3.3l-.5 3.5h-2.8v8.4A12 12 0 0 0 24 12Z" />
    </svg>
  );
}

export function HelmetIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
      <path d="M3 17h18M4 17v-2a8 8 0 0 1 16 0v2M10 7.3V12M14 7.3V12M2 17v1a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-1" />
    </svg>
  );
}

/** Row of pine silhouettes used at the edges of CTA banners. */
export function Pines({ className }: { className?: string }) {
  const pine = (x: number, h: number) => {
    const base = 100, w = h * 0.34;
    return `M${x} ${base - h}l${w * 0.6} ${h * 0.4}h${-w * 0.25}l${w * 0.5} ${h * 0.32}h${-w * 0.3}l${w * 0.55} ${h * 0.28}h${-w * 2.2}l${w * 0.55} ${-h * 0.28}h${-w * 0.3}l${w * 0.5} ${-h * 0.32}h${-w * 0.25}Z`;
  };
  return (
    <svg viewBox="0 0 220 100" preserveAspectRatio="xMidYMax meet" className={className} fill="currentColor" aria-hidden="true">
      <path d={[pine(28, 72), pine(70, 96), pine(112, 66), pine(150, 88), pine(192, 60)].join("")} />
    </svg>
  );
}

/** Leafy corner accent from the reference design. */
export function LeafSpray({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 120 150" className={className} aria-hidden="true">
      <path d="M0 8C40 30 70 70 84 140" fill="none" stroke="#5f8f2a" strokeWidth="2" />
      {[[16, 2, 28], [40, 34, 40], [60, 12, 15], [70, 74, 62], [92, 54, 30], [84, 112, 80]].map(([x, y, r]) => (
        <path key={`${x}-${y}`} transform={`translate(${x} ${y}) rotate(${r})`} d="M0 0C14-12 34-10 44 2 30 14 12 14 0 0Z" fill={r > 35 ? "#7cc62e" : "#a6e32d"} />
      ))}
    </svg>
  );
}
