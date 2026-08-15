import IndiaFooter from "../components/IndiaFooter";
import { useEffect, useState } from "react";
import { api } from "../lib/api";
import { useAuth } from "../lib/auth";
import { FileText, MessageSquare, Gavel, BriefcaseBusiness, Star, Send, Plus, CheckCircle2, Camera, ShieldCheck, BadgeCheck, AlertTriangle, Activity, Fingerprint, Sparkles, BarChart3, Flag, X } from "lucide-react";
import Toast from "../components/Toast";

export default function GenericPage({ type }) {
  const {user}=useAuth(); const [data,setData]=useState(null); const [toast,setToast]=useState("");
  const configs={profile:{title:"My Profile",eyebrow:"Identity",desc:"Manage your public work identity and account information."},experience:{title:"Experience",eyebrow:"Employment history",desc:"Verified employment records create the evidence behind reviews and trust."},reviews:{title:"Reviews",eyebrow:"Reputation intelligence",desc:"Employment-linked reviews with transparent authenticity and anomaly signals."},messages:{title:"Messages",eyebrow:"Communication",desc:"Keep employment conversations inside a controlled communication layer."},documents:{title:"Documents",eyebrow:"Evidence vault",desc:"Track verification and employment documents."},disputes:{title:"Disputes",eyebrow:"Resolution",desc:"Raise issues with evidence and keep a traceable resolution history."},settings:{title:"Settings",eyebrow:"Account",desc:"Manage your workspace preferences."},employees:{title:"My Employees",eyebrow:"Employer records",desc:"Manage current and completed employment relationships."},requests:{title:"Requests",eyebrow:"Hiring workflow",desc:"Track incoming and outgoing employment requests."}};
  const c=configs[type]||configs.profile;
  const [error,setError]=useState("");
  const reload=()=>{
    setError("");
    let task;
    if(type==="messages") task=api.messages();
    else if(type==="documents") task=api.documents();
    else if(type==="disputes") task=api.disputes();
    else if(type==="reviews") task=Promise.all([api.reviews(),api.reviewInsights()]);
    else task=api.dashboard();
    Promise.resolve(task).then(result=>{
      if(type==="reviews") { const [reviews,insights]=result; setData({...reviews,...insights}); }
      else setData(result);
    }).catch(err=>{ console.error(`PRAMAAN ${type} page:`,err); setError(err?.message || "Unable to load this workspace."); });
  };
  useEffect(reload,[type,user?.id,user?.role]);
  if(error) return <div className="panel page-error-state"><AlertTriangle size={26}/><h2>Could not load {c.title}</h2><p>{error}</p><button className="btn btn-primary" onClick={reload}>Try again</button></div>;
  if(!data)return <div className="loading">Loading {c.title.toLowerCase()}…</div>;
  return <div><div className="page-head"><div><span className="eyebrow">{c.eyebrow}</span><h1>{c.title}</h1><p>{c.desc}</p></div>{type==="reviews"&&<div className="head-chip"><Sparkles size={15}/> Explainable review intelligence</div>}</div>
    {type==="profile"&&<Profile data={{...data.profile,profileIntegrity:data.profileIntegrity}} onSaved={(u)=>{setData({...data,profile:u});setToast("Profile updated successfully.")}}/>}
    {type==="experience"&&<Experience data={data}/>} {type==="reviews"&&<Reviews data={data} user={user} onChanged={()=>{reload();setToast("Review added and authenticity signals recalculated.")}}/>}
    {type==="messages"&&<Messages data={data} user={user}/>} {type==="documents"&&<Documents data={data} onChanged={()=>{reload();setToast("Document added to the vault.")}}/>} {type==="disputes"&&<Disputes data={data}/>} {type==="settings"&&<Settings/>} {type==="employees"&&<Experience data={data}/>} {type==="requests"&&<Requests data={data}/>} <Toast message={toast} onClose={()=>setToast("")}/>
  </div>
}

function Profile({data,onSaved}){
  const [form,setForm]=useState({...data});
  const [preview,setPreview]=useState(data?.photoUrl||"");
  const integrity=data?.profileIntegrity;
  function photo(e){
    const f=e.target.files?.[0];
    if(!f)return;
    if(f.size>2*1024*1024){alert("Choose an image under 2 MB.");return}
    const r=new FileReader();
    r.onload=()=>setPreview(r.result);
    r.readAsDataURL(f);
  }
  async function save(e){
    e.preventDefault();
    const {user}=await api.updateProfile({...form,photoUrl:preview});
    const updated={...user,profileIntegrity:integrity};
    onSaved(updated);
  }
  return <form className="profile-editor" onSubmit={save}>
    <div className="panel profile-hero">
      <div className="profile-photo-editor">
        <div className="profile-avatar xxl profile-photo-wrap">{preview?<img src={preview} alt={form.name}/>:form?.name?.[0]}</div>
        <label className="photo-upload"><Camera size={15}/> Update photo<input type="file" accept="image/png,image/jpeg,image/webp" onChange={photo}/></label>
        <small>JPG, PNG or WEBP · max 2 MB</small>
      </div>
      <div className="profile-hero-main">
        <span className="eyebrow">Verified profile</span>
        <h2>{form.name}</h2>
        <p>{form.category||form.company_name}</p>
        <div className="profile-badges"><span><ShieldCheck size={13}/> Identity verified</span><span><Activity size={13}/> Active profile</span></div>
      </div>
      {integrity&&<div className={`profile-integrity-badge ${integrity.tone}`}><>{integrity.tone==="high"?<AlertTriangle size={15}/>:<BadgeCheck size={15}/>}</><div><strong>{integrity.verdict}</strong><small>{integrity.confidence}% confidence</small></div></div>}
    </div>
    {integrity&&<div className="panel profile-integrity-panel standalone">
      <div className="integrity-panel-head"><div><span className="eyebrow"><Sparkles size={12}/> Rating intelligence</span><h3>Profile fraud / genuine assessment</h3></div><span className={`integrity-status ${integrity.tone==="high"?"review":"genuine"}`}>{integrity.verdict}</span></div>
      <div className="profile-integrity-grid"><div><span>Average rating</span><strong>{integrity.average}/5</strong></div><div><span>Recent 5★ share</span><strong>{integrity.recentFiveRatio}%</strong></div><div><span>Recent reviews</span><strong>{integrity.recentCount}</strong></div><div><span>Rating pattern</span><strong>{integrity.mixedRatings?"Mixed":"Concentrated"}</strong></div></div>
      <div className="integrity-reasons">{integrity.reasons.map((r,i)=><span key={i}><CheckCircle2 size={11}/>{r}</span>)}</div>
      <p className="integrity-disclaimer"><ShieldCheck size={12}/> This is an explainable risk signal based on rating concentration, timing and review evidence — not a final accusation.</p>
    </div>}
    <div className="panel"><div className="panel-head"><div><h2>Profile details</h2><p className="panel-copy">Only public-safe information is shown on the passport.</p></div><button className="btn btn-primary btn-sm">Save changes</button></div><div className="detail-form-grid"><label>Full name<input value={form.name||""} onChange={e=>setForm({...form,name:e.target.value})}/></label><label>Email<input type="email" value={form.email||""} onChange={e=>setForm({...form,email:e.target.value})}/></label><label>Mobile<input value={form.mobile||""} onChange={e=>setForm({...form,mobile:e.target.value})}/></label><label>Location<input value={form.location||""} onChange={e=>setForm({...form,location:e.target.value})}/></label><label className="detail-wide">Category<input value={form.category||form.company_name||""} onChange={e=>setForm({...form,category:e.target.value})}/></label></div></div>
  </form>
}
function Experience(){return <div className="panel"><div className="empty-state"><BriefcaseBusiness size={30}/><h3>Verified employment records</h3><p>Employment records are created when an employer request is accepted. They become the evidence layer for verified reviews.</p></div></div>}
function Reviews({data,user,onChanged}){
  const [open,setOpen]=useState(false);
  const [expanded,setExpanded]=useState(null);
  const [filter,setFilter]=useState("all");
  const [query,setQuery]=useState("");
  const [form,setForm]=useState({rating:5,title:"",body:"",verifiedEmployment:true,reviewerVerified:true,accountAgeDays:240,reviewsLast24h:1});
  const rows=data?.reviews||[];
  const visible=rows.filter(r=>{
    const genuine=(r.integrityStatus||((r.authenticityScore||88)>=80?"Genuine":"Needs Review"))==="Genuine";
    const match=filter==="all" || (filter==="genuine"&&genuine) || (filter==="review"&&!genuine);
    const q=query.toLowerCase().trim(); const text=`${r.reviewer_name||""} ${r.title||""} ${r.body||""}`.toLowerCase();
    return match && (!q || text.includes(q));
  });
  async function submit(e){e.preventDefault();try{await api.addReview({...form,reviewerName:user?.name||"PRAMAAN Member"});setOpen(false);setForm({...form,title:"",body:""});onChanged()}catch(err){window.alert(err?.message||"Review could not be published.")}}
  return <div className="review-workspace">
    <div className="review-intel-grid">
      <div className="review-kpi"><span>Average rating</span><strong>{data.averageRating}<small>/5</small></strong><em><Star size={12} fill="currentColor"/> {data.total} reviews</em></div>
      <div className="review-kpi"><span>Authenticity confidence</span><strong>{data.authenticityScore}<small>/100</small></strong><em className="green"><ShieldCheck size={12}/> Evidence-backed</em></div>
      <div className="review-kpi"><span>Flagged for review</span><strong>{data.flagged}</strong><em className={data.flagged?"warn":"green"}><Flag size={12}/> Human review queue</em></div>
    </div>
    <div className="panel review-engine">
      <div className="panel-head"><div><span className="eyebrow">Explainable signals</span><h2>Review Integrity Engine</h2><p className="panel-copy">The prototype evaluates evidence signals and surfaces suspicious patterns. It does not make an automated fraud accusation.</p></div><button className="btn btn-primary btn-sm" onClick={()=>setOpen(true)}><Plus size={14}/> Write review</button></div>
      <div className="integrity-checks">{(data?.checks||[]).map((c,i)=>{const CheckIcon=[Fingerprint,ShieldCheck,Activity,BarChart3,Star][i]||Activity;return <div key={c.label}><div className="check-icon"><CheckIcon size={16}/></div><div><b>{c.label}</b><span>{c.status}</span></div><strong>{c.score}</strong><div className="progress"><i style={{width:`${Math.max(0,Math.min(100,Number(c.score)||0))}%`}}/></div></div>})}</div>
    </div>
    <div className="panel review-results-panel">
      <div className="panel-head review-results-head"><div><span className="eyebrow">Evidence-backed reputation</span><h2>Verified reviews</h2><p className="panel-copy">Inspect the evidence behind every Genuine or Needs Review decision.</p></div></div>
      <div className="review-controls"><div className="review-filter-tabs">{[["all","All"],["genuine","Genuine"],["review","Needs review"]].map(([key,label])=><button key={key} className={filter===key?"active":""} onClick={()=>setFilter(key)}>{label}</button>)}</div><input className="review-search" value={query} onChange={e=>setQuery(e.target.value)} placeholder="Search reviewer or review..." /></div>
      <div className="review-list">{visible.length?visible.map(r=>{
        const genuine=(r.integrityStatus||((r.authenticityScore||88)>=80?"Genuine":"Needs Review"))==="Genuine";
        const signals=r.signals||{};
        return <div className={`review-item advanced-review-card ${expanded===r.id?"expanded":""}`} key={r.id}>
          <div className="avatar">{(r.reviewer_name||"R")[0]}</div>
          <div className="review-body">
            <div className="review-title"><div><b>{r.title}</b><span className="reviewer-sub">{r.reviewer_name} · {r.created_at?new Date(r.created_at).toLocaleDateString():"Verified history"}</span></div><span className={`integrity-status ${genuine?"genuine":"review"}`}>{genuine?<BadgeCheck size={12}/>:<AlertTriangle size={12}/>} {genuine?"Genuine":"Needs Review"}</span></div>
            <div className="review-stars">{"★★★★★".slice(0,Number(r.rating)||5)}<span>{r.rating}/5</span></div>
            <p>{r.body}</p>
            <div className="review-integrity-summary"><div><span>Authenticity confidence</span><strong>{r.authenticityScore||88}%</strong></div><div className="confidence-track"><i style={{width:`${r.authenticityScore||88}%`}}/></div><span className={`risk-badge ${String(r.riskLevel||"Low").toLowerCase()}`}>{r.riskLevel||"Low"} risk</span></div>
            <div className="review-meta"><span><Star size={12} fill="currentColor"/> {r.rating}/5</span><span>{r.verified?<CheckCircle2 size={12}/>:<AlertTriangle size={12}/>} {r.verified?"Verified employment":"Needs verification"}</span><span>{r.verified?"Reviewer verified":"Reviewer history limited"}</span></div>
            <button className="review-detail-toggle" onClick={()=>setExpanded(expanded===r.id?null:r.id)}>{expanded===r.id?"Hide evidence":"View evidence signals"} {expanded===r.id?<X size={12}/>:<Sparkles size={12}/>}</button>
            {expanded===r.id&&<div className="review-evidence-grid">
              {[["Employment linkage",signals.verifiedEmployment], ["Reviewer verification",signals.reviewerVerified], ["Detailed review",signals.detailedText], ["Account history",signals.accountAge], ["Velocity normal",signals.velocityNormal], ["Repetitive language",!signals.repetitiveLanguage]].map(([label,ok])=><div key={label} className={ok?"evidence-good":"evidence-warn"}><span>{ok?<CheckCircle2 size={12}/>:<AlertTriangle size={12}/>}</span><div><b>{label}</b><small>{ok?"Signal supports authenticity":"Signal needs additional review"}</small></div></div>)}
            </div>}
          </div>
        </div>
      }):<div className="empty-state"><Star size={28}/><h3>No matching reviews</h3><p>Try another filter or search term.</p></div>}</div>
    </div>
    {open&&<div className="modal-backdrop"><form className="modal review-modal" onSubmit={submit}><button type="button" className="modal-close" onClick={()=>setOpen(false)}><X size={18}/></button><span className="eyebrow">Verified review</span><h2>Rate this work experience</h2><p>Write factual details. The prototype engine checks employment linkage, reviewer verification, review velocity, account history and repetitive language.</p><label>Rating<select value={form.rating} onChange={e=>setForm({...form,rating:e.target.value})}>{[5,4,3,2,1].map(x=><option key={x}>{x}</option>)}</select></label><label>Title<input required value={form.title} onChange={e=>setForm({...form,title:e.target.value})} placeholder="Consistent and dependable"/></label><label>Review<textarea required minLength={20} rows={5} value={form.body} onChange={e=>setForm({...form,body:e.target.value})} placeholder="Describe the actual work, reliability and communication..."/></label><div className="signal-preview"><CheckCircle2 size={14}/> Employment linked <span/><ShieldCheck size={14}/> Reviewer verified <span/><Activity size={14}/> Velocity normal</div><button className="btn btn-primary btn-block"><Sparkles size={14}/> Analyze & publish</button></form></div>}
  </div>
}
function Messages({data,user}){
  const [messages,setMessages]=useState(data?.messages||[]); const [text,setText]=useState(""); const [sending,setSending]=useState(false);
  const other=messages.find(m=>m.sender_id!==user.id)?.sender_name || (user.role==="worker"?"Rajesh Malhotra":"Sunita Sharma");
  async function send(e){ e.preventDefault(); if(!text.trim()||sending)return; setSending(true); try{ const result=await api.sendMessage({body:text}); setMessages(result.messages); setText(""); }catch(err){ alert(err?.message||"Message could not be sent."); } finally{setSending(false);} }
  return <div className="chat-shell panel">
    <div className="chat-sidebar"><div className="chat-sidebar-head"><div><span className="eyebrow">Inbox</span><h3>Conversations</h3></div><span className="online-dot">●</span></div>
      <div className="chat-contact active"><div className="avatar">{other[0]}</div><div><b>{other}</b><small>Employment conversation</small></div><span>●</span></div>
      <div className="chat-security"><ShieldCheck size={15}/><div><b>Protected chat</b><small>Keep sensitive identity details out of messages.</small></div></div></div>
    <div className="chat-main"><div className="chat-head"><div className="avatar">{other[0]}</div><div><b>{other}</b><small><span className="presence-dot"/> Active conversation</small></div><span className="chat-verified"><BadgeCheck size={13}/> Verified network</span></div>
      <div className="chat-messages">{messages.map(m=><div className={m.sender_id===user.id?"chat-bubble-row own":"chat-bubble-row"} key={m.id}><div className={`chat-bubble ${m.sender_id===user.id?"own":""}`}><small>{m.sender_id===user.id?"You":m.sender_name}</small><p>{m.body}</p><time>{m.created_at?new Date(m.created_at).toLocaleTimeString([], {hour:"2-digit",minute:"2-digit"}):""}</time></div></div>)}</div>
      <form className="chat-composer" onSubmit={send}><input value={text} onChange={e=>setText(e.target.value)} placeholder="Type a message…" maxLength={500}/><button className="btn btn-primary" disabled={sending||!text.trim()}><Send size={15}/>{sending?"Sending":"Send"}</button></form>
      <small className="chat-footnote"><ShieldCheck size={11}/> Demo mode: messages persist in this browser only.</small></div>
  </div>
}
function Documents({data,onChanged}){
  const [open,setOpen]=useState(false);
  const [name,setName]=useState("");
  const [type,setType]=useState("verification");
  const [file,setFile]=useState(null);
  const [saving,setSaving]=useState(false);
  const docs=data?.documents||[];
  async function add(e){
    e.preventDefault();
    if(!name.trim()&&!file){window.alert("Add a document name or choose a file first.");return;}
    setSaving(true);
    try{
      await api.addDocument({name:name.trim()||file?.name||"New document",type,fileName:file?.name||""});
      setOpen(false);setName("");setType("verification");setFile(null);onChanged();
    }catch(err){window.alert(err?.message||"Document could not be added.");}
    finally{setSaving(false)}
  }
  return <>
    <div className="panel"><div className="panel-head"><div><h2>Document vault</h2><p className="panel-copy">Track verification and employment evidence.</p></div><button type="button" className="btn btn-primary btn-sm" onClick={()=>setOpen(true)}><Plus size={14}/> Add document</button></div>
      <div className="document-list">{docs.length?docs.map(d=><div className="document-row" key={d.id}><FileText size={18}/><div><b>{d.name}</b><small>{d.type} · {d.status}{d.fileName?` · ${d.fileName}`:""}</small></div><span className={`document-status ${d.status}`}>{d.status}</span><CheckCircle2 className="green" size={17}/></div>):<div className="empty-state"><FileText size={28}/><h3>No documents yet</h3><p>Add verification or employment evidence to your vault.</p></div>}</div>
    </div>
    {open&&<div className="modal-backdrop"><form className="modal document-modal" onSubmit={add}><button type="button" className="modal-close" onClick={()=>setOpen(false)}><X size={18}/></button><span className="eyebrow">Evidence vault</span><h2>Add a document</h2><p>Choose a document type and optionally attach a local file. This frontend prototype stores document metadata in your browser.</p><div className="document-field"><label htmlFor="document-name">Document name</label><input id="document-name" required value={name} onChange={e=>setName(e.target.value)} placeholder="Identity proof, experience letter..."/></div><div className="document-field"><label htmlFor="document-type">Document type</label><select id="document-type" value={type} onChange={e=>setType(e.target.value)}><option value="verification">Verification</option><option value="identity">Identity</option><option value="employment">Employment</option><option value="certificate">Certificate</option><option value="passport">Passport</option></select></div><label className="file-drop">{file?<><FileText size={18}/><span>{file.name}</span></>:<><Plus size={18}/><span>Choose a file <small>PDF, JPG, PNG or WEBP · max 5 MB</small></span></>}<input type="file" accept="application/pdf,image/png,image/jpeg,image/webp" onChange={e=>{const f=e.target.files?.[0];if(f&&f.size>5*1024*1024){window.alert("Choose a file under 5 MB.");return}setFile(f||null)}}/></label><div className="document-modal-actions"><button type="button" className="btn btn-outline" onClick={()=>setOpen(false)}>Cancel</button><button className="btn btn-primary" disabled={saving}>{saving?"Adding…":"Add to vault"}</button></div></form></div>}
  </>
}
function Disputes({data}){return <div className="panel"><div className="empty-state"><Gavel size={28}/><h3>{data?.disputes?.length||0} dispute records</h3><p>Disputes are auditable and should be resolved using evidence and human review.</p></div></div>}
function Settings(){return <div className="panel settings-list"><div><b>Profile visibility</b><p>Public verification exposes only passport-safe information.</p></div><div><b>QR rotation</b><p>Passport QR tokens rotate every 10 seconds in this frontend prototype.</p></div><div><b>Review safety</b><p>Anomaly signals are advisory. PRAMAAN should never make an automated fraud accusation.</p></div></div>}
function Requests({data}){const rows=data?.requests||[];return <div className="panel">{rows.length?rows.map(r=><div className="request-row" key={r.id}><div className="avatar">{r.worker_name?.[0]}</div><div><b>{r.worker_name}</b><small>{r.category} · {r.status}</small></div><span className="score">{r.rating||"—"}/5</span></div>):<div className="empty-state"><Send size={28}/><h3>No requests</h3><p>Employment requests will appear here.</p></div>}</div>}
