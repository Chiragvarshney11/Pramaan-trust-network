import { Bell, ChevronDown, CircleHelp, LogOut, ShieldCheck } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import Logo from "./Logo";
import { useAuth } from "../lib/auth";

function ProfileMenu({ user, onLogout }) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);
  const navigate = useNavigate();
  const name = user?.name || "User";
  const role = user?.role === "employer" ? "Employer" : user?.role === "worker" ? "Worker" : "Admin";

  useEffect(() => {
    function close(e) {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    }
    function escape(e) {
      if (e.key === "Escape") setOpen(false);
    }
    document.addEventListener("mousedown", close);
    document.addEventListener("keydown", escape);
    return () => {
      document.removeEventListener("mousedown", close);
      document.removeEventListener("keydown", escape);
    };
  }, []);

  function go(path) {
    setOpen(false);
    navigate(path);
  }

  return (
    <div className="profile-menu-wrap" ref={ref}>
      <button
        type="button"
        className={`profile-menu-trigger ${open ? "open" : ""}`}
        onClick={() => setOpen(v => !v)}
        aria-expanded={open}
        aria-haspopup="menu"
      >
        <span className="profile-menu-avatar">{(name[0] || "U").toUpperCase()}</span>
        <span className="profile-menu-identity">
          <strong>{name}</strong>
          <small>{role}</small>
        </span>
        <ChevronDown className="profile-menu-chevron" size={16} />
      </button>

      {open && (
        <div className="profile-dropdown" role="menu">
          <div className="profile-dropdown-head">
            <span className="profile-dropdown-avatar">{(name[0] || "U").toUpperCase()}</span>
            <div>
              <strong>{name}</strong>
              <small>{role} · PRAMAAN member</small>
            </div>
          </div>

          <button type="button" className="profile-dropdown-item help" onClick={() => go("/settings")} role="menuitem">
            <span className="profile-dropdown-icon"><CircleHelp size={17} /></span>
            <span><strong>Help & Support</strong><small>Get help with your workspace</small></span>
          </button>

          <button type="button" className="profile-dropdown-item security" onClick={() => go("/settings")} role="menuitem">
            <span className="profile-dropdown-icon"><ShieldCheck size={17} /></span>
            <span><strong>Security & Privacy</strong><small>Review visibility and safety controls</small></span>
          </button>

          <div className="profile-dropdown-divider" />

          <button type="button" className="profile-dropdown-item logout" onClick={onLogout} role="menuitem">
            <span className="profile-dropdown-icon"><LogOut size={17} /></span>
            <span><strong>Logout</strong><small>Sign out of this workspace</small></span>
          </button>
        </div>
      )}
    </div>
  );
}

export default function Topbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  async function signOut() {
    await logout();
    navigate("/login");
  }

  return (
    <header className="topbar">
      <div className="mobile-logo"><Logo compact /></div>
      <div className="topbar-title">
        <span className="muted">Secure workspace</span>
        <strong>{user?.role === "worker" ? "Worker Portal" : user?.role === "employer" ? "Employer Portal" : "Admin Console"}</strong>
      </div>
      <div className="topbar-actions">
        <button className="icon-button" aria-label="Notifications"><Bell size={18} /><i className="notification-dot" /></button>
        <ProfileMenu user={user} onLogout={signOut} />
      </div>
    </header>
  );
}
