import { useEffect, useState } from "react";
import { api } from "../lib/api";
import { ShieldCheck, Search, BadgeCheck, AlertCircle, Clock3, LockKeyhole } from "lucide-react";
import { useSearchParams, useParams } from "react-router-dom";
import PramaanMark from "../components/PramaanMark";

export default function Verify() {
  const [params]=useSearchParams(); const {workerId:routeId}=useParams();
  const [id,setId]=useState(routeId||""); const [result,setResult]=useState(null); const [error,setError]=useState(""); const [expired,setExpired]=useState(false);
  useEffect(()=>{const exp=Number(params.get("exp"));if(exp){setExpired(Date.now()>exp);setId(routeId||"")}},[routeId,params]);
  async function submit(e){e.preventDefault();setError("");setResult(null);const exp=Number(params.get("exp"));if(exp&&Date.now()>exp){setExpired(true);setError("This QR token expired. Scan the current passport QR again.");return}try{setResult(await api.verify(id))}catch(e){setError(e.message)}}
  useEffect(()=>{if(routeId)submit({preventDefault(){}})},[routeId]);
  return <div className="verify-page"><div className="verify-card verify-premium"><div className="verify-top"><PramaanMark size={58}/><span className="secure-chip"><LockKeyhole size={12}/> Secure public verification</span></div><span className="eyebrow">PRAMAAN verification gateway</span><h1>Verify a PRAMAAN Passport</h1><p>Scan the rotating passport QR or enter the worker ID. Sensitive identity information is never exposed.</p><form onSubmit={submit}><div className="search-bar"><Search size={17}/><input required placeholder="PRM-W-7F42K9KB" value={id} onChange={e=>setId(e.target.value)}/><button className="btn btn-primary">Verify</button></div></form>{expired&&<div className="error-box"><Clock3 size={16}/> QR token expired. Please scan again.</div>}{error&&<div className="error-box"><AlertCircle size={16}/> {error}</div>}{result&&<div className="verification-result"><div className="verified-big"><BadgeCheck size={25}/><span>Passport Verified</span></div><h2>{result.passport.name}</h2><p>{result.passport.category} · {result.passport.location}</p><div className="verify-grid"><div><span>Worker ID</span><b>{result.passport.workerId}</b></div><div><span>Trust Score</span><b>{result.passport.trustScore}/100</b></div><div><span>Rating</span><b>{result.passport.rating}/5</b></div><div><span>Reviews</span><b>{result.passport.reviewCount}</b></div></div><div className="verification-foot"><ShieldCheck size={14}/> Verified passport data · public-safe fields only</div></div>}</div></div>
}
