export default function StatCard({ label, value, suffix, icon: Icon, accent = "" }) {
  return (
    <div className={`stat-card ${accent}`}>
      <div className="stat-icon">{Icon && <Icon size={17}/>}</div>
      <span>{label}</span>
      <strong>{value} <small>{suffix}</small></strong>
    </div>
  );
}
