import { useEffect, useState } from "react";
import { api } from "../lib/api";
import { ShieldCheck, Activity, Search } from "lucide-react";

export default function Admin(){
  const [data,setData]=useState(null); useEffect(()=>{api.audit().then(setData)},[]);
  if(!data)return <div className="loading">Loading audit console…</div>;
  return <div><div className="page-head"><div><span className="eyebrow">Governance</span><h1>Admin Audit Console</h1><p>Review authentication, employment, review and dispute events.</p></div></div><div className="stat-grid"><div className="stat-card"><div className="stat-icon"><Activity size={17}/></div><span>Audit events</span><strong>{data.audit.length}</strong></div><div className="stat-card"><div className="stat-icon"><ShieldCheck size={17}/></div><span>Security layer</span><strong>Active</strong></div><div className="stat-card"><div className="stat-icon"><Search size={17}/></div><span>Risk workflow</span><strong>Ready</strong></div></div><div className="panel table-panel"><table><thead><tr><th>Time</th><th>User</th><th>Action</th><th>Entity</th></tr></thead><tbody>{data.audit.map(a=><tr key={a.id}><td>{new Date(a.created_at).toLocaleString()}</td><td>{a.user_name||"System"}</td><td><span className="code-pill">{a.action}</span></td><td>{a.entity_type||"—"}</td></tr>)}</tbody></table></div></div>
}
