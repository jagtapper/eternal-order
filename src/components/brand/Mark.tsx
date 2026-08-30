export function Mark({ className = "h-8 w-8" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 100 100"
      className={className}
      aria-hidden="true"
      fill="none"
    >
      <g stroke="currentColor" strokeLinecap="round">
        <circle cx="50" cy="50" r="41" strokeWidth="2.4" />
        <line x1="50" y1="20" x2="50" y2="36" strokeWidth="3" />
        <line x1="50" y1="64" x2="50" y2="80" strokeWidth="3" />
        <line x1="20" y1="50" x2="36" y2="50" strokeWidth="3" />
        <line x1="64" y1="50" x2="80" y2="50" strokeWidth="3" />
        <line x1="28.8" y1="28.8" x2="40.1" y2="40.1" strokeWidth="3" />
        <line x1="71.2" y1="71.2" x2="59.9" y2="59.9" strokeWidth="3" />
        <line x1="71.2" y1="28.8" x2="59.9" y2="40.1" strokeWidth="3" />
        <line x1="28.8" y1="71.2" x2="40.1" y2="59.9" strokeWidth="3" />
      </g>
      <circle cx="50" cy="50" r="7" fill="currentColor" />
    </svg>
  );
}
