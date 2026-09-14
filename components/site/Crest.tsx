export function Crest({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 48 48" className={className} fill="none" aria-hidden>
      <path
        d="M24 3 41 9v14.5C41 34 33.6 42.4 24 45 14.4 42.4 7 34 7 23.5V9L24 3Z"
        stroke="currentColor"
        strokeWidth="1.4"
        opacity="0.7"
      />
      <path d="M24 11.5v22" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" />
      <path d="M24 33.5 21.6 30h4.8L24 33.5Z" fill="currentColor" />
      <path d="M17 18.5h14" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" />
      <circle cx="24" cy="9.6" r="2.6" stroke="currentColor" strokeWidth="1.6" />
    </svg>
  );
}

export default Crest;
