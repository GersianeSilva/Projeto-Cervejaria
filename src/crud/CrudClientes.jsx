import { useState } from "react";
import useLocalCollection from "../hooks/useLocalCollection";

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
 
function CrudClientes() {
  const { data: clientes, add, update, remove } = useLocalCollection("clientes", [
    { id: "cl1", nome: "João Silva", email: "joao@email.com", telefone: "61 99999-1111", cidade: "Brasília" },
    { id: "cl2", nome: "Maria Oliveira", email: "maria@email.com", telefone: "61 98888-2222", cidade: "Taguatinga" },
  ]);
 
  const vazio = { nome: "", email: "", telefone: "", cidade: "" };
  const [form, setForm] = useState(vazio);
  const [editId, setEditId] = useState(null);
  const [erros, setErros] = useState({});
 
  const validar = () => {
    const e = {};
    if (!form.nome.trim()) e.nome = "Nome obrigatório";
    if (!form.email.includes("@")) e.email = "E-mail inválido";
    if (!form.telefone.trim()) e.telefone = "Telefone obrigatório";
    setErros(e);
    return Object.keys(e).length === 0;
  };
 
  const salvar = () => {
    if (!validar()) return;
    if (editId) { update(editId, form); setEditId(null); }
    else add(form);
    setForm(vazio);
  };
 
  const iniciarEdicao = (item) => {
    setForm({ nome: item.nome, email: item.email, telefone: item.telefone, cidade: item.cidade });
    setEditId(item.id);
  };
 
  return (
    <div style={{ animation: "fadeIn 0.7s ease" }}>
      <h2 style={{ color: "#fff", fontFamily: "'Alata'", fontSize: 32, marginBottom: 8 }}>👥 Gerenciar Clientes</h2>
      <p style={{ color: "rgba(255,255,255,0.7)", marginBottom: 28 }}>Cadastre os clientes da Mars Cervejaria.</p>
 
      <div style={cardForm}>
        <h3 style={{ color: "#FFA800", marginBottom: 20, fontFamily: "'Alata'" }}>
          {editId ? "✏️ Editando cliente" : "➕ Novo cliente"}
        </h3>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 16 }}>
          {[
            { key: "nome", label: "Nome completo", ph: "Ex: João Silva" },
            { key: "email", label: "E-mail", ph: "joao@email.com" },
            { key: "telefone", label: "Telefone", ph: "61 9xxxx-xxxx" },
            { key: "cidade", label: "Cidade", ph: "Ex: Brasília" },
          ].map(({ key, label, ph }) => (
            <div key={key}>
              <label style={labelStyle}>{label}</label>
              <input value={form[key]} onChange={e => setForm({ ...form, [key]: e.target.value })}
                placeholder={ph} style={{ ...inputStyle, borderColor: erros[key] ? "#e53e3e" : "#ddd" }} />
              {erros[key] && <p style={{ color: "#e53e3e", fontSize: 12, marginTop: 4 }}>{erros[key]}</p>}
            </div>
          ))}
        </div>
        <div style={{ marginTop: 20, display: "flex", gap: 12 }}>
          <button onClick={salvar} style={btnPrimario}>{editId ? "Salvar" : "Cadastrar cliente"}</button>
          {editId && <button onClick={() => { setEditId(null); setForm(vazio); }} style={btnSecundario}>Cancelar</button>}
        </div>
      </div>
 
      {/* Cards de clientes */}
      {clientes.length === 0
        ? <p style={{ color: "rgba(255,255,255,0.6)", textAlign: "center", marginTop: 40 }}>Nenhum cliente ainda. Adicione o primeiro! 👆</p>
        : <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: 20, marginTop: 24 }}>
            {clientes.map(c => <ClienteCard key={c.id} cliente={c} onEditar={iniciarEdicao} onDeletar={remove} />)}
          </div>
      }
    </div>
  );
}

export default CrudClientes;