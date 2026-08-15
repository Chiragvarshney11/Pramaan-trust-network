import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider, useAuth } from "./lib/auth";
import ProtectedRoute from "./components/ProtectedRoute";
import AppShell from "./components/AppShell";
import Landing from "./pages/Landing";
import Auth from "./pages/Auth";
import WorkerDashboard from "./pages/WorkerDashboard";
import EmployerDashboard from "./pages/EmployerDashboard";
import Workers from "./pages/Workers";
import Passport from "./pages/Passport";
import Trust from "./pages/Trust";
import GenericPage from "./pages/GenericPage";
import Verify from "./pages/Verify";
import Admin from "./pages/Admin";
import "./styles/app.css";

function DashboardRouter() {
  const { user } = useAuth();
  return user?.role === "worker" ? <WorkerDashboard/> : user?.role === "employer" ? <EmployerDashboard/> : <Admin/>;
}

class AppErrorBoundary extends React.Component {
  constructor(props){ super(props); this.state={hasError:false}; }
  static getDerivedStateFromError(){ return {hasError:true}; }
  componentDidCatch(error){ console.error("PRAMAAN UI error:", error); }
  render(){
    if(this.state.hasError) return <div className="loading-screen error-recovery"><div><span className="eyebrow">PRAMAAN recovery</span><h1>Something went wrong.</h1><p>The interface hit an unexpected rendering error. You can safely reload the page.</p><button className="btn btn-primary" onClick={()=>window.location.reload()}>Reload PRAMAAN</button></div></div>;
    return this.props.children;
  }
}

function App() {
  return <Routes>
    <Route path="/" element={<Landing/>}/>
    <Route path="/login" element={<Auth mode="login"/>}/>
    <Route path="/register" element={<Auth mode="register"/>}/>
    <Route path="/verify/:workerId" element={<Verify/>}/>
    <Route path="/verify" element={<Verify/>}/>
    <Route element={<ProtectedRoute/>}>
      <Route element={<AppShell/>}>
        <Route path="/dashboard" element={<DashboardRouter/>}/>
        <Route path="/passport" element={<Passport/>}/>
        <Route path="/passport/:workerId" element={<Passport/>}/>
        <Route path="/workers" element={<ProtectedRoute roles={["employer","admin"]}/>}>
          <Route index element={<Workers/>}/>
        </Route>
        <Route path="/trust" element={<Trust/>}/>
        <Route path="/profile" element={<GenericPage type="profile"/>}/>
        <Route path="/experience" element={<GenericPage type="experience"/>}/>
        <Route path="/reviews" element={<GenericPage type="reviews"/>}/>
        <Route path="/messages" element={<GenericPage type="messages"/>}/>
        <Route path="/documents" element={<GenericPage type="documents"/>}/>
        <Route path="/disputes" element={<GenericPage type="disputes"/>}/>
        <Route path="/settings" element={<GenericPage type="settings"/>}/>
        <Route path="/employees" element={<GenericPage type="employees"/>}/>
        <Route path="/requests" element={<GenericPage type="requests"/>}/>
        <Route path="/admin" element={<ProtectedRoute roles={["admin"]}/>}><Route index element={<Admin/>}/></Route>
      </Route>
    </Route>
    <Route path="*" element={<Navigate to="/" replace/>}/>
  </Routes>;
}

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode><AppErrorBoundary><BrowserRouter><AuthProvider><App/></AuthProvider></BrowserRouter></AppErrorBoundary></React.StrictMode>
);
