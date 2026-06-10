function ClienteCard({ cliente, onEditar, onDeletar }) {
  return (
    <div style={{
      background: "rgba(255,255,255,0.12)", borderRadius: 16, padding: "20px 24px",
      backdropFilter: "blur(4px)", border: "1px solid rgba(255,255,255,0.2)",
      transition: "transform 0.2s, background 0.2s",
    }}
    onMouseEnter={e => e.currentTarget.style.background = "rgba(255,255,255,0.2)"}
    onMouseLeave={e => e.currentTarget.style.background = "rgba(255,255,255,0.12)"}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
        <div>
          <p style={{ color: "#fff", fontWeight: 700, fontSize: 16 }}>👤 {cliente.nome}</p>
          <p style={{ color: "rgba(255,255,255,0.7)", fontSize: 13, marginTop: 4 }}>✉️ {cliente.email}</p>
          <p style={{ color: "rgba(255,255,255,0.7)", fontSize: 13 }}>📞 {cliente.telefone}</p>
          {cliente.cidade && <p style={{ color: "rgba(255,255,255,0.7)", fontSize: 13 }}>📍 {cliente.cidade}</p>}
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          <button onClick={() => onEditar(cliente)} style={btnAcao("#FFA800")}>✏️</button>
          <button onClick={() => onDeletar(cliente.id)} style={btnAcao("#e53e3e")}>🗑️</button>
        </div>
      </div>
    </div>
  );
}

export default ClienteCard;