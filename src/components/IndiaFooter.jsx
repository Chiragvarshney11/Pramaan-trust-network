export default function IndiaFooter() {
  return (
    <footer className="border-t border-white/[0.06] bg-[#070a18]/80 px-5 py-5">
      <div className="mx-auto flex max-w-[1500px] flex-col items-center justify-between gap-3 text-xs text-slate-500 sm:flex-row">
        <div className="flex items-center gap-2">
          <span className="font-semibold tracking-wide text-slate-300">PRAMAAN</span>
          <span className="text-slate-600">•</span>
          <span>Verified Work Identity</span>
        </div>
        <div className="flex items-center gap-2 font-medium text-slate-300">
          <span>MADE IN INDIA</span>
          <span className="text-base" aria-label="Indian flag">🇮🇳</span>
        </div>
        <div className="text-slate-600">Trust • Privacy • Verification</div>
      </div>
    </footer>
  );
}
