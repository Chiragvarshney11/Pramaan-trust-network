import IndiaFooter from "../components/IndiaFooter";
import { useEffect, useState } from "react";
import { api } from "../lib/api";
import { Users, BriefcaseBusiness, CheckCircle2, ShieldCheck, Search, Star } from "lucide-react";
import StatCard from "../components/StatCard";
import { Link } from "react-router-dom";

export default function EmployerDashboard() {
  const [data,setData]=useState(null); const [analytics,setAnalytics]=useState(null);
  useEffect(()=>{Promise.all([api.dashboard(),api.analytics()]).then(([d,a])=>{setData(d);setAnalytics(a)}).catch(console.error)},[]);
  if(!data) return <div className="loading">Loading dashboard…</div>;
  return <div>
    <div className="page-head"><div><span className="eyebrow">Employer workspace</span><h1>Welcome back, {data.profile.name.split(" ")[0]} 👋</h1><p>Find trusted workers, manage employment and maintain transparent records.</p></div><Link className="btn btn-primary" to="/workers"><Search size={16}/> Find Trusted Workers</Link></div>
    <div className="stat-grid"><StatCard label="Workers Hired" value={data.stats.hired} suffix="" icon={Users}/><StatCard label="Active" value={data.stats.active} suffix="" icon={BriefcaseBusiness}/><StatCard label="Completed" value={data.stats.completed} suffix="" icon={CheckCircle2}/><StatCard label="Employer Score" value={data.stats.trustScore} suffix="/100" icon={ShieldCheck} accent="trust"/></div>
    {analytics&&<TrustAnalytics analytics={analytics}/>}
    <div className="dashboard-grid"><section className="panel"><div className="panel-head"><div><span className="eyebrow">Discovery</span><h2>Find trusted workers</h2></div><Link to="/workers">Open directory</Link></div><p className="panel-copy">Search by name, category, location or worker ID. Inspect evidence before sending a request.</p><Link className="btn btn-outline" to="/workers"><Search size={16}/> Search workers</Link></section>
    <section className="panel"><div className="panel-head"><div><span className="eyebrow">Requests</span><h2>Recent requests</h2></div><Link to="/requests">View all</Link></div><div className="request-list">{data.requests.map(r=><div className="request-row" key={r.id}><div className="avatar">{r.worker_name[0]}</div><div><b>{r.worker_name}</b><small>{r.category} · {r.status}</small></div><span className="score">{r.rating || "—"}/5</span></div>)}</div></section></div>
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
