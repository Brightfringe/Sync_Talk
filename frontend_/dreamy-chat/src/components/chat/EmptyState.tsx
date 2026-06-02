export function EmptyState() {
  return (
    <div className="flex h-full flex-col items-center justify-center px-6 text-center">
      <svg width="140" height="120" viewBox="0 0 140 120" fill="none" aria-hidden>
        <defs>
          <linearGradient id="b1" x1="0" x2="1" y1="0" y2="1">
            <stop offset="0" stopColor="#d6b4fc" />
            <stop offset="1" stopColor="#ffd1df" />
          </linearGradient>
          <linearGradient id="b2" x1="0" x2="1" y1="0" y2="1">
            <stop offset="0" stopColor="#f4cae7" />
            <stop offset="1" stopColor="#eac3ee" />
          </linearGradient>
        </defs>
        <rect x="14" y="20" width="80" height="44" rx="18" fill="url(#b1)" opacity="0.85" />
        <rect x="46" y="58" width="80" height="44" rx="18" fill="url(#b2)" opacity="0.85" />
        <circle cx="34" cy="42" r="3" fill="white" />
        <circle cx="46" cy="42" r="3" fill="white" />
        <circle cx="58" cy="42" r="3" fill="white" />
        <circle cx="78" cy="80" r="3" fill="white" />
        <circle cx="90" cy="80" r="3" fill="white" />
        <circle cx="102" cy="80" r="3" fill="white" />
      </svg>
      <h3 className="mt-4 font-display text-xl font-semibold text-foreground">
        No messages yet
      </h3>
      <p className="mt-1 max-w-sm text-sm text-muted-foreground">
        Say hi — your first message kicks things off. Everyone in the room will see it instantly.
      </p>
    </div>
  );
}