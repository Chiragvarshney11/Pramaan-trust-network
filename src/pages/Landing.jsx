import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, BadgeCheck, BrainCircuit, QrCode, ShieldCheck, Star, Users, LockKeyhole, Scale, SearchCheck, Sparkles, AlertTriangle } from "lucide-react";
import Logo from "../components/Logo";
import PramaanMark from "../components/PramaanMark";

const features = [
  [BadgeCheck,"Verified Passport","A portable worker identity with masked ID, employment history and verification state.","/passport"],
  [QrCode,"QR Verification","Scan a passport to verify the worker without exposing sensitive identity information.","/verify"],
  [Star,"Verified Reviews","Reviews are tied to verified employment records with explainable authenticity signals.","/reviews"],
  [BrainCircuit,"Trust Intelligence","Signals across reviews, verification consistency, network health and behavior.","/trust"],
  [LockKeyhole,"Privacy by Design","Sensitive identity values stay masked in the public-facing identity layer.","/settings"],
  [Users,"Two-Sided Network","Worker and employer profiles, requests, hiring records and communication in one system.","/workers"],
  [Scale,"Safety & Dispute Center","Report suspicious profiles or reviews, raise disputes and track resolution evidence.","/disputes"],
  [SearchCheck,"Smart Worker Match","Match skills, location, experience and trust signals before an employer reaches out.","/workers"],
];

const reviews = [
  {name:"Rajesh Malhotra", role:"Verified Employer", rating:5, score:96, status:"Genuine", title:"Consistent and dependable", body:"Reliable work, respectful communication and consistent performance.", signals:["Verified employment","Reviewer verified","Normal velocity"]},
  {name:"Anita Kapoor", role:"Verified Employer", rating:5, score:92, status:"Genuine", title:"Very professional", body:"Punctual, trustworthy and excellent with household responsibilities.", signals:["Employment linked","Healthy account history","Detailed review"]},
  {name:"Vikram Mehta", role:"Employer", rating:4, score:74, status:"Needs Review", title:"Good experience overall", body:"The work was positive, but the reviewer has limited history on the network.", signals:["Limited reviewer history","Employment linked","Low evidence depth"]},
];

export default function Landing() {
  const [activeReview,setActiveReview]=useState(0);
  return (
    <div className="landing">
      <header className="landing-nav">
        <Logo />
        <nav><a href="#how">How it works</a><a href="#features">Features</a><a href="#trust">Trust</a><a href="#reviews">Reviews</a></nav>
        <div className="landing-actions"><Link className="btn btn-ghost" to="/login">Sign in</Link><Link className="btn btn-primary" to="/register">Get Started</Link></div>
      </header>

      <section className="hero">
        <div className="hero-copy">
          <div className="eyebrow"><ShieldCheck size={14}/> Trusted by verified workers & employers</div>
          <h1>Your Work.<br/>Your Identity.<br/><span>Your PRAMAAN.</span></h1>
          <p>A digital work identity that helps people carry their trust, verified employment history and reputation wherever they go.</p>
          <div className="hero-ctas">
            <Link className="btn btn-primary btn-lg" to="/register?role=worker">I am a Worker <ArrowRight size={17}/></Link>
            <Link className="btn btn-outline btn-lg" to="/register?role=employer">I am an Employer</Link>
          </div>
          <div className="hero-points"><span><BadgeCheck size={15}/> Verified Identity</span><span><QrCode size={15}/> Instant QR Verification</span><span><BrainCircuit size={15}/> Trust Intelligence</span></div>
        </div>
        <div className="hero-visual">
          <div className="hero-halo hero-halo-one"/><div className="hero-halo hero-halo-two"/>
          <div className="security-hero-card">
            <div className="security-grid"/>
            <div className="security-top"><span><ShieldCheck size={15}/> VERIFIED WORK IDENTITY</span><span className="live-badge"><i/> LIVE</span></div>
            <div className="shield-stage">
              <div className="shield-ring shield-ring-outer"/><div className="shield-ring shield-ring-inner"/>
              <div className="shield-shape"><PramaanMark size={88}/></div>
              <span className="float-node node-one"><BadgeCheck size={14}/></span><span className="float-node node-two"><QrCode size={14}/></span><span className="float-node node-three"><BrainCircuit size={14}/></span>
            </div>
            <div className="security-caption"><strong>PRAMAAN PASSPORT</strong><span>Identity verified · Reputation portable · Data masked</span></div>
            <div className="security-metrics"><div><b>92</b><span>Trust</span></div><div><b>28</b><span>Reviews</span></div><div><b>5</b><span>Employers</span></div></div>
          </div>
        </div>
      </section>

      <section className="marquee-strip"><span>Verified Work Identity</span><i>•</i><span>Transparent Reviews</span><i>•</i><span>Intelligent Trust Score</span><i>•</i><span>QR Verification</span></section>

      <section className="feature-section" id="features">
        <div className="section-heading"><span className="eyebrow">Built for trust</span><h2>Everything important, connected.</h2><p>One identity layer for workers and employers — from first discovery to verified employment and reputation.</p></div>
        <div className="feature-grid feature-grid-premium">
          {features.map(([Icon,title,desc,to]) => <Link to={to} className="feature-card feature-card-action" key={title}><div className="feature-icon-wrap"><Icon size={21}/></div><div><h3>{title}</h3><p>{desc}</p></div><span className="feature-arrow"><ArrowRight size={15}/></span></Link>)}
        </div>
      </section>

      <section className="review-intelligence-section" id="reviews">
        <div className="review-landing-head"><div><span className="eyebrow"><Sparkles size={13}/> Review intelligence</span><h2>Know what people say — <span>and how trustworthy it is.</span></h2><p>Every review is evaluated against employment linkage, reviewer verification, review depth and behavioral signals. Suspicious patterns are surfaced for human review instead of silently declaring a person fraudulent.</p></div><Link className="btn btn-outline" to="/reviews">Explore review intelligence <ArrowRight size={15}/></Link></div>
        <div className="review-landing-grid">
          <div className="review-confidence-card"><div className="confidence-orb"><strong>94</strong><span>/100</span></div><div><span className="confidence-label">NETWORK REVIEW CONFIDENCE</span><h3>Evidence-backed reputation</h3><p>Verified employment links and consistent reviewer behavior increase confidence.</p><div className="confidence-bars"><div><span>Employment linkage</span><i style={{width:"96%"}}/></div><div><span>Reviewer verification</span><i style={{width:"92%"}}/></div><div><span>Review consistency</span><i style={{width:"89%"}}/></div></div></div></div>
          <div className="review-cards-column">{reviews.map((r,i)=><button type="button" className={`landing-review-card review-card-button ${r.status!=="Genuine"?"review-needs-check":""} ${activeReview===i?"active":""}`} key={r.name} onClick={()=>setActiveReview(i)}><div className="review-card-top"><div className="reviewer-avatar">{r.name[0]}</div><div className="reviewer-copy"><strong>{r.name}</strong><span>{r.role}</span></div><span className={`integrity-status ${r.status === "Genuine" ? "genuine" : "review"}`}>{r.status === "Genuine" ? <BadgeCheck size={12}/> : <AlertTriangle size={12}/>} {r.status}</span></div><div className="review-stars">{"★★★★★".slice(0,r.rating)}<span>{r.rating}.0</span></div><h4>{r.title}</h4><p>“{r.body}”</p><div className="review-signals">{r.signals.map(s=><span key={s}><CheckSignal/>{s}</span>)}</div><div className="review-card-foot"><span>{activeReview===i?"Selected · inspect evidence":"Click to inspect"}</span><strong>{r.score}%</strong></div></button>)}</div>
        </div>
      </section>

      <section className="split-section" id="how">
        <div><span className="eyebrow">01 — Worker</span><h2>Build a reputation that travels with you.</h2><p>Create your profile, verify identity, maintain employment records, collect verified reviews and share your PRAMAAN Passport through QR.</p><Link className="text-link" to="/register?role=worker">Create worker account <ArrowRight size={15}/></Link></div>
        <div className="mock-panel trust-preview-card"><div className="preview-top"><span>TRUST INTELLIGENCE</span><b>92/100</b></div><div className="preview-chart"><div className="preview-grid"><i/><i/><i/><i/></div><svg viewBox="0 0 100 60" preserveAspectRatio="none"><defs><linearGradient id="landingTrustFill" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#58dcff" stopOpacity=".28"/><stop offset="100%" stopColor="#58dcff" stopOpacity="0"/></linearGradient></defs><polygon points="0,60 0,46 15,42 30,44 43,33 57,36 70,23 84,26 100,12 100,60" fill="url(#landingTrustFill)"/><polyline points="0,46 15,42 30,44 43,33 57,36 70,23 84,26 100,12" fill="none" stroke="#58dcff" strokeWidth="2" vectorEffect="non-scaling-stroke" strokeLinecap="round"/></svg></div><div className="preview-signals"><span><ShieldCheck size={12}/> Identity 96%</span><span><Star size={12}/> Reviews 92%</span><span><Users size={12}/> Network 84%</span></div><Link className="preview-link" to="/login">View your analytics <ArrowRight size={13}/></Link></div>
      </section>

      <section className="split-section reverse" id="trust">
        <div><span className="eyebrow">02 — Employer</span><h2>Find trusted workers with evidence, not guesswork.</h2><p>Search by skills and location, inspect verified passports, send employment requests, maintain records and leave verified reviews.</p><Link className="text-link" to="/register?role=employer">Create employer account <ArrowRight size={15}/></Link></div>
        <div className="mock-list"><div className="worker-row"><div className="avatar">S</div><div><b>Sunita Sharma</b><small>Domestic Worker · 6.4 yrs</small></div><strong>92/100</strong></div><div className="worker-row"><div className="avatar">R</div><div><b>Rekha Devi</b><small>Cook · 4.2 yrs</small></div><strong>87/100</strong></div><div className="worker-row"><div className="avatar">P</div><div><b>Pooja Kumari</b><small>Baby Care · 3.8 yrs</small></div><strong>82/100</strong></div></div>
      </section>

      <footer className="landing-footer"><Logo/><span>© 2026 PRAMAAN. Built for verified work identity.</span></footer>
    </div>
  );
}
function CheckSignal(){return <BadgeCheck size={11}/>}
