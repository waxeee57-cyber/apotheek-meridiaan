import { cn } from "@/lib/utils";
import type { Packaging } from "@/lib/types";

const accents: Record<string, { fill: string; ink: string; wash: string }> = {
  sage: { fill: "#1A5C4E", ink: "#F5F7F4", wash: "#D9E8E1" },
  ice: { fill: "#3D6B78", ink: "#F5F7F4", wash: "#D7E4EA" },
  pollen: { fill: "#6B7A3D", ink: "#F5F7F4", wash: "#E6EBD3" },
  sun: { fill: "#8A6A2A", ink: "#F5F7F4", wash: "#F0E6C9" },
  clay: { fill: "#8A4E3A", ink: "#F5F7F4", wash: "#EBD8D0" },
  dusk: { fill: "#3F4E6B", ink: "#F5F7F4", wash: "#D9DEE8" },
  sand: { fill: "#7A6A4A", ink: "#F5F7F4", wash: "#E8E0D0" },
  terra: { fill: "#8A3A3A", ink: "#F5F7F4", wash: "#EBD3D3" },
};

function palette(accent: string) {
  return accents[accent] ?? accents.sage;
}

export function ProductPackaging({
  packaging,
  accent,
  label,
  className,
}: {
  packaging: Packaging;
  accent: string;
  label: string;
  className?: string;
}) {
  const color = palette(accent);

  return (
    <div
      className={cn(
        "relative flex aspect-square items-center justify-center overflow-hidden",
        className,
      )}
      style={{ background: color.wash }}
      aria-hidden="true"
    >
      <svg viewBox="0 0 160 160" className="size-[78%]">
        {packaging === "blister" ? <Blister color={color} label={label} /> : null}
        {packaging === "bottle" ? <Bottle color={color} label={label} /> : null}
        {packaging === "tube" ? <Tube color={color} label={label} /> : null}
        {packaging === "jar" ? <Jar color={color} label={label} /> : null}
        {packaging === "kit" ? <Kit color={color} label={label} /> : null}
      </svg>
    </div>
  );
}

function Blister({
  color,
  label,
}: {
  color: { fill: string; ink: string };
  label: string;
}) {
  return (
    <g>
      <rect x="38" y="28" width="84" height="104" rx="6" fill="#FBFCFB" stroke={color.fill} strokeWidth="2" />
      <rect x="38" y="28" width="84" height="22" rx="6" fill={color.fill} />
      <rect x="38" y="44" width="84" height="6" fill={color.fill} />
      <text x="80" y="43" textAnchor="middle" fill={color.ink} fontSize="7" fontFamily="ui-sans-serif, system-ui">
        MERIDIAAN
      </text>
      {[0, 1, 2, 3].map((row) =>
        [0, 1, 2].map((col) => (
          <circle
            key={`${row}-${col}`}
            cx={56 + col * 24}
            cy={66 + row * 16}
            r="6"
            fill="#E7EEE9"
            stroke={color.fill}
            strokeWidth="1"
            opacity="0.7"
          />
        )),
      )}
      <text x="80" y="122" textAnchor="middle" fill={color.fill} fontSize="6" fontFamily="ui-sans-serif, system-ui">
        {label.slice(0, 18)}
      </text>
    </g>
  );
}

function Bottle({
  color,
  label,
}: {
  color: { fill: string; ink: string };
  label: string;
}) {
  return (
    <g>
      <rect x="70" y="18" width="20" height="16" rx="3" fill={color.fill} />
      <rect x="74" y="12" width="12" height="10" rx="2" fill="#D5DFD9" />
      <path d="M56 40h48l6 88H50L56 40Z" fill="#F7FBFA" stroke={color.fill} strokeWidth="2" />
      <rect x="62" y="58" width="36" height="42" rx="3" fill={color.fill} />
      <text x="80" y="76" textAnchor="middle" fill={color.ink} fontSize="6" fontFamily="ui-sans-serif, system-ui">
        SPRAY
      </text>
      <text x="80" y="88" textAnchor="middle" fill={color.ink} fontSize="5" fontFamily="ui-sans-serif, system-ui">
        {label.slice(0, 12)}
      </text>
    </g>
  );
}

function Tube({
  color,
  label,
}: {
  color: { fill: string; ink: string };
  label: string;
}) {
  return (
    <g transform="rotate(-18 80 80)">
      <rect x="64" y="18" width="32" height="12" rx="3" fill={color.fill} />
      <path d="M58 30h44v96c0 8-10 14-22 14s-22-6-22-14V30Z" fill="#FBFCFB" stroke={color.fill} strokeWidth="2" />
      <rect x="64" y="48" width="32" height="46" fill={color.fill} />
      <text
        x="80"
        y="74"
        textAnchor="middle"
        fill={color.ink}
        fontSize="6"
        fontFamily="ui-sans-serif, system-ui"
        transform="rotate(90 80 74)"
      >
        {label.slice(0, 14)}
      </text>
    </g>
  );
}

function Jar({
  color,
  label,
}: {
  color: { fill: string; ink: string };
  label: string;
}) {
  return (
    <g>
      <rect x="52" y="28" width="56" height="14" rx="4" fill={color.fill} />
      <rect x="48" y="40" width="64" height="88" rx="10" fill="#FBFCFB" stroke={color.fill} strokeWidth="2" />
      <rect x="58" y="58" width="44" height="48" rx="4" fill={color.fill} />
      <text x="80" y="80" textAnchor="middle" fill={color.ink} fontSize="7" fontFamily="ui-sans-serif, system-ui">
        MERIDIAAN
      </text>
      <text x="80" y="94" textAnchor="middle" fill={color.ink} fontSize="5" fontFamily="ui-sans-serif, system-ui">
        {label.slice(0, 14)}
      </text>
    </g>
  );
}

function Kit({
  color,
  label,
}: {
  color: { fill: string; ink: string };
  label: string;
}) {
  return (
    <g>
      <rect x="30" y="44" width="100" height="72" rx="6" fill="#FBFCFB" stroke={color.fill} strokeWidth="2" />
      <rect x="30" y="44" width="100" height="18" fill={color.fill} />
      <path d="M76 62h8v14h14v8H84v14h-8V84H62v-8h14V62Z" fill={color.fill} />
      <text x="80" y="56" textAnchor="middle" fill={color.ink} fontSize="7" fontFamily="ui-sans-serif, system-ui">
        {label.slice(0, 16)}
      </text>
    </g>
  );
}
