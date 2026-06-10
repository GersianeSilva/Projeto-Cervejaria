function Inicio({ setPagina }) {
  return (
    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 40, paddingTop: 40, animation: "fadeIn 0.8s ease" }}>
      <div style={{ flex: 1, minWidth: 260 }}>
        <LogoBranca h={100} />
        <p style={{
          fontFamily: "'Alata', sans-serif", fontSize: "clamp(48px, 6vw, 90px)",
          color: "#fff", fontWeight: 600, lineHeight: 1.1, marginTop: 24,
        }}>
          A CADA<br/>GOLE<br/>UMA SENSAÇÃO<br/>ÚNICA
        </p>
        <button onClick={() => setPagina("sobre")} style={{
          marginTop: 32, background: "rgba(255,255,255,0.15)", border: "2px solid #fff",
          color: "#fff", padding: "12px 36px", borderRadius: 30, fontSize: 16,
          cursor: "pointer", fontFamily: "inherit", fontWeight: 600, transition: "all 0.3s",
          backdropFilter: "blur(4px)",
        }}
        onMouseEnter={e => e.target.style.background="rgba(255,255,255,0.35)"}
        onMouseLeave={e => e.target.style.background="rgba(255,255,255,0.15)"}>
          Conheça nossas cervejas →
        </button>
      </div>
      {/* Garrafinhas decorativas */}
      <div style={{ display: "flex", gap: 16, alignItems: "flex-end", animation: "slideUp 1s ease" }}>
        {["🍺", "🍻", "🍺"].map((e, i) => (
          <div key={i} style={{
            fontSize: `${80 + i * 20}px`, filter: "drop-shadow(0 8px 20px rgba(0,0,0,0.3))",
            transform: i === 1 ? "scale(1.15)" : "scale(1)", transition: "transform 0.3s",
            cursor: "default",
            animation: `fadeIn ${0.5 + i * 0.2}s ease`,
          }}>
            {e}
          </div>
        ))}
      </div>
    </div>
  );
} 

export default Inicio;