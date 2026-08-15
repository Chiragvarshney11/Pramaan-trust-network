import { NavLink, useNavigate } from "react-router-dom";
import {
  LayoutDashboard, BadgeCheck, UserRound, BriefcaseBusiness, Star,
  BrainCircuit, MessageSquare, FileText, Gavel, Settings, LogOut,
  Search, ShieldCheck
} from "lucide-react";
import { useAuth } from "../lib/auth";
import Logo from "./Logo";

const workerItems = [
  ["Dashboard", "/dashboard", LayoutDashboard],
  ["My Passport", "/passport", BadgeCheck],
  ["My Profile", "/profile", UserRound],
  ["Experience", "/experience", BriefcaseBusiness],
  ["Requests", "/requests", FileText],
  ["Reviews", "/reviews", Star],
  ["Trust Intelligence", "/trust", BrainCircuit],
  ["Messages", "/messages", MessageSquare],
  ["Documents", "/documents", FileText],
  ["Disputes", "/disputes", Gavel],
  ["Settings", "/settings", Settings]
];

const employerItems = [
  ["Dashboard", "/dashboard", LayoutDashboard],
  ["Find Workers", "/workers", Search],
  ["My Employees", "/employees", BriefcaseBusiness],
  ["Requests", "/requests", FileText],
  ["Reviews Given", "/reviews", Star],
  ["Trust Intelligence", "/trust", BrainCircuit],
  ["Messages", "/messages", MessageSquare],
  ["Disputes", "/disputes", Gavel],
  ["Settings", "/settings", Settings]
];

export default function Sidebar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const items = user?.role === "employer" ? employerItems : workerItems;

  async function signOut() {
    await logout();
    navigate("/login");
  }

  return (
    <aside className="sidebar">
      <div className="sidebar-brand"><Logo /></div>
      <nav>
        {items.map(([label, path, Icon]) => (
          <NavLink key={path} to={path} className={({ isActive }) => isActive ? "nav-item active" : "nav-item"}>
            <Icon size={17} />
            <span>{label}</span>
          </NavLink>
        ))}
        {user?.role === "admin" && (
          <NavLink to="/admin" className="nav-item"><ShieldCheck size={17}/><span>Admin Audit</span></NavLink>
        )}
      </nav>
      <button className="nav-item logout" onClick={signOut}><LogOut size={17}/><span>Logout</span></button>
    </aside>
  );
}
