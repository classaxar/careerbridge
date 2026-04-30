import { tickerData } from '../data/mockData';

export default function TickerBar() {
  // Duplicate for seamless loop
  const items = [...tickerData, ...tickerData];

  return (
    <div className="ticker-bar">
      <div className="ticker-track">
        {items.map((t, i) => (
          <span key={i} className="ticker-item">
            <span className="ticker-symbol">{t.symbol}</span>
            <span className="ticker-price">{t.price}</span>
            <span className={`ticker-change ${t.up ? 'up' : 'down'}`}>
              {t.up ? '▲' : '▼'} {t.change}
            </span>
          </span>
        ))}
      </div>
    </div>
  );
}
