import {useState} from "react";
import useLocalCollection from "../hooks/useLocalCollection";

const statusOpcoes = ["Aguardando", "Confirmado", "Em preparo", "Entregue", "Cancelado"];
const statusCor = { "Aguardando": "#FFA800", "Confirmado": "#3b82f6", "Em preparo": "#a855f7", "Entregue": "#22c55e", "Cancelado": "#e53e3e" };
const tdStyle = { color: "#fff", padding: "10px 14px", fontSize: 13, borderBottom: "1px solid rgba(255,255,255,0.08)" };

function Relatorio() {
  const { data: pedidos } = useLocalCollection("pedidos", []);
  const { data: clientes } = useLocalCollection("clientes", []);
  const { data: cervejas } = useLocalCollection("cervejas", []);
  const [filtroStatus, setFiltroStatus] = useState("Todos");
 
  // JOIN: pedido → cliente → cerveja
  const joined = pedidos.map(pedido => {
    const cliente = clientes.find(c => c.id === pedido.clienteId) || null;
    const cerveja = cervejas.find(c => c.id === pedido.cervejaId) || null;
    return {
      ...pedido,
      clienteEmail: cliente?.email || "—",
      clienteCidade: cliente?.cidade || "—",
      cervejaEstilo: cerveja?.estilo || "—",
      cervejaAbv: cerveja?.abv ? `${cerveja.abv}%` : "—",
      precoUnit: cerveja?.preco ? parseFloat(cerveja.preco) : 0,
      total: cerveja?.preco ? (parseFloat(cerveja.preco) * parseInt(pedido.qtd)).toFixed(2) : "—",
    };
  });
 
  const filtrado = filtroStatus === "Todos" ? joined : joined.filter(p => p.status === filtroStatus);
 
  const totalGeral = filtrado.reduce((acc, p) => acc + (p.precoUnit * parseInt(p.qtd)), 0);
 
  // Resumo por status
  const resumo = statusOpcoes.map(s => ({
    status: s, qtd: joined.filter(p => p.status === s).length,
  }));
 
  return (
    <div style={{ animation: "fadeIn 0.7s ease" }}>
      <h2 style={{ color: "#fff", fontFamily: "'Alata'", fontSize: 32, marginBottom: 8 }}>📊 Relatório de Pedidos</h2>
      <p style={{ color: "rgba(255,255,255,0.7)", marginBottom: 28 }}>
        Visão consolidada com JOIN entre <strong style={{ color: "#fff" }}>Pedidos</strong>, <strong style={{ color: "#fff" }}>Clientes</strong> e <strong style={{ color: "#fff" }}>Cervejas</strong>.
      </p>
 
      {/* Cards de resumo */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(140px, 1fr))", gap: 16, marginBottom: 32 }}>
        {[
          { label: "Total de pedidos", valor: joined.length, icon: "📋" },
          { label: "Clientes ativos", valor: clientes.length, icon: "👥" },
          { label: "Cervejas no catálogo", valor: cervejas.length, icon: "🍺" },
          { label: "Faturamento total", valor: `R$ ${joined.reduce((a, p) => a + p.precoUnit * parseInt(p.qtd || 0), 0).toFixed(2)}`, icon: "💰" },
        ].map(({ label, valor, icon }) => (
          <div key={label} style={{
            background: "rgba(255,255,255,0.15)", borderRadius: 16, padding: "20px 16px",
            textAlign: "center", backdropFilter: "blur(4px)", border: "1px solid rgba(255,255,255,0.2)",
          }}>
            <div style={{ fontSize: 28 }}>{icon}</div>
            <div style={{ color: "#fff", fontWeight: 700, fontSize: 22, marginTop: 8 }}>{valor}</div>
            <div style={{ color: "rgba(255,255,255,0.7)", fontSize: 12, marginTop: 4 }}>{label}</div>
          </div>
        ))}
      </div>
 
      {/* Filtro */}
      <div style={{ marginBottom: 20, display: "flex", gap: 10, flexWrap: "wrap" }}>
        {["Todos", ...statusOpcoes].map(s => (
          <button key={s} onClick={() => setFiltroStatus(s)} style={{
            background: filtroStatus === s ? "#FFA800" : "rgba(255,255,255,0.15)",
            border: "none", color: "#fff", padding: "6px 18px", borderRadius: 20,
            cursor: "pointer", fontSize: 13, fontWeight: 600, transition: "background 0.2s",
          }}>{s}</button>
        ))}
      </div>
 
      {/* Tabela JOIN */}
      {filtrado.length === 0
        ? <p style={{ color: "rgba(255,255,255,0.6)", textAlign: "center", padding: 40 }}>Nenhum pedido encontrado com esse filtro.</p>
        : (
          <div style={{ overflowX: "auto" }}>
            <table style={{ width: "100%", borderCollapse: "collapse" }}>
              <thead>
                <tr>
                  {["Cliente", "E-mail", "Cidade", "Cerveja", "Estilo", "ABV", "Qtd", "Status", "Total"].map(col => (
                    <th key={col} style={{
                      color: "#fff", textAlign: "left", padding: "10px 14px",
                      borderBottom: "2px solid rgba(255,255,255,0.3)", fontSize: 12,
                      textTransform: "uppercase", letterSpacing: "0.05em", whiteSpace: "nowrap",
                    }}>{col}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {filtrado.map((p, i) => (
                  <tr key={p.id} style={{ background: i % 2 === 0 ? "rgba(255,255,255,0.07)" : "transparent" }}>
                    <td style={tdStyle}>{p.nomeCliente}</td>
                    <td style={tdStyle}>{p.clienteEmail}</td>
                    <td style={tdStyle}>{p.clienteCidade}</td>
                    <td style={{ ...tdStyle, fontWeight: 600 }}>{p.nomeCerveja}</td>
                    <td style={tdStyle}>{p.cervejaEstilo}</td>
                    <td style={tdStyle}>{p.cervejaAbv}</td>
                    <td style={tdStyle}>{p.qtd}</td>
                    <td style={tdStyle}>
                      <span style={{ background: statusCor[p.status] || "#888", borderRadius: 12, padding: "3px 10px", fontSize: 11, fontWeight: 700 }}>
                        {p.status}
                      </span>
                    </td>
                    <td style={{ ...tdStyle, fontWeight: 700, color: "#FFA800" }}>
                      {p.total !== "—" ? `R$ ${p.total}` : "—"}
                    </td>
                  </tr>
                ))}
              </tbody>
              <tfoot>
                <tr>
                  <td colSpan={8} style={{ color: "rgba(255,255,255,0.7)", padding: "12px 14px", fontSize: 13, borderTop: "2px solid rgba(255,255,255,0.3)" }}>
                    {filtrado.length} pedido(s) | Filtro: {filtroStatus}
                  </td>
                  <td style={{ color: "#FFA800", padding: "12px 14px", fontWeight: 700, borderTop: "2px solid rgba(255,255,255,0.3)" }}>
                    R$ {totalGeral.toFixed(2)}
                  </td>
                </tr>
              </tfoot>
            </table>
          </div>
        )
      }
 
      {/* Resumo por status */}
      <div style={{ marginTop: 40 }}>
        <h3 style={{ color: "#fff", fontFamily: "'Alata'", marginBottom: 16 }}>Pedidos por Status</h3>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 12 }}>
          {resumo.map(({ status, qtd }) => (
            <div key={status} style={{
              background: statusCor[status] || "#888", borderRadius: 12, padding: "10px 20px",
              display: "flex", alignItems: "center", gap: 8,
            }}>
              <span style={{ color: "#fff", fontWeight: 700, fontSize: 22 }}>{qtd}</span>
              <span style={{ color: "rgba(255,255,255,0.9)", fontSize: 13 }}>{status}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Relatorio