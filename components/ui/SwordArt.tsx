import type { SwordArt as Art } from "@/lib/products";

/**
 * Wektorowa ilustracja miecza generowana z parametrów produktu.
 * Miecz rysowany pionowo: głowica u góry, sztych na dole.
 */

const FITTINGS: Record<Art["fitting"], { light: string; mid: string; dark: string }> = {
  silver: { light: "#f2f6f9", mid: "#9fb0bd", dark: "#4e5a65" },
  brass: { light: "#f7e3ab", mid: "#c9a04a", dark: "#6d4e18" },
  blued: { light: "#8fa0b4", mid: "#414c5c", dark: "#1a1f28" },
  antique: { light: "#d8cdb6", mid: "#8a7c63", dark: "#3d362a" },
};

function gripLength(ratio: number) {
  if (ratio >= 1.35) return 200;
  if (ratio >= 1.1) return 158;
  if (ratio <= 0.6) return 76;
  return 104;
}

function bladePath(kind: Art["blade"], y0: number, len: number) {
  const cx = 100;
  const tip = y0 + len;
  const at = (t: number) => y0 + len * t;

  switch (kind) {
    case "broad": {
      const w = 20;
      return `M${cx - w} ${y0} L${cx - w + 1} ${at(0.72)} Q${cx - w + 2} ${at(0.88)} ${cx - 4} ${at(0.96)} L${cx} ${tip} L${cx + 4} ${at(0.96)} Q${cx + w - 2} ${at(0.88)} ${cx + w - 1} ${at(0.72)} L${cx + w} ${y0} Z`;
    }
    case "narrow": {
      const w = 14;
      return `M${cx - w} ${y0} Q${cx - w + 1} ${at(0.5)} ${cx - 5} ${at(0.82)} L${cx} ${tip} L${cx + 5} ${at(0.82)} Q${cx + w - 1} ${at(0.5)} ${cx + w} ${y0} Z`;
    }
    case "leaf": {
      const w = 17;
      return `M${cx - w} ${y0} Q${cx - w - 3} ${at(0.32)} ${cx - w - 1} ${at(0.55)} Q${cx - w + 2} ${at(0.86)} ${cx} ${tip} Q${cx + w - 2} ${at(0.86)} ${cx + w + 1} ${at(0.55)} Q${cx + w + 3} ${at(0.32)} ${cx + w} ${y0} Z`;
    }
    case "curved": {
      const w = 15;
      return `M${cx - w} ${y0} Q${cx - w + 4} ${at(0.55)} ${cx - w + 16} ${at(0.92)} L${cx + 2} ${tip} Q${cx + w - 2} ${at(0.7)} ${cx + w} ${at(0.3)} L${cx + w} ${y0} Z`;
    }
    case "falchion": {
      const w = 15;
      return `M${cx - w} ${y0} L${cx - w - 6} ${at(0.62)} Q${cx - w - 10} ${at(0.86)} ${cx - 2} ${tip} L${cx + w + 2} ${at(0.9)} L${cx + w - 1} ${at(0.45)} L${cx + w - 2} ${y0} Z`;
    }
    default: {
      const w = 18;
      return `M${cx - w} ${y0} L${cx - w + 4} ${at(0.62)} Q${cx - w + 7} ${at(0.87)} ${cx} ${tip} Q${cx + w - 7} ${at(0.87)} ${cx + w - 4} ${at(0.62)} L${cx + w} ${y0} Z`;
    }
  }
}

function guardPath(kind: Art["guard"], y: number) {
  const cx = 100;
  const t = 9;
  switch (kind) {
    case "flared":
      return `M${cx - 72} ${y - t - 4} L${cx - 58} ${y - t} L${cx + 58} ${y - t} L${cx + 72} ${y - t - 4} L${cx + 72} ${y + t + 4} L${cx + 58} ${y + t} L${cx - 58} ${y + t} L${cx - 72} ${y + t + 4} Z`;
    case "curved":
      return `M${cx - 74} ${y - t - 12} Q${cx - 30} ${y - t + 2} ${cx} ${y - t} Q${cx + 30} ${y - t + 2} ${cx + 74} ${y - t - 12} L${cx + 74} ${y + 2} Q${cx + 30} ${y + t + 4} ${cx} ${y + t} Q${cx - 30} ${y + t + 4} ${cx - 74} ${y + 2} Z`;
    case "sloped":
      return `M${cx - 70} ${y - t - 14} L${cx - 10} ${y - t} L${cx + 10} ${y - t} L${cx + 70} ${y - t - 14} L${cx + 64} ${y + 2} L${cx + 10} ${y + t} L${cx - 10} ${y + t} L${cx - 64} ${y + 2} Z`;
    case "ring":
      return `M${cx - 34} ${y - t} L${cx + 34} ${y - t} L${cx + 34} ${y + t} L${cx - 34} ${y + t} Z`;
    case "short":
      return `M${cx - 40} ${y - t - 2} L${cx + 40} ${y - t - 2} L${cx + 34} ${y + t + 2} L${cx - 34} ${y + t + 2} Z`;
    default:
      return `M${cx - 68} ${y - t} L${cx + 68} ${y - t} L${cx + 68} ${y + t} L${cx - 68} ${y + t} Z`;
  }
}

function pommelPath(kind: Art["pommel"], y: number) {
  const cx = 100;
  switch (kind) {
    case "brazil":
      return `M${cx - 30} ${y} Q${cx - 26} ${y - 22} ${cx} ${y - 24} Q${cx + 26} ${y - 22} ${cx + 30} ${y} Q${cx + 22} ${y + 18} ${cx} ${y + 20} Q${cx - 22} ${y + 18} ${cx - 30} ${y} Z`;
    case "scent":
      return `M${cx - 13} ${y - 30} L${cx + 13} ${y - 30} L${cx + 17} ${y + 6} L${cx} ${y + 28} L${cx - 17} ${y + 6} Z`;
    case "pear":
      return `M${cx} ${y - 28} Q${cx + 24} ${y - 6} ${cx + 18} ${y + 14} Q${cx + 10} ${y + 30} ${cx} ${y + 30} Q${cx - 10} ${y + 30} ${cx - 18} ${y + 14} Q${cx - 24} ${y - 6} ${cx} ${y - 28} Z`;
    case "lobed":
      return `M${cx - 36} ${y + 14} Q${cx - 34} ${y - 8} ${cx - 18} ${y - 12} Q${cx - 12} ${y - 30} ${cx} ${y - 30} Q${cx + 12} ${y - 30} ${cx + 18} ${y - 12} Q${cx + 34} ${y - 8} ${cx + 36} ${y + 14} Z`;
    case "disc":
      return `M${cx - 24} ${y - 9} L${cx + 24} ${y - 9} L${cx + 24} ${y + 9} L${cx - 24} ${y + 9} Z`;
    default:
      return "";
  }
}

export function SwordArt({
  art,
  className,
  animated = true,
  id,
}: {
  art: Art;
  className?: string;
  animated?: boolean;
  id: string;
}) {
  const fit = FITTINGS[art.fitting];
  const grip = gripLength(art.ratio);

  const pommelY = 46;
  const gripY0 = pommelY + 26;
  const gripY1 = gripY0 + grip;
  const guardY = gripY1 + 10;
  const bladeY0 = guardY + 10;
  const bladeLen = 660 * art.ratio;
  const height = bladeY0 + bladeLen + 24;

  const uid = `sw-${id}`;

  return (
    <svg
      viewBox={`0 0 200 ${Math.round(height)}`}
      className={className}
      role="img"
      aria-label="Ilustracja miecza"
      preserveAspectRatio="xMidYMid meet"
    >
      <defs>
        <linearGradient id={`${uid}-steel`} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#5b6976" />
          <stop offset="14%" stopColor="#e9f0f6" />
          <stop offset="38%" stopColor="#9aa8b5" />
          <stop offset="50%" stopColor="#f6fafd" />
          <stop offset="64%" stopColor="#8d9baa" />
          <stop offset="88%" stopColor="#dde6ee" />
          <stop offset="100%" stopColor="#4d5965" />
        </linearGradient>

        <linearGradient id={`${uid}-fit`} x1="0" y1="0" x2="1" y2="0.3">
          <stop offset="0%" stopColor={fit.dark} />
          <stop offset="30%" stopColor={fit.light} />
          <stop offset="60%" stopColor={fit.mid} />
          <stop offset="100%" stopColor={fit.dark} />
        </linearGradient>

        <linearGradient id={`${uid}-grip`} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#100c0a" />
          <stop offset="35%" stopColor={art.grip} />
          <stop offset="70%" stopColor={art.grip} />
          <stop offset="100%" stopColor="#0d0907" />
        </linearGradient>

        <linearGradient id={`${uid}-glint`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#fff" stopOpacity="0" />
          <stop offset="45%" stopColor="#fff" stopOpacity="0.75" />
          <stop offset="55%" stopColor="#ffe7bd" stopOpacity="0.9" />
          <stop offset="100%" stopColor="#fff" stopOpacity="0" />
        </linearGradient>

        <clipPath id={`${uid}-clip`}>
          <path d={bladePath(art.blade, bladeY0, bladeLen)} />
        </clipPath>
      </defs>

      {/* cień pod bronią */}
      <ellipse
        cx="100"
        cy={height - 10}
        rx="40"
        ry="7"
        fill="#000"
        opacity="0.35"
      />

      {/* głownia */}
      <g>
        <path
          d={bladePath(art.blade, bladeY0, bladeLen)}
          fill={`url(#${uid}-steel)`}
          stroke="rgba(255,255,255,0.35)"
          strokeWidth="0.6"
        />
        {/* zbrocze */}
        {art.blade !== "curved" && art.blade !== "falchion" && (
          <rect
            x="95"
            y={bladeY0 + 6}
            width="10"
            height={bladeLen * 0.62}
            rx="4"
            fill="#000"
            opacity="0.28"
          />
        )}
        {/* refleks przesuwający się po ostrzu */}
        <g clipPath={`url(#${uid}-clip)`}>
          <rect
            className={animated ? "sword-glint sword-glint-idle" : "sword-glint"}
            x="60"
            y={bladeY0}
            width="80"
            height={bladeLen * 0.3}
            fill={`url(#${uid}-glint)`}
          />
        </g>
      </g>

      {/* jelec */}
      <path
        d={guardPath(art.guard, guardY)}
        fill={`url(#${uid}-fit)`}
        stroke="rgba(0,0,0,0.45)"
        strokeWidth="0.8"
      />
      {art.guard === "ring" && (
        <circle
          cx="142"
          cy={guardY + 2}
          r="14"
          fill="none"
          stroke={`url(#${uid}-fit)`}
          strokeWidth="7"
        />
      )}

      {/* rękojeść */}
      <rect
        x="88"
        y={gripY0}
        width="24"
        height={grip}
        rx="9"
        fill={`url(#${uid}-grip)`}
      />
      {Array.from({ length: Math.floor(grip / 14) }).map((_, i) => (
        <line
          key={i}
          x1="88.5"
          y1={gripY0 + 8 + i * 14}
          x2="111.5"
          y2={gripY0 + 3 + i * 14}
          stroke="#000"
          strokeOpacity="0.4"
          strokeWidth="2"
        />
      ))}
      <rect
        x="86"
        y={gripY0 - 3}
        width="28"
        height="8"
        rx="3"
        fill={`url(#${uid}-fit)`}
      />

      {/* głowica */}
      <path
        d={pommelPath(art.pommel, pommelY)}
        fill={`url(#${uid}-fit)`}
        stroke="rgba(0,0,0,0.5)"
        strokeWidth="0.8"
      />
      {art.pommel === "wheel" && (
        <>
          <circle cx="100" cy={pommelY} r="27" fill={`url(#${uid}-fit)`} stroke="rgba(0,0,0,0.5)" strokeWidth="0.8" />
          <circle cx="100" cy={pommelY} r="17" fill="none" stroke="rgba(0,0,0,0.35)" strokeWidth="2.5" />
          <path
            d={`M100 ${pommelY - 12} L100 ${pommelY + 12} M88 ${pommelY} L112 ${pommelY}`}
            stroke="rgba(0,0,0,0.45)"
            strokeWidth="3.5"
            strokeLinecap="round"
          />
        </>
      )}
    </svg>
  );
}

export default SwordArt;
