import { useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { ShieldCheck, ArrowLeft, CheckCircle2, Eye, EyeOff } from "lucide-react";
import { useAuth } from "../lib/auth";
import Logo from "../components/Logo";
import Toast from "../components/Toast";

export default function Auth({ mode = "login" }) {
  const [params] = useSearchParams();
  const defaultRole = params.get("role") === "employer" ? "employer" : "worker";
  const [role, setRole] = useState(defaultRole);
  const [form, setForm] = useState({ name:"", email:"worker@pramaan.demo", mobile:"+91 ", password: mode === "login" ? "Worker@123" : "", location:"Delhi, India", category:"Domestic Worker", experienceYears:"6.4", skills:"Cooking, Cleaning, Baby Care", identityNumber:"", companyName:"" });
  const [show, setShow] = useState(false);
  const [error, setError] = useState("");
  const { login, register } = useAuth();
  const navigate = useNavigate();

  const isLogin = mode === "login";

  async function submit(e) {
    e.preventDefault();
    setError("");
    try {
      if (isLogin) {
        const user = await login({ email: form.email, password: form.password });
        navigate(user.role === "worker" ? "/dashboard" : "/dashboard");
      } else {
        const user = await register({
          ...form,
          role,
          experienceYears: Number(form.experienceYears || 0),
          skills: form.skills.split(",").map(s => s.trim()).filter(Boolean)
        });
        navigate("/dashboard");
      }
    } catch (err) { setError(err.message); }
  }

  return (
    <div className="auth-page">
      <div className="auth-side">
        <Link className="back-home" to="/"><ArrowLeft size={15}/> Back to PRAMAAN</Link>
        <div className="auth-side-content"><Logo/><span className="eyebrow">Verified Work Identity</span><h1>Trust should be portable.</h1><p>Build, verify and carry a reputation that is backed by evidence.</p><div className="auth-benefits"><span><CheckCircle2/> Verified identity</span><span><CheckCircle2/> Employment-linked reviews</span><span><CheckCircle2/> QR passport</span></div></div>
      </div>
      <div className="auth-card-wrap">
        <form className="auth-card" onSubmit={submit}>
          <div className="auth-header"><Logo compact/><h2>{isLogin ? "Welcome back" : "Create your PRAMAAN"}</h2><p>{isLogin ? "Sign in to your secure workspace." : "Choose your role and create a verified profile."}</p></div>
          {!isLogin && <div className="role-switch"><button type="button" className={role==="worker"?"selected":""} onClick={()=>setRole("worker")}>I am a Worker</button><button type="button" className={role==="employer"?"selected":""} onClick={()=>setRole("employer")}>I am an Employer</button></div>}
          {!isLogin && <div className="form-grid"><label>Full name<input required value={form.name} onChange={e=>setForm({...form,name:e.target.value})}/></label><label>Mobile<input required value={form.mobile} onChange={e=>setForm({...form,mobile:e.target.value})}/></label></div>}
          {!isLogin && role === "employer" && <label>Company / Household name<input required value={form.companyName} onChange={e=>setForm({...form,companyName:e.target.value})}/></label>}
          <label>Email<input type="email" required value={form.email} onChange={e=>setForm({...form,email:e.target.value})}/></label>
          <label>Password<div className="password-wrap"><input type={show?"text":"password"} required value={form.password} onChange={e=>setForm({...form,password:e.target.value})}/><button type="button" onClick={()=>setShow(!show)}>{show?<EyeOff size={17}/>:<Eye size={17}/>}</button></div></label>
          {!isLogin && <><div className="form-grid"><label>Location<input required value={form.location} onChange={e=>setForm({...form,location:e.target.value})}/></label><label>Category<input value={form.category} onChange={e=>setForm({...form,category:e.target.value})}/></label></div>
          {role === "worker" && <><div className="form-grid"><label>Experience (years)<input type="number" min="0" max="60" step="0.1" value={form.experienceYears} onChange={e=>setForm({...form,experienceYears:e.target.value})}/></label><label>Skills<input value={form.skills} onChange={e=>setForm({...form,skills:e.target.value})}/></label></div><label>Identity / Aadhaar number <span className="field-note">hashed, never stored in plain text</span><input required value={form.identityNumber} onChange={e=>setForm({...form,identityNumber:e.target.value})}/></label></>}
          </>}
          {error && <div className="error-box">{error}</div>}
          <button className="btn btn-primary btn-block" type="submit">{isLogin ? "Sign in securely" : "Create verified account"}</button>
          <div className="auth-switch">{isLogin ? <>New to PRAMAAN? <Link to="/register">Create account</Link></> : <>Already have an account? <Link to="/login">Sign in</Link></>}</div>
          {isLogin && <div className="demo-hint"><ShieldCheck size={14}/> Demo: worker@pramaan.demo / Worker@123</div>}
        </form>
      </div>
    </div>
  );
}
