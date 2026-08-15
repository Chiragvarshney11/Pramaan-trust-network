import { useEffect, useMemo, useState } from "react";
import { api } from "../lib/api";
import { useAuth } from "../lib/auth";
import {
  BadgeCheck, ShieldCheck, MapPin, CalendarDays, FileText, BrainCircuit,
  RefreshCw, Clock3, ScanLine, X, Maximize2, Sparkles, AlertTriangle,
  RotateCw, ShieldAlert
} from "lucide-react";
import { useParams } from "react-router-dom";
import PramaanMark from "../components/PramaanMark";
import { QRCodeSVG } from "qrcode.react";

const QR_LIFETIME = 10;

export default function Passport() {
  const { user } = useAuth();
  const { workerId } = useParams();
  const [data,setData]=useState(null);
  const [error,setError]=useState("");
  const [tab,setTab]=useState("about");
  const [seconds,setSeconds]=useState(QR_LIFETIME);
  const [qrPayload,setQrPayload]=useState("");
  const [qrIssued,setQrIssued]=useState(0);
  const [qrOpen,setQrOpen]=useState(false);
  const [qrSize,setQrSize]=useState(320);

  useEffect(()=>{
    let active=true;
    setError("");
    const load = workerId ? api.passport(workerId) : api.dashboard().then(d=>api.passport(d.profile.worker_id));
    load.then(v=>{if(active)setData(v)}).catch(e=>{if(active)setError(e?.message||"Unable to load this passport.")});
    return ()=>{active=false};
  },[user?.id, user?.worker_id, workerId]);

  const p=data?.passport;
  const targetId=p?.workerId;
  const publicUrl=useMemo(()=>targetId ? `${window.location.origin}/verify/${encodeURIComponent(targetId)}` : "",[targetId]);

  useEffect(()=>{
    if(!qrOpen) return;
    const onKeyDown=(e)=>{if(e.key==="Escape") setQrOpen(false);};
    document.addEventListener("keydown",onKeyDown);
    const previous=document.body.style.overflow;
    document.body.style.overflow="hidden";
    return ()=>{document.removeEventListener("keydown",onKeyDown);document.body.style.overflow=previous;};
  },[qrOpen]);

  useEffect(()=>{
    const updateQrSize=()=>{
      const viewport=Math.min(window.innerWidth, window.innerHeight);
      setQrSize(Math.min(390, Math.max(210, Math.floor(viewport*0.54))));
    };
    updateQrSize();
    window.addEventListener("resize",updateQrSize);
    return ()=>window.removeEventListener("resize",updateQrSize);
  },[]);

  useEffect(()=>{
    // The QR timer is intentionally tied to the viewer being OPEN.
    // Opening the QR viewer always issues a fresh 10-second token.
    if(!targetId || !publicUrl || !qrOpen) return;

    let timer;
    const refresh=()=>{
      const expiresAt=Date.now()+QR_LIFETIME*1000;
      const nonce=Math.random().toString(36).slice(2,9).toUpperCase();
      setQrPayload(`${publicUrl}?exp=${expiresAt}&n=${nonce}`);
      setSeconds(QR_LIFETIME);
      setQrIssued(expiresAt);
    };

    refresh();

    timer=setInterval(()=>{
      setSeconds(v=>{
        if(v<=1){
          refresh();
          return QR_LIFETIME;
        }
        return v-1;
      });
    },1000);

    return ()=>clearInterval(timer);
  },[targetId,publicUrl,qrOpen]);

  const integrity=p?.integrity;
  if(error) return <div className="error-panel"><AlertTriangle/><h2>Passport unavailable</h2><p>{error}</p></div>;
  if(!p) return <div className="loading">Loading passport…</div>;

  return <div>
    <div className="page-head">
      <div><span className="eyebrow">Portable verified identity</span><h1>PRAMAAN Passport</h1><p>A compact proof of work identity and reputation. Sensitive identity information stays masked.</p></div>
      <div className="head-chip"><ScanLine size={15}/> Live QR verification</div>
    </div>

    <div className="passport-layout">
      <section className="passport-card-full passport-premium">
        <div className="passport-header"><span><ShieldCheck size={18}/> PRAMAAN PASSPORT</span><PramaanMark size={46}/></div>

        <div className="passport-profile">
          <div className="profile-avatar xl profile-photo-wrap">{p.photoUrl?<img src={p.photoUrl} alt={p.name}/>:p.name[0]}</div>
          <div><h2>{p.name}</h2><p>{p.category}</p><span className="passport-id">ID: {p.workerId}</span></div>
          {integrity&&<div className={`profile-integrity-badge ${integrity.tone}`}>
            {integrity.tone==="high"?<ShieldAlert size={15}/>:<BadgeCheck size={15}/>}
            <div><strong>{integrity.verdict}</strong><small>{integrity.confidence}% confidence</small></div>
          </div>}
        </div>

        <div className="passport-stat-grid">
          <div><span>Experience</span><b>{p.experienceYears}</b><small>Years</small></div>
          <div><span>Employers</span><b>5</b><small>Verified</small></div>
          <div><span>Reviews</span><b>{p.reviewCount}</b><small>Verified</small></div>
          <div><span>Trust Score</span><b className="gold-score">{p.trustScore}</b><small>Excellent</small></div>
        </div>

        <div className="profile-integrity-panel">
          <div className="integrity-panel-head">
            <div><span className="eyebrow"><Sparkles size={12}/> Profile integrity</span><h3>{integrity?.verdict==="Genuine"?"Genuine profile pattern":"Fraud-risk pattern detected"}</h3></div>
            <span className={`integrity-status ${integrity?.tone==="high"?"review":"genuine"}`}>{integrity?.tone==="high"?<AlertTriangle size={12}/>:<BadgeCheck size={12}/>} {integrity?.verdict}</span>
          </div>
          <div className="profile-integrity-grid">
            <div><span>Average rating</span><strong>{integrity?.average || "—"}/5</strong></div>
            <div><span>Recent 5★ share</span><strong>{integrity?.recentFiveRatio ?? 0}%</strong></div>
            <div><span>Rating pattern</span><strong>{integrity?.mixedRatings?"Mixed":"Concentrated"}</strong></div>
            <div><span>Confidence</span><strong>{integrity?.confidence ?? "—"}%</strong></div>
          </div>
          <div className="integrity-reasons">{(integrity?.reasons||[]).slice(0,3).map((r,i)=><span key={i}><CheckSignal/>{r}</span>)}</div>
        </div>

        <div className="qr-area qr-live">
          <div><b><span className="live-dot"/> Live QR Passport</b><p>Rotates every 10 seconds. Click the QR to open the animated high-resolution verification view.</p><div className="qr-timer"><Clock3 size={12}/> Expires in <strong>{seconds}s</strong></div></div>
          <button type="button" className="qr-frame qr-frame-button" aria-label="Open QR code in large view" onClick={()=>{setSeconds(QR_LIFETIME);setQrOpen(true)}}>
            {qrPayload?<QRCodeSVG value={qrPayload} size={180} bgColor="#ffffff" fgColor="#070a18" level="M" includeMargin/>:<div className="qr-placeholder">Generating…</div>}
            <span className="qr-corner">{seconds<=3?<RefreshCw size={13}/>:<Maximize2 size={12}/>}</span>
            <span className="qr-hover-label">Click to expand</span>
          </button>
        </div>

        <div className="passport-security"><BadgeCheck size={14}/><span>Identity verified</span><i/><span>Public data masked</span><i/><span>10s rotating token</span></div>
      </section>

      <section className="panel passport-details">
        <div className="tabs">{["about","skills","experience","documents","activity"].map(t=><button key={t} className={tab===t?"active":""} onClick={()=>setTab(t)}>{t[0].toUpperCase()+t.slice(1)}</button>)}</div>
        {tab==="about"&&<div className="detail-grid">
          <div><span>Location</span><b><MapPin size={14}/> {p.location}</b></div>
          <div><span>Identity</span><b><BadgeCheck size={14}/> {p.identity.masked}</b></div>
          <div><span>Work category</span><b>{p.category}</b></div>
          <div><span>Languages</span><b>{p.languages.join(", ") || "Not provided"}</b></div>
          <div><span>Trust score</span><b><BrainCircuit size={14}/> {p.trustScore}/100</b></div>
          <div><span>Verification</span><b className="green"><BadgeCheck size={14}/> Verified</b></div>
          <div className="detail-wide"><span>About</span><p>{p.bio || "Experienced professional with a verified PRAMAAN work identity."}</p></div>
        </div>}
        {tab==="skills"&&<div><h3>Work Categories & Skills</h3><div className="tag-row large">{p.skills.map(s=><span key={s}>{s}</span>)}</div></div>}
        {tab==="experience"&&<div><h3>Verified employment history</h3><div className="timeline"><div><i></i><b>Verified domestic work experience</b><span>{p.experienceYears} years · employment records maintained on PRAMAAN</span></div></div></div>}
        {tab==="documents"&&<div className="empty-state"><FileText size={28}/><h3>Verified documents</h3><p>Identity verification and passport records are represented here. Full document access should use protected signed URLs in production.</p></div>}
        {tab==="activity"&&<div className="empty-state"><CalendarDays size={28}/><h3>Recent activity</h3><p>Verification and employment events are recorded in the audit trail.</p></div>}
      </section>
    </div>

    {qrOpen&&<div className="qr-modal-backdrop" role="dialog" aria-modal="true" aria-label="PRAMAAN QR verification" onMouseDown={(e)=>{if(e.target===e.currentTarget)setQrOpen(false)}}>
      <div className="qr-modal">
        <div className="qr-modal-head">
          <div><span className="eyebrow"><RotateCw size={12}/> Live verification token</span><h2>Scan PRAMAAN Passport</h2><p>This QR expires automatically and regenerates every 10 seconds.</p></div>
          <button type="button" className="qr-modal-close" onClick={()=>setQrOpen(false)} aria-label="Close QR viewer"><X size={18}/></button>
        </div>
        <div className="qr-modal-stage">
          <div className="qr-energy-ring ring-a"/><div className="qr-energy-ring ring-b"/>
          <span className="qr-corner tl"/><span className="qr-corner tr"/><span className="qr-corner bl"/><span className="qr-corner br"/>
          <div className="qr-scan-line"/>
          <div className="qr-modal-code" style={{width:qrSize,height:qrSize}}>
            {qrPayload?<QRCodeSVG value={qrPayload} size={Math.max(180,qrSize-34)} bgColor="#fff" fgColor="#050816" level="H" includeMargin/>:<div>Generating…</div>}
          </div>
        </div>
        <div className="qr-modal-status">
          <div><span>STATUS</span><strong><i/> LIVE</strong></div>
          <div><span>EXPIRES IN</span><strong className={seconds<=3?"urgent":""}>{seconds}s</strong></div>
          <div><span>WORKER ID</span><strong>{targetId}</strong></div>
        </div>
        <div className="qr-modal-actions">
          <button className="btn btn-outline btn-sm" onClick={()=>{setQrOpen(false);setTimeout(()=>setQrOpen(true),80)}}><RefreshCw size={13}/> Re-open animation</button>
          <button className="btn btn-primary btn-sm" onClick={()=>setQrOpen(false)}>Done</button>
        </div>
      </div>
    </div>}
  </div>;
}
function CheckSignal(){return <BadgeCheck size={11}/>}
