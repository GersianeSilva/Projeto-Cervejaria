import { useState } from "react";
import useLocalCollection from "../hooks/useLocalCollection";
import TabelaLista from "../components/TabelaLista";

const statusOpcoes = ["Aguardando", "Confirmado", "Em preparo", "Entregue", "Cancelado"];
const statusCor = { "Aguardando": "#FFA800", "Confirmado": "#3b82f6", "Em preparo": "#a855f7", "Entregue": "#22c55e", "Cancelado": "#e53e3e" };
const cardForm = {
  background: "#fff", borderRadius: 20, padding: "30px 32px",
  boxShadow: "0 8px 32px rgba(0,0,0,0.15)", marginBottom: 8,
};
const labelStyle = { display: "block", fontSize: 12, color: "#666", marginBottom: 6, fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.04em" };
const inputStyle = {
  width: "100%", border: "2px solid #eee", borderRadius: 10, padding: "9px 14px",
  fontSize: 14, outline: "none", fontFamily: "'Quicksand', sans-serif", transition: "border-color 0.2s",
};
const btnPrimario = {
  background: "linear-gradient(135deg, #FFA800, #FF2525)", border: "none", color: "#fff",
  padding: "10px 28px", borderRadius: 20, cursor: "pointer", fontWeight: 700, fontSize: 14,
  fontFamily: "inherit", transition: "transform 0.2s, opacity 0.2s",
};
const btnSecundario = {
  background: "transparent", border: "2px solid #ccc", color: "#888",
  padding: "10px 24px", borderRadius: 20, cursor: "pointer", fontWeight: 600, fontSize: 14,
  fontFamily: "inherit",
}; 

function CrudPedidos() {
  const { data: pedidos, add, update, remove } = useLocalCollection("pedidos", [
    { id: "p1", clienteId: "cl1", nomeCliente: "João Silva", cervejaId: "c1", nomeCerveja: "Sol da Tarde", qtd: "2", status: "Entregue", obs: "" },
    { id: "p2", clienteId: "cl2", nomeCliente: "Maria Oliveira", cervejaId: "c2", nomeCerveja: "Florest", qtd: "1", status: "Confirmado", obs: "Sem gelo" },
  ]);
  const { data: clientes } = useLocalCollection("clientes", []);
  const { data: cervejas } = useLocalCollection("cervejas", []);
 
  const vazio = { clienteId: "", nomeCliente: "", cervejaId: "", nomeCerveja: "", qtd: "1", status: "Aguardando", obs: "" };
  const [form, setForm] = useState(vazio);
  const [editId, setEditId] = useState(null);
  const [erros, setErros] = useState({});
 
  const validar = () => {
    const e = {};
    if (!form.nomeCliente.trim()) e.nomeCliente = "Selecione ou informe o cliente";
    if (!form.nomeCerveja.trim()) e.nomeCerveja = "Selecione a cerveja";
    if (!form.qtd || isNaN(form.qtd) || Number(form.qtd) < 1) e.qtd = "Quantidade inválida";
    setErros(e);
    return Object.keys(e).length === 0;
  };
 
  const setCliente = (id) => {
    const c = clientes.find(x => x.id === id);
    setForm(f => ({ ...f, clienteId: id, nomeCliente: c ? c.nome : "" }));
  };
 
  const setCerveja = (id) => {
    const c = cervejas.find(x => x.id === id);
    setForm(f => ({ ...f, cervejaId: id, nomeCerveja: c ? c.nome : "" }));
  };
 
  const salvar = () => {
    if (!validar()) return;
    if (editId) { update(editId, form); setEditId(null); }
    else add(form);
    setForm(vazio);
  };
 
  const iniciarEdicao = (item) => {
    setForm({ clienteId: item.clienteId, nomeCliente: item.nomeCliente, cervejaId: item.cervejaId, nomeCerveja: item.nomeCerveja, qtd: item.qtd, status: item.status, obs: item.obs || "" });
    setEditId(item.id);
  };
 
  return (
    <div style={{ animation: "fadeIn 0.7s ease" }}>
      <h2 style={{ color: "#fff", fontFamily: "'Alata'", fontSize: 32, marginBottom: 8 }}>📋 Gerenciar Pedidos</h2>
      <p style={{ color: "rgba(255,255,255,0.7)", marginBottom: 28 }}>Registre e acompanhe os pedidos dos clientes.</p>
 
      <div style={cardForm}>
        <h3 style={{ color: "#FFA800", marginBottom: 20, fontFamily: "'Alata'" }}>
          {editId ? "✏️ Editando pedido" : "➕ Novo pedido"}
        </h3>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 16 }}>
          {/* Cliente */}
          <div>
            <label style={labelStyle}>Cliente</label>
            {clientes.length > 0 ? (
              <select value={form.clienteId} onChange={e => setCliente(e.target.value)} style={{ ...inputStyle, borderColor: erros.nomeCliente ? "#e53e3e" : "#ddd" }}>
                <option value="">Selecione...</option>
                {clientes.map(c => <option key={c.id} value={c.id}>{c.nome}</option>)}
              </select>
            ) : (
              <input value={form.nomeCliente} onChange={e => setForm({ ...form, nomeCliente: e.target.value })}
                placeholder="Nome do cliente" style={{ ...inputStyle, borderColor: erros.nomeCliente ? "#e53e3e" : "#ddd" }} />
            )}
            {erros.nomeCliente && <p style={{ color: "#e53e3e", fontSize: 12, marginTop: 4 }}>{erros.nomeCliente}</p>}
          </div>
          {/* Cerveja */}
          <div>
            <label style={labelStyle}>Cerveja</label>
            {cervejas.length > 0 ? (
              <select value={form.cervejaId} onChange={e => setCerveja(e.target.value)} style={{ ...inputStyle, borderColor: erros.nomeCerveja ? "#e53e3e" : "#ddd" }}>
                <option value="">Selecione...</option>
                {cervejas.map(c => <option key={c.id} value={c.id}>{c.nome}</option>)}
              </select>
            ) : (
              <input value={form.nomeCerveja} onChange={e => setForm({ ...form, nomeCerveja: e.target.value })}
                placeholder="Nome da cerveja" style={inputStyle} />
            )}
            {erros.nomeCerveja && <p style={{ color: "#e53e3e", fontSize: 12, marginTop: 4 }}>{erros.nomeCerveja}</p>}
          </div>
          {/* Qtd */}
          <div>
            <label style={labelStyle}>Quantidade</label>
            <input type="number" min="1" value={form.qtd} onChange={e => setForm({ ...form, qtd: e.target.value })}
              style={{ ...inputStyle, borderColor: erros.qtd ? "#e53e3e" : "#ddd" }} />
            {erros.qtd && <p style={{ color: "#e53e3e", fontSize: 12, marginTop: 4 }}>{erros.qtd}</p>}
          </div>
          {/* Status */}
          <div>
            <label style={labelStyle}>Status</label>
            <select value={form.status} onChange={e => setForm({ ...form, status: e.target.value })} style={inputStyle}>
              {statusOpcoes.map(s => <option key={s}>{s}</option>)}
            </select>
          </div>
        </div>
        <div style={{ marginTop: 16 }}>
          <label style={labelStyle}>Observação</label>
          <input value={form.obs} onChange={e => setForm({ ...form, obs: e.target.value })}
            placeholder="Ex: Sem gelo, entregar até as 18h..." style={inputStyle} />
        </div>
        <div style={{ marginTop: 20, display: "flex", gap: 12 }}>
          <button onClick={salvar} style={btnPrimario}>{editId ? "Salvar" : "Registrar pedido"}</button>
          {editId && <button onClick={() => { setEditId(null); setForm(vazio); }} style={btnSecundario}>Cancelar</button>}
        </div>
      </div>
 
      <TabelaLista
        colunas={[
          { key: "nomeCliente", label: "Cliente" },
          { key: "nomeCerveja", label: "Cerveja" },
          { key: "qtd", label: "Qtd", render: v => `${v} un.` },
          { key: "status", label: "Status", render: v => (
            <span style={{ background: statusCor[v] || "#888", borderRadius: 12, padding: "3px 12px", fontSize: 12, fontWeight: 600 }}>{v}</span>
          )},
          { key: "obs", label: "Obs." },
        ]}
        dados={pedidos}
        onEditar={iniciarEdicao}
        onDeletar={remove}
      />
    </div>
  );
}

export default CrudPedidos;