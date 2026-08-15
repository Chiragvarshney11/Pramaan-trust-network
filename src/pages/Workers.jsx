import { useEffect, useState } from "react";
import { api } from "../lib/api";
import { Search, MapPin, Star, BadgeCheck, Send, X, ShieldAlert, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";
import Toast from "../components/Toast";

export default function Workers() {
  const [filters,setFilters]=useState({q:"",category:"",location:""});
  const [workers,setWorkers]=useState([]);
  const [toast,setToast]=useState("");
  const [selected,setSelected]=useState(null);
  const load=()=>api.workers(filters).then(d=>setWorkers(d.workers)).catch(e=>setToast(e.message));
  useEffect(()=>{load()},[]);
  async function request(workerId){try{await api.sendRequest({workerId,message:"I would like to discuss a verified employment opportunity."});setToast("Employment request sent.");setSelected(null)}catch(e){setToast(e.message)}}
  return <div><div className="page-head"><div><span className="eyebrow">Employer directory</span><h1>Find Trusted Workers</h1><p>Evidence-backed profiles, transparent reputation and QR-verifiable passports.</p></div></div>
    <div className="search-bar"><Search size={17}/><input placeholder="Search by name, ID or category…" value={filters.q} onChange={e=>setFilters({...filters,q:e.target.value})}/><input placeholder="Location" value={filters.location} onChange={e=>setFilters({...filters,location:e.target.value})}/><button className="btn btn-primary" onClick={load}>Search</button></div>
    <div className="worker-directory">{workers.map(w=><div className="worker-card" key={w.id}><div className="worker-main"><div className="profile-avatar large">{w.name[0]}</div><div><div className="name-line"><h2>{w.name}</h2>{w.identity_verified ? <BadgeCheck size={17} className="verified-icon"/>:null}</div><p>{w.category} · {w.experience_years} years</p><div className="tag-row">{w.skills.slice(0,5).map(s=><span key={s}>{s}</span>)}</div><small className="muted"><MapPin size={13}/> {w.location} · {w.worker_id}</small></div></div><div className="worker-score"><strong>{w.trustScore}</strong><span>/100</span><small><Star size={13} fill="currentColor"/> {w.rating || "—"} · {w.review_count} reviews</small><span className="directory-integrity genuine"><Sparkles size={10}/> Profile genuine signal</span></div><div className="worker-actions"><Link className="btn btn-outline btn-sm" to={`/passport/${w.worker_id}`}>View Passport</Link><button className="btn btn-primary btn-sm" onClick={()=>setSelected(w)}>Send Request <Send size={13}/></button></div></div>)}</div>
    {selected && <div className="modal-backdrop" onClick={()=>setSelected(null)}><div className="modal" onClick={e=>e.stopPropagation()}><button className="modal-close" onClick={()=>setSelected(null)}><X/></button><span className="eyebrow">Employment request</span><h2>{selected.name}</h2><p>Send a verified employment request. The worker can accept or decline it from their dashboard.</p><button className="btn btn-primary btn-block" onClick={()=>request(selected.id)}>Send request</button></div></div>}
    <Toast message={toast} onClose={()=>setToast("")}/>
  </div>
}
