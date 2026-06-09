function TabelaLista({ colunas, dados, onEditar, onDeletar }) {
  if (dados.length === 0) return (
    <div style={{ textAlign: "center", color: "rgba(255,255,255,0.6)", padding: 40, fontSize: 16 }}>
      Nada cadastrado ainda. Adicione o primeiro item acima! 👆
    </div>
  );
 
  return (
    <div style={{ overflowX: "auto", marginTop: 24 }}>
      <table style={{ width: "100%", borderCollapse: "collapse" }}>
        <thead>
          <tr>
            {colunas.map(c => (
              <th key={c.key} style={{
                color: "#fff", textAlign: "left", padding: "10px 16px",
                borderBottom: "2px solid rgba(255,255,255,0.3)", fontSize: 13,
                textTransform: "uppercase", letterSpacing: "0.05em", whiteSpace: "nowrap",
              }}>{c.label}</th>
            ))}
            <th style={{ color: "#fff", padding: "10px 16px", borderBottom: "2px solid rgba(255,255,255,0.3)", fontSize: 13, textTransform: "uppercase" }}>Ações</th>
          </tr>
        </thead>
        <tbody>
          {dados.map((item, i) => (
            <tr key={item.id} style={{ background: i % 2 === 0 ? "rgba(255,255,255,0.07)" : "transparent", transition: "background 0.2s" }}
              onMouseEnter={e => e.currentTarget.style.background = "rgba(255,255,255,0.15)"}
              onMouseLeave={e => e.currentTarget.style.background = i % 2 === 0 ? "rgba(255,255,255,0.07)" : "transparent"}>
              {colunas.map(c => (
                <td key={c.key} style={{ color: "#fff", padding: "10px 16px", fontSize: 14, borderBottom: "1px solid rgba(255,255,255,0.08)" }}>
                  {c.render ? c.render(item[c.key], item) : item[c.key]}
                </td>
              ))}
              <td style={{ padding: "10px 16px", borderBottom: "1px solid rgba(255,255,255,0.08)", whiteSpace: "nowrap" }}>
                <button onClick={() => onEditar(item)} style={btnAcao("#FFA800")}>✏️ Editar</button>
                <button onClick={() => onDeletar(item.id)} style={btnAcao("#e53e3e")}>🗑️ Excluir</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
 
const btnAcao = (cor) => ({
  marginRight: 8, background: cor, border: "none", color: "#fff", padding: "5px 12px",
  borderRadius: 10, cursor: "pointer", fontSize: 12, fontWeight: 600, transition: "opacity 0.2s",
});

export default TabelaLista;