function SimOuNao({ onSim, onNao }) {
  return (
    <div style={{ ...bg, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", minHeight: "100vh" }}>
      <style>{FONTS}</style>
      <div style={{ animation: "slideDown 1s ease", textAlign: "center" }}>
        <LogoBranca h={120} />
        <p style={{ fontFamily: "'Alata', sans-serif", fontSize: 36, color: "#fff", marginTop: 30, lineHeight: 1.4 }}>
          A MARS SE PREOCUPA<br/>COM O CONSUMO<br/>CONSCIENTE
        </p>
        <h3 style={{ color: "#fff", fontWeight: 300, fontSize: 22, marginTop: 20, letterSpacing: "0.1em" }}>
          VOCÊ TEM MAIS DE 18 ANOS?
        </h3>
        <div style={{ marginTop: 36, display: "flex", gap: 24, justifyContent: "center" }}>
          {[["SIM", onSim], ["NÃO", onNao]].map(([txt, fn]) => (
            <button key={txt} onClick={fn} style={{
              fontFamily: "'Alata', sans-serif", color: "#fff", background: "transparent",
              border: "3px solid #fff", padding: "14px 48px", fontSize: 20,
              cursor: "pointer", transition: "all 0.3s", borderRadius: 4,
            }}
            onMouseEnter={e => { e.target.style.color="#000"; e.target.style.borderColor="#000"; e.target.style.borderRadius="20px"; e.target.style.transform="scale(1.1)"; }}
            onMouseLeave={e => { e.target.style.color="#fff"; e.target.style.borderColor="#fff"; e.target.style.borderRadius="4px"; e.target.style.transform="scale(1)"; }}>
              {txt}
            </button>
          ))}
        </div>
      </div>
      <footer style={{ position: "absolute", bottom: 20, color: "#fff", fontSize: 13, opacity: 0.7 }}>
        Criado e desenvolvido por Mars Design Gráfico @
      </footer>
    </div>
  );
}