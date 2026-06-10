function NaoPage({ onVoltar }) {
  return (
    <div style={{ ...bg, display: "flex", alignItems: "center", justifyContent: "center", minHeight: "100vh", flexDirection: "column" }}>
      <style>{FONTS}</style>
      <div style={{ animation: "slideDown 1s ease", textAlign: "center", color: "#fff" }}>
        <div style={{ fontSize: 100 }}>😢</div>
        <p style={{ fontFamily: "'Alata'", fontSize: 32, marginTop: 20 }}>Poxa, que pena!</p>
        <p style={{ fontSize: 16, opacity: 0.85, marginTop: 12 }}>Você precisa ter 18 anos para acessar nosso site.</p>
        <button onClick={onVoltar} style={{
          marginTop: 30, background: "rgba(255,255,255,0.2)", border: "2px solid #fff",
          color: "#fff", padding: "10px 30px", borderRadius: 20, fontSize: 16, cursor: "pointer",
        }}>Voltar</button>
      </div>
    </div>
  );
}