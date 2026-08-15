import { useEffect, useState } from "react";
import { api } from "../lib/api";
import { useAuth } from "../lib/auth";
import { BrainCircuit, ShieldCheck, Network, Activity, Star, AlertTriangle } from "lucide-react";
import TrustRing from "../components/TrustRing";

export default function Trust() {
  const {user}=useAuth(); const [data,setData]=useState(null);
  useEffect(()=>{api.trust(user.id).then(setData)},[user.id]);
  if(!data)return <div className="loading">Loading trust intelligence…</div>;
  return <div><div className="page-head"><div><span className="eyebrow">Evidence-based signals</span><h1>Trust Intelligence</h1><p>Risk signals help contextualize reputation. They are not definitive fraud verdicts.</p></div></div>
    <div className="trust-overview panel"><div><span className="eyebrow">Overall Trust Confidence</span><h2>{data.level}</h2><p>Calculated from verification consistency, review patterns and network signals.</p></div><TrustRing score={data.score} size={190}/></div>
    <div className="factor-grid">{(data?.factors||[]).map((f,i)=>{const FactorIcon=[Star,ShieldCheck,Network,Activity,BrainCircuit][i%5]||Activity;return <div className="factor-card" key={f.name}><div className="factor-icon"><FactorIcon size={18}/></div><span>{f.name}</span><strong>{f.score}<small>/100</small></strong><div className="progress"><i style={{width:`${Math.max(0,Math.min(100,Number(f.score)||0))}%`}}/></div><em>{f.level}</em></div>})}</div>
    <div className="info-banner"><AlertTriangle size={18}/><div><b>Responsible scoring</b><p>PRAMAAN should surface anomalies for review, not label a person a “fraudster”. Human review, dispute workflows and evidence remain part of the decision.</p></div></div>
  </div>
}
