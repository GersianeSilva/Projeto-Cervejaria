function Contatos() {
  return (
    <div style={{ animation: "fadeIn 0.7s ease", display: "flex", flexWrap: "wrap", gap: 40 }}>
      <div style={{ flex: 1, minWidth: 280 }}>
        <h1 style={{ color: "#fff", fontFamily: "'Alata'", fontSize: 36, marginBottom: 24 }}>Fale com a gente</h1>
        <div style={{ background: "rgba(255,255,255,0.15)", borderRadius: 20, padding: 28, backdropFilter: "blur(6px)" }}>
          {[
            ["📍", "Localização", "St. B Norte, Centro Universitário Projeção – Taguatinga, Brasília/DF"],
            ["📸", "Instagram", "@_marsdesigner"],
            ["💬", "WhatsApp", "+55 61 98373-1359"],
          ].map(([icon, label, val]) => (
            <div key={label} style={{ marginBottom: 20 }}>
              <p style={{ color: "rgba(255,255,255,0.7)", fontSize: 12, letterSpacing: "0.1em", textTransform: "uppercase" }}>{icon} {label}</p>
              <p style={{ color: "#fff", fontWeight: 600, fontSize: 16, marginTop: 4 }}>{val}</p>
            </div>
          ))}
        </div>
      </div>
      <div style={{ flex: 2, minWidth: 300 }}>
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m23!1m12!1m3!1d61415.35107865831!2d-48.10150281774389!3d-15.832431940589649!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!4m8!3e2!4m0!4m5!1s0x935a3321354999e9%3A0x881fa531a22a3f88!2sSt.%20B%20Norte%20Centro%20Universit%C3%A1rio%20Proje%C3%A7%C3%A3o%20-%20Taguatinga%20-%20Taguatinga%2C%20Bras%C3%ADlia%20-%20DF%2C%2070297-400!3m2!1d-15.8193551!2d-48.0652797!5e0!3m2!1spt-BR!2sbr!4v1667759768794!5m2!1spt-BR!2sbr"
          width="100%" height="350"
          style={{ border: 0, borderRadius: 20 }}
          allowFullScreen loading="lazy"
        />
      </div>
    </div>
  );
}

export default Contatos;