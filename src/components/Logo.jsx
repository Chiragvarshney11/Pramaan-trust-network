import { ShieldCheck } from "lucide-react";
import { Link } from "react-router-dom";

export default function Logo({ compact = false }) {
  return (
    <Link className="logo" to="/">
      <span className="logo-mark"><ShieldCheck size={20} /></span>
      <span>
        <strong>PRAMAAN</strong>
        {!compact && <small>Verified Work Identity</small>}
      </span>
    </Link>
  );
}
