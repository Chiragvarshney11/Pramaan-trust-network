export default function TrustRing({ score = 92, size = 150 }) {
  const radius = 52;
  const circumference = 2 * Math.PI * radius;
  const dash = circumference * Math.max(0, Math.min(100, score)) / 100;
  return (
    <div className="trust-ring trust-ring-clean" style={{ width: size, height: size }} aria-label={`Trust score ${score} out of 100`}>
      <svg viewBox="0 0 120 120" role="img" aria-hidden="true">
        <circle className="ring-track" cx="60" cy="60" r={radius}/>
        <circle className="ring-progress" cx="60" cy="60" r={radius}
          strokeDasharray={`${dash} ${circumference-dash}`} transform="rotate(-90 60 60)"/>
      </svg>
      <div className="ring-value"><strong>{score}</strong><span>/100</span><small>{score >= 90 ? "Excellent" : score >= 75 ? "Good" : "Needs review"}</small></div>
    </div>
  );
}
