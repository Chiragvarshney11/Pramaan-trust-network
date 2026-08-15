import IndiaFooter from "../components/IndiaFooter";
import { useEffect, useState } from "react";
import { api } from "../lib/api";
import { BadgeCheck, BriefcaseBusiness, Star, Users, ArrowUpRight, Clock3, QrCode, ShieldCheck } from "lucide-react";
import StatCard from "../components/StatCard";
import TrustRing from "../components/TrustRing";
import { Link } from "react-router-dom";

export default function WorkerDashboard() {
  const [data,setData] = useState(null); const [analytics,setAnalytics] = useState(null);
  useEffect(()=>{Promise.all([api.dashboard(),api.analytics()]).then(([d,a])=>{setData(d);setAnalytics(a)}).catch(console.error)},[]);
  if(!data) return <div className="loading">Loading dashboard…</div>;
  const p = data.profile;
  return <div>
    <div className="page-head"><div><span className="eyebrow">Worker workspace</span><h1>Namaste, {p.name.split(" ")[0]} 👋</h1><p>Keep your profile, reputation and employment evidence up to date.</p></div><Link className="btn btn-primary" to="/passport"><QrCode size={16}/> View Passport</Link></div>
    <div className="stat-grid"><StatCard label="Experience" value={p.experience_years} suffix="Years" icon={Clock3}/><StatCard label="Employers" value={data.stats.employers} suffix="Verified" icon={Users}/><StatCard label="Reviews" value={data.stats.reviews} suffix="Received" icon={Star}/><StatCard label="Trust Score" value={data.stats.trustScore} suffix="/100" icon={ShieldCheck} accent="trust"/></div>
    <div className="dashboard-grid">
      <section className="panel passport-mini">
        <div className="panel-head"><div><span className="eyebrow">PRAMAAN Passport</span><h2>{p.name}</h2><small>{p.category}</small></div><span className="verified-pill"><BadgeCheck size={13}/> Verified</span></div>
        <div className="passport-mini-body"><div className="profile-avatar large profile-photo-wrap">{p.photoUrl?<img src={p.photoUrl} alt={p.name}/>:p.name[0]}</div><div><div className="mini-id">{p.worker_id}</div><p>{p.location}</p><div className="tag-row">{p.skills.slice(0,4).map(s=><span key={s}>{s}</span>)}</div></div></div>
        <Link className="btn btn-outline btn-sm" to="/passport">Open Passport <ArrowUpRight size={14}/></Link>
      </section>
      <section className="panel trust-panel"><div className="panel-head"><div><span className="eyebrow">Trust Intelligence</span><h2>Overall confidence</h2></div><Link to="/trust">Details</Link></div><div className="trust-center"><TrustRing score={data.stats.trustScore} size={150}/><div className="trust-copy"><strong>Low Risk</strong><p>No major suspicious activity signals detected in the current profile.</p><ul><li>Verified identity</li><li>Employment-linked reviews</li><li>Consistent profile history</li></ul></div></div></section>
    </div>
    {analytics&&<TrustAnalytics analytics={analytics}/>}
    <section className="panel"><div className="panel-head"><div><span className="eyebrow">Recent activity</span><h2>Latest reviews</h2></div><Link to="/reviews">View all</Link></div><div className="review-list">{data.recentReviews.map(r=><div className="review-item" key={r.id}><div className="avatar">{r.reviewer_name[0]}</div><div><b>{r.title}</b><p>{r.body}</p><small>Verified employment · {r.rating}/5</small></div><Star className="star" size={16} fill="currentColor"/></div>)}</div></section>
  </div>
}

function TrustAnalytics({analytics}){
  const points=analytics.trustTrend.map((v,i)=>`${(i/(analytics.trustTrend.length-1))*100},${100-v}`).join(" ");
  const max=Math.max(...analytics.distribution,1);
  return <section className="panel trust-analytics-panel">
    <div className="panel-head"><div><span className="eyebrow">Trust Intelligence</span><h2>Your reputation analytics</h2><p className="panel-copy">Live frontend analytics based on the currently logged-in profile and its review evidence.</p></div><Link to="/trust">Open intelligence →</Link></div>
    <div className="analytics-grid">
      <div className="analytics-chart-card"><div className="analytics-card-head"><div><span>Trust score trend</span><strong>{analytics.trustScore}<small>/100</small></strong></div><span className="analytics-positive">+{Math.max(1,analytics.trustScore-74)} pts</span></div><div className="line-chart"><div className="chart-grid-lines"><i/><i/><i/><i/></div><svg viewBox="0 0 100 100" preserveAspectRatio="none" aria-label="Trust score trend"><defs><linearGradient id="trustFill" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#58dcff" stopOpacity=".26"/><stop offset="100%" stopColor="#58dcff" stopOpacity="0"/></linearGradient></defs><polygon points={`0,100 ${points} 100,100`} fill="url(#trustFill)"/><polyline points={points} fill="none" stroke="#58dcff" strokeWidth="2.2" vectorEffect="non-scaling-stroke" strokeLinecap="round" strokeLinejoin="round"/></svg><div className="chart-labels">{analytics.months.map(m=><span key={m}>{m}</span>)}</div></div></div>
      <div className="analytics-chart-card distribution-card"><div className="analytics-card-head"><div><span>Rating distribution</span><strong>{analytics.reviewAverage}<small>/5 avg</small></strong></div><span>{analytics.reviewCount} reviews</span></div><div className="bars">{analytics.distribution.map((count,i)=><div className="bar-item" key={analytics.labels[i]}><span>{analytics.labels[i]}</span><div><i style={{height:`${Math.max(10,(count/max)*100)}%`}}/></div><b>{count}</b></div>)}</div></div>
      <div className="analytics-signal-card"><span className="eyebrow">Confidence signals</span>{analytics.signals.map(s=><div className="signal-row" key={s.label}><div><span>{s.label}</span><b>{s.score}%</b></div><div className="signal-track"><i style={{width:`${s.score}%`}}/></div></div>)}</div>
    </div>
  </section>
}
