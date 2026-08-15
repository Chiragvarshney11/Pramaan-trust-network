import { useState } from "react";
import { ChevronDown, CircleHelp, LogOut, ShieldCheck } from "lucide-react";

export default function PRAMAANProfileMenu({ user = {}, onLogout }) {
  const [open, setOpen] = useState(false);
  const name = user?.name || "User";
  const role = user?.role === "employer" ? "Employer" : "Worker";
  return (
    <div className="relative">
      <button type="button" onClick={() => setOpen(v => !v)} className="flex items-center gap-3 rounded-xl px-2 py-1.5 transition hover:bg-white/[0.05]">
        <div className="grid h-9 w-9 place-items-center rounded-full border border-white/15 bg-gradient-to-br from-violet-500/30 to-cyan-400/20 text-sm font-bold text-white">{name[0]?.toUpperCase() || "U"}</div>
        <div className="hidden text-left sm:block"><div className="text-sm font-semibold text-white">{name}</div><div className="text-[11px] text-slate-400">{role}</div></div>
        <ChevronDown className={`h-4 w-4 text-slate-400 transition ${open ? "rotate-180" : ""}`} />
      </button>
      {open && (
        <div className="absolute right-0 top-[calc(100%+10px)] z-[100] w-64 rounded-2xl border border-violet-400/20 bg-[#0c1025]/95 p-2 shadow-2xl backdrop-blur-xl">
          <button onClick={() => window.dispatchEvent(new CustomEvent("pramaan:help"))} className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left text-sm text-slate-200 hover:bg-violet-500/10"><CircleHelp className="h-4 w-4 text-violet-300"/>Help & Support</button>
          <button onClick={() => window.dispatchEvent(new CustomEvent("pramaan:security"))} className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left text-sm text-slate-200 hover:bg-violet-500/10"><ShieldCheck className="h-4 w-4 text-cyan-300"/>Security & Privacy</button>
          <div className="my-1 h-px bg-white/5"/>
          <button onClick={() => onLogout?.()} className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left text-sm text-rose-300 hover:bg-rose-500/10"><LogOut className="h-4 w-4"/>Logout</button>
        </div>
      )}
    </div>
  );
}
