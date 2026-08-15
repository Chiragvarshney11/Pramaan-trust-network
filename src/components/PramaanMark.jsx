export default function PramaanMark({ size = 48, className = "" }) {
  return (
    <div className={`pramaan-mark ${className}`} style={{ width: size, height: size }} aria-label="PRAMAAN mark">
      <svg viewBox="0 0 64 64" width="70%" height="70%" aria-hidden="true">
        <path d="M20 10h24v7H27v8h13c7 0 11 4 11 10s-4 10-11 10H27v9h-7V10Zm7 21v7h12c2.8 0 4.5-1.2 4.5-3.5S41.8 31 39 31H27Z" fill="currentColor"/>
        <path d="M15 14 9 18v16c0 12 8 20 23 26 15-6 23-14 23-26V18l-6-4v19c0 8-5.4 14-17 19-11.6-5-17-11-17-19V14Z" fill="currentColor" opacity=".35"/>
      </svg>
    </div>
  );
}
