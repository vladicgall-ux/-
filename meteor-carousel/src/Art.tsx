import { AbsoluteFill } from "remotion";
import { theme } from "./brand";
import { fontFamily } from "./fonts";

/** Shared gradient/filter set so every drawing burns with the same light. */
const Defs: React.FC = () => (
  <defs>
    <linearGradient id="trail" x1="1080" y1="0" x2="60" y2="560">
      <stop offset="0%" stopColor={theme.hot} stopOpacity="0.95" />
      <stop offset="34%" stopColor={theme.accent} stopOpacity="0.7" />
      <stop offset="100%" stopColor={theme.accent} stopOpacity="0" />
    </linearGradient>
    <radialGradient id="head">
      <stop offset="0%" stopColor="#ffffff" />
      <stop offset="26%" stopColor={theme.hot} />
      <stop offset="58%" stopColor={theme.accent} stopOpacity="0.8" />
      <stop offset="100%" stopColor={theme.accent} stopOpacity="0" />
    </radialGradient>
    <radialGradient id="rock">
      <stop offset="0%" stopColor="#56606e" />
      <stop offset="62%" stopColor="#2b323d" />
      <stop offset="100%" stopColor="#131820" />
    </radialGradient>
    <filter id="soft" x="-60%" y="-60%" width="220%" height="220%">
      <feGaussianBlur stdDeviation="16" />
    </filter>
  </defs>
);

/**
 * Every drawing lives in the upper half and hands the lower half to the
 * type. The scrim is what enforces it: whatever the art does below the
 * waist sinks into the sky, so one set of text rules works on all seven.
 */
const Canvas: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <>
    <AbsoluteFill style={{ zIndex: 5 }}>
      <svg
        viewBox="0 0 1080 1080"
        style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}
      >
        <Defs />
        {children}
      </svg>
    </AbsoluteFill>
    <AbsoluteFill
      style={{
        zIndex: 8,
        background:
          "linear-gradient(180deg, rgba(3,6,14,0) 34%, rgba(3,6,14,0.72) 50%, rgba(2,4,9,0.95) 64%, rgba(2,4,9,0.99) 100%)",
      }}
    />
  </>
);

const tx = {
  fontFamily,
  fontWeight: 900,
} as const;

/* ---- 01 the trail ----------------------------------------------------- */

export const ArtTrail: React.FC = () => (
  <Canvas>
    {/* the smoke column left behind, drawn twice for a soft outer bloom */}
    <path
      d="M1000 168 C 856 244, 690 316, 470 384 C 330 428, 210 452, 96 466"
      stroke="url(#trail)"
      strokeWidth="76"
      strokeLinecap="round"
      fill="none"
      opacity="0.32"
      filter="url(#soft)"
    />
    <path
      d="M1000 168 C 856 244, 690 316, 470 384 C 330 428, 210 452, 96 466"
      stroke="url(#trail)"
      strokeWidth="22"
      strokeLinecap="round"
      fill="none"
    />
    <path
      d="M1000 168 C 856 244, 690 316, 470 384 C 330 428, 210 452, 96 466"
      stroke={theme.hot}
      strokeWidth="6"
      strokeLinecap="round"
      fill="none"
      opacity="0.55"
    />
    {/* the head, still burning */}
    <circle cx="998" cy="166" r="150" fill="url(#head)" opacity="0.75" />
    <circle cx="998" cy="166" r="44" fill="#ffffff" opacity="0.95" />

    {/* the city below: a flat skyline, unaware */}
    <g opacity="0.55">
      <rect x="0" y="560" width="1080" height="4" fill={theme.cold} opacity="0.5" />
      {[
        [40, 78, 54],
        [104, 44, 92],
        [156, 96, 38],
        [262, 62, 70],
        [332, 40, 110],
        [382, 88, 46],
        [486, 54, 84],
        [552, 72, 60],
        [636, 46, 104],
        [694, 92, 40],
        [800, 58, 76],
        [872, 80, 52],
        [960, 50, 96],
        [1022, 58, 44],
      ].map(([x, w, h], i) => (
        <rect
          key={i}
          x={x}
          y={560 - h}
          width={w}
          height={h}
          fill="#0a1020"
          stroke={theme.cold}
          strokeWidth="2"
          strokeOpacity="0.55"
        />
      ))}
    </g>
  </Canvas>
);

/* ---- 02 the object, to scale ------------------------------------------ */

export const ArtRock: React.FC = () => (
  <Canvas>
    <circle cx="668" cy="290" r="230" fill="url(#head)" opacity="0.3" />
    <circle cx="668" cy="290" r="162" fill="url(#rock)" stroke={theme.border} strokeWidth="3" />
    {/* craters */}
    <ellipse cx="624" cy="246" rx="33" ry="25" fill="#0f141c" opacity="0.8" />
    <ellipse cx="726" cy="312" rx="23" ry="18" fill="#0f141c" opacity="0.7" />
    <ellipse cx="640" cy="350" rx="16" ry="12" fill="#0f141c" opacity="0.65" />
    {/* the lit limb, facing the direction of travel */}
    <path
      d="M668 128 A 162 162 0 0 1 784 376"
      stroke={theme.accent}
      strokeWidth="10"
      fill="none"
      opacity="0.85"
      strokeLinecap="round"
    />
    {/* dimension line across the rock */}
    <line x1="506" y1="470" x2="830" y2="470" stroke={theme.accent} strokeWidth="4" />
    <line x1="506" y1="452" x2="506" y2="488" stroke={theme.accent} strokeWidth="4" />
    <line x1="830" y1="452" x2="830" y2="488" stroke={theme.accent} strokeWidth="4" />

    {/* scale bar against a six-storey block */}
    <g>
      <rect x="248" y="302" width="86" height="168" fill="#0a1020" stroke={theme.cold} strokeWidth="2" />
      {Array.from({ length: 6 }).map((_, r) =>
        Array.from({ length: 3 }).map((__, c) => (
          <rect
            key={`${r}-${c}`}
            x={258 + c * 25}
            y={316 + r * 26}
            width="14"
            height="13"
            fill={theme.cold}
            opacity="0.4"
          />
        )),
      )}
      <line x1="248" y1="470" x2="334" y2="470" stroke={theme.cold} strokeWidth="4" />
      <text x="212" y="508" fill={theme.muted} fontSize="21" letterSpacing="3" {...tx}>
        ДОМ, 6 ЭТАЖЕЙ
      </text>
    </g>
  </Canvas>
);

/* ---- 03 entry speed and angle ----------------------------------------- */

export const ArtEntry: React.FC = () => (
  <Canvas>
    {/* the planet's edge */}
    <path
      d="M-140 624 A 900 900 0 0 1 1220 624"
      stroke={theme.cold}
      strokeWidth="5"
      fill="none"
      opacity="0.6"
    />
    <path
      d="M-140 624 A 900 900 0 0 1 1220 624 L 1220 1080 L -140 1080 Z"
      fill="#060c1a"
      opacity="0.85"
    />
    {/* atmosphere shell */}
    <path
      d="M-140 476 A 1040 1040 0 0 1 1220 476"
      stroke={theme.cold}
      strokeWidth="2"
      strokeDasharray="12 14"
      fill="none"
      opacity="0.45"
    />
    <text x="56" y="256" fill={theme.muted} fontSize="20" letterSpacing="5" {...tx}>
      ГРАНИЦА АТМОСФЕРЫ
    </text>
    <line x1="56" y1="276" x2="56" y2="368" stroke={theme.cold} strokeWidth="2" opacity="0.5" />

    {/* the shallow entry path — about 18 degrees to the horizon */}
    <path
      d="M1034 134 L 268 416"
      stroke={theme.accent}
      strokeWidth="42"
      strokeLinecap="round"
      opacity="0.22"
      filter="url(#soft)"
    />
    <path d="M1034 134 L 268 416" stroke="url(#trail)" strokeWidth="14" strokeLinecap="round" />
    <circle cx="272" cy="414" r="74" fill="url(#head)" />
    <circle cx="272" cy="414" r="22" fill="#ffffff" />

    {/* the angle, called out where the path meets the horizontal */}
    <path d="M268 416 L 760 416" stroke={theme.cold} strokeWidth="3" strokeDasharray="10 10" opacity="0.6" />
    <path
      d="M452 416 A 184 184 0 0 0 444 342"
      stroke={theme.accentLight}
      strokeWidth="4"
      fill="none"
    />
    <text x="478" y="390" fill={theme.accentLight} fontSize="30" letterSpacing="2" {...tx}>
      ~18°
    </text>
  </Canvas>
);

/* ---- 04 the airburst --------------------------------------------------- */

export const ArtBurst: React.FC = () => (
  <Canvas>
    {/* ground */}
    <rect x="0" y="536" width="1080" height="6" fill={theme.cold} opacity="0.5" />
    {/* altitude scale */}
    <line x1="120" y1="536" x2="120" y2="164" stroke={theme.border} strokeWidth="3" />
    {[
      [536, "0"],
      [444, "10"],
      [352, "20"],
      [260, "30"],
    ].map(([y, l], i) => (
      <g key={i}>
        <line x1="104" y1={y as number} x2="136" y2={y as number} stroke={theme.border} strokeWidth="3" />
        <text x="64" y={(y as number) + 9} fill={theme.muted} fontSize="22" {...tx}>
          {l}
        </text>
      </g>
    ))}
    <text x="52" y="146" fill={theme.muted} fontSize="20" letterSpacing="4" {...tx}>
      КМ
    </text>

    {/* the burst itself, at 23 km */}
    {[276, 208, 146, 88].map((r, i) => (
      <circle
        key={i}
        cx="648"
        cy="324"
        r={r}
        fill="none"
        stroke={theme.accent}
        strokeWidth={4 + i * 2}
        opacity={0.16 + i * 0.16}
      />
    ))}
    <circle cx="648" cy="324" r="220" fill="url(#head)" opacity="0.6" />
    <circle cx="648" cy="324" r="58" fill="#ffffff" />

    <line x1="120" y1="324" x2="586" y2="324" stroke={theme.accent} strokeWidth="3" strokeDasharray="12 10" />
    <text x="150" y="300" fill={theme.accentLight} fontSize="30" letterSpacing="3" {...tx}>
      23 КМ
    </text>
  </Canvas>
);

/* ---- 05 the shockwave over the city ------------------------------------ */

export const ArtCity: React.FC = () => (
  <Canvas>
    {/* the pressure front, arriving from above right */}
    {[470, 380, 298, 228].map((r, i) => (
      <circle
        key={i}
        cx="784"
        cy="96"
        r={r}
        fill="none"
        stroke={theme.accent}
        strokeWidth="5"
        opacity={0.5 - i * 0.09}
      />
    ))}

    {/* a block of windows; the shattered ones are marked, not decorated */}
    <g>
      {Array.from({ length: 5 }).map((_, row) =>
        Array.from({ length: 9 }).map((__, col) => {
          const broken = (row * 9 + col) % 3 === 0;
          const x = 148 + col * 88;
          const y = 248 + row * 62;
          return (
            <g key={`${row}-${col}`}>
              <rect
                x={x}
                y={y}
                width="62"
                height="46"
                fill={broken ? "rgba(255,143,46,0.16)" : "rgba(79,127,191,0.12)"}
                stroke={broken ? theme.accent : theme.cold}
                strokeWidth="2"
                strokeOpacity={broken ? 0.95 : 0.45}
              />
              {broken ? (
                <>
                  <path
                    d={`M${x} ${y} L${x + 62} ${y + 46} M${x + 62} ${y} L${x} ${y + 46} M${x + 31} ${y} L${x + 31} ${y + 46}`}
                    stroke={theme.accent}
                    strokeWidth="2"
                    opacity="0.8"
                  />
                </>
              ) : null}
            </g>
          );
        }),
      )}
    </g>
    <text x="148" y="212" fill={theme.muted} fontSize="22" letterSpacing="5" {...tx}>
      ВОЛНА ДОШЛА ЧЕРЕЗ ~2 МИНУТЫ
    </text>
  </Canvas>
);

/* ---- 06 the lake ------------------------------------------------------- */

export const ArtLake: React.FC = () => (
  <Canvas>
    {/* ice sheet */}
    <rect x="0" y="196" width="1080" height="20" fill="#cfe4ff" opacity="0.85" />
    <rect x="0" y="216" width="1080" height="864" fill="#07162c" opacity="0.92" />
    {/* the hole it punched */}
    <ellipse cx="500" cy="206" rx="112" ry="15" fill="#020913" />
    <ellipse cx="500" cy="206" rx="112" ry="15" fill="none" stroke={theme.accent} strokeWidth="4" />
    {/* radial cracks */}
    {[-1, -0.55, 0.55, 1].map((k, i) => (
      <path
        key={i}
        d={`M${500 + k * 112} 206 L ${500 + k * 300} ${206 + (i % 2 ? -6 : 6)}`}
        stroke="#9dc4f0"
        strokeWidth="3"
        opacity="0.7"
      />
    ))}
    {/* hole width */}
    <line x1="388" y1="152" x2="612" y2="152" stroke={theme.accent} strokeWidth="4" />
    <line x1="388" y1="136" x2="388" y2="168" stroke={theme.accent} strokeWidth="4" />
    <line x1="612" y1="136" x2="612" y2="168" stroke={theme.accent} strokeWidth="4" />
    <text
      x="500"
      y="120"
      fill={theme.accentLight}
      fontSize="32"
      letterSpacing="3"
      textAnchor="middle"
      {...tx}
    >
      ПРОЛОМ 8 М
    </text>

    {/* depth, measured from the ice down to the stone */}
    <line x1="828" y1="216" x2="828" y2="392" stroke={theme.accent} strokeWidth="4" strokeDasharray="14 10" />
    <line x1="808" y1="216" x2="848" y2="216" stroke={theme.accent} strokeWidth="4" />
    <line x1="808" y1="392" x2="848" y2="392" stroke={theme.accent} strokeWidth="4" />
    <text x="862" y="316" fill={theme.accentLight} fontSize="32" letterSpacing="2" {...tx}>
      11 М
    </text>

    {/* the fragment on the bottom */}
    <ellipse cx="480" cy="398" rx="176" ry="22" fill="#03101f" />
    <path
      d="M420 388 C 412 348, 460 324, 506 334 C 552 344, 566 378, 546 394 C 522 414, 444 416, 420 388 Z"
      fill="url(#rock)"
      stroke={theme.border}
      strokeWidth="3"
    />
    <path
      d="M420 388 C 412 348, 460 324, 506 334"
      stroke={theme.accent}
      strokeWidth="6"
      fill="none"
      opacity="0.75"
      strokeLinecap="round"
    />
  </Canvas>
);

/* ---- 07 the fragment on show ------------------------------------------- */

export const ArtMuseum: React.FC = () => (
  <Canvas>
    {/* light cone from above */}
    <path d="M462 20 L 618 20 L 782 420 L 298 420 Z" fill={theme.accent} opacity="0.1" />
    <path d="M462 20 L 618 20 L 782 420 L 298 420 Z" fill="url(#head)" opacity="0.12" />

    {/* vitrine */}
    <rect
      x="344"
      y="96"
      width="392"
      height="324"
      fill="rgba(79,127,191,0.07)"
      stroke={theme.cold}
      strokeWidth="3"
      strokeOpacity="0.7"
    />
    <line x1="344" y1="150" x2="736" y2="150" stroke={theme.cold} strokeWidth="2" strokeOpacity="0.35" />

    {/* plinth */}
    <rect x="396" y="348" width="288" height="72" fill="#0b1422" stroke={theme.border} strokeWidth="3" />

    {/* the stone */}
    <path
      d="M462 346 C 446 298, 494 258, 552 264 C 616 270, 658 308, 642 342 C 628 370, 488 376, 462 346 Z"
      fill="url(#rock)"
      stroke={theme.border}
      strokeWidth="3"
    />
    <ellipse cx="520" cy="302" rx="25" ry="17" fill="#0f141c" opacity="0.75" />
    <ellipse cx="594" cy="324" rx="17" ry="11" fill="#0f141c" opacity="0.65" />
    {/* fusion crust catching the light */}
    <path
      d="M462 346 C 446 298, 494 258, 552 264"
      stroke={theme.accent}
      strokeWidth="7"
      fill="none"
      opacity="0.8"
      strokeLinecap="round"
    />
    <ellipse cx="540" cy="428" rx="180" ry="18" fill="#000" opacity="0.6" />
  </Canvas>
);
