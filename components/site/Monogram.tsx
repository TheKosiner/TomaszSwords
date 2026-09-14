/**
 * Znak firmowy: pionowy miecz z wplecionym monogramem „TS" —
 * jelec pełni rolę poprzeczki litery T, a S oplata głownię
 * (górny łuk przechodzi za ostrzem, dolny przed nim).
 * Proporcje i grubości dobrane tak, by znak czytał się już przy 40 px.
 */

const S_PATH =
  "M78 68C78 56 60 51 45 57C29 64 24 76 38 85C53 94 69 94 65 105C62 117 43 121 26 111";

export function Monogram({
  className,
  uid = "mg",
}: {
  className?: string;
  uid?: string;
}) {
  return (
    <svg
      viewBox="0 0 100 156"
      className={className}
      fill="none"
      role="img"
      aria-label="Tomasz Swords"
    >
      <defs>
        <linearGradient id={`${uid}-blade`} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#4b5560" />
          <stop offset="16%" stopColor="#f6fafd" />
          <stop offset="46%" stopColor="#8e9caa" />
          <stop offset="56%" stopColor="#e4ecf3" />
          <stop offset="84%" stopColor="#7f8d9a" />
          <stop offset="100%" stopColor="#3f4852" />
        </linearGradient>

        <linearGradient id={`${uid}-fit`} x1="0.1" y1="0" x2="0.7" y2="1">
          <stop offset="0%" stopColor="#ffffff" />
          <stop offset="30%" stopColor="#d3dde6" />
          <stop offset="66%" stopColor="#77838f" />
          <stop offset="100%" stopColor="#eaf1f6" />
        </linearGradient>

        <linearGradient id={`${uid}-mono`} x1="0.1" y1="0" x2="0.9" y2="1">
          <stop offset="0%" stopColor="#ffffff" />
          <stop offset="22%" stopColor="#c9d4de" />
          <stop offset="48%" stopColor="#68747f" />
          <stop offset="72%" stopColor="#f1f6fa" />
          <stop offset="100%" stopColor="#93a0ac" />
        </linearGradient>

        {/* dolny odcinek S rysowany ponownie na wierzchu — stąd efekt splotu */}
        <clipPath id={`${uid}-weave`}>
          <rect x="0" y="90" width="100" height="66" />
        </clipPath>
      </defs>

      {/* --- S: przebieg za głownią --- */}
      <path d={S_PATH} stroke={`url(#${uid}-mono)`} strokeWidth="15" strokeLinecap="round" />

      {/* --- miecz --- */}
      <path d="M50 3 59 19H41Z" fill={`url(#${uid}-fit)`} />
      <rect x="41" y="19" width="18" height="5" rx="2" fill={`url(#${uid}-fit)`} />

      <rect x="42.5" y="24" width="15" height="14" rx="3" fill="#252c34" />
      {[0, 1, 2].map((i) => (
        <line
          key={i}
          x1="42.5"
          y1={28 + i * 4.3}
          x2="57.5"
          y2={26 + i * 4.3}
          stroke={`url(#${uid}-fit)`}
          strokeWidth="2.2"
          strokeLinecap="round"
        />
      ))}

      {/* jelec — poprzeczka litery T */}
      <path d="M50 44C41 45 31 42 8 34C14 44 27 50 42 51H58C73 50 86 44 92 34C69 42 59 45 50 44Z" fill={`url(#${uid}-fit)`} />

      {/* głownia */}
      <path d="M42 49H58L55 124 50 153 45 124Z" fill={`url(#${uid}-blade)`} />
      <path d="M50 53V150" stroke="#ffffff" strokeOpacity="0.55" strokeWidth="1.4" />

      {/* --- S: dolny łuk przed głownią --- */}
      <g clipPath={`url(#${uid}-weave)`}>
        <path d={S_PATH} stroke={`url(#${uid}-mono)`} strokeWidth="15" strokeLinecap="round" />
      </g>
    </svg>
  );
}

export default Monogram;
