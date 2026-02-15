import { useMultiScoreboardStore } from '@/stores/multiScoreboardStore';

interface TickerProps {
  readonly opacity: number;
}

export function Ticker({ opacity }: TickerProps) {
  const tickerItems = useMultiScoreboardStore((s) => s.tickerItems);
  const tickerSpeed = useMultiScoreboardStore((s) => s.tickerSpeed);

  if (tickerItems.length === 0) return null;

  const text = tickerItems.map((item) => item.text).join('    |    ');
  const duration = Math.max(5, text.length / (tickerSpeed / 10));

  return (
    <div
      style={{
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        height: 36,
        opacity,
        overflow: 'hidden',
        backgroundColor: 'rgba(0, 0, 0, 0.9)',
        fontFamily: 'Oswald, sans-serif',
        color: '#ffffff',
        zIndex: 102,
      }}
      data-testid="ticker"
    >
      <div
        style={{
          display: 'inline-block',
          whiteSpace: 'nowrap',
          fontSize: 18,
          lineHeight: '36px',
          paddingLeft: '100%',
          animation: `ticker-scroll ${String(duration)}s linear infinite`,
        }}
      >
        {text}
      </div>
      <style>
        {`@keyframes ticker-scroll {
          0% { transform: translateX(0); }
          100% { transform: translateX(-100%); }
        }`}
      </style>
    </div>
  );
}
