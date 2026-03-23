export default function PageLoader() {
  return (
    <div className="min-h-screen flex items-center justify-center" style={{ background:"var(--bg-0)" }}>
      <div className="flex flex-col items-center gap-4">
        <div className="w-9 h-9 border-2 rounded-full animate-spin"
          style={{ borderColor:"var(--border)", borderTopColor:"var(--cyan)" }}/>
        <span className="text-xs font-mono" style={{ color:"var(--text-muted)" }}>Loading...</span>
      </div>
    </div>
  );
}
