import { useState } from "react";
import useLocalCollection from "../hooks/useLocalCollection";
import TabelaLista from "../components/TabelaLista";

const estilos = ["Pilsen", "Tripel", "Weizenbier", "IPA", "Stout", "Lager", "Sour", "Porter"];
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

function CrudCervejas() {
  const { data: cervejas, add, update, remove } = useLocalCollection("cervejas", [
    { id: "c1", nome: "Sol da Tarde", estilo: "Pilsen", abv: "4.8", preco: "18.00", descricao: "Cerveja dourada com toque cítrico." },
    { id: "c2", nome: "Florest", estilo: "Tripel", abv: "8.0", preco: "28.00", descricao: "Belgica e encorpada." },
    { id: "c3", nome: "Blue Dark", estilo: "Weizenbier", abv: "5.5", preco: "22.00", descricao: "Refrescante com aromas frutados." },
  ]);
 
  const vazio = { nome: "", estilo: "Pilsen", abv: "", preco: "", descricao: "" };
  const [form, setForm] = useState(vazio);
  const [editId, setEditId] = useState(null);
  const [erros, setErros] = useState({});
 
  const validar = () => {
    const e = {};
    if (!form.nome.trim()) e.nome = "Nome obrigatório";
    if (!form.abv || isNaN(form.abv)) e.abv = "ABV inválido";
    if (!form.preco || isNaN(form.preco)) e.preco = "Preço inválido";
    setErros(e);
    return Object.keys(e).length === 0;
  };
 
  const salvar = () => {
    if (!validar()) return;
    if (editId) { update(editId, form); setEditId(null); }
    else add(form);
    setForm(vazio);
  };
 
  const iniciarEdicao = (item) => { setForm({ nome: item.nome, estilo: item.estilo, abv: item.abv, preco: item.preco, descricao: item.descricao }); setEditId(item.id); };
  const cancelar = () => { setForm(vazio); setEditId(null); setErros({}); };
 
  return (
    <div style={{ animation: "fadeIn 0.7s ease" }}>
      <h2 style={{ color: "#fff", fontFamily: "'Alata'", fontSize: 32, marginBottom: 8 }}>🍺 Gerenciar Cervejas</h2>
      <p style={{ color: "rgba(255,255,255,0.7)", marginBottom: 28 }}>Cadastre e gerencie o catálogo de cervejas da Mars.</p>
 
      {/* Formulário */}
      <div style={cardForm}>
        <h3 style={{ color: "#FFA800", marginBottom: 20, fontFamily: "'Alata'" }}>
          {editId ? "✏️ Editando cerveja" : "➕ Nova cerveja"}
        </h3>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 16 }}>
          {[
            { key: "nome", label: "Nome", ph: "Ex: Sol da Tarde" },
            { key: "abv", label: "ABV (%)", ph: "Ex: 5.5", type: "number" },
            { key: "preco", label: "Preço (R$)", ph: "Ex: 18.90", type: "number" },
          ].map(({ key, label, ph, type = "text" }) => (
            <div key={key}>
              <label style={labelStyle}>{label}</label>
              <input type={type} value={form[key]} onChange={e => setForm({ ...form, [key]: e.target.value })}
                placeholder={ph} style={{ ...inputStyle, borderColor: erros[key] ? "#e53e3e" : "#ddd" }} />
              {erros[key] && <p style={{ color: "#e53e3e", fontSize: 12, marginTop: 4 }}>{erros[key]}</p>}
            </div>
          ))}
          <div>
            <label style={labelStyle}>Estilo</label>
            <select value={form.estilo} onChange={e => setForm({ ...form, estilo: e.target.value })} style={inputStyle}>
              {estilos.map(e => <option key={e}>{e}</option>)}
            </select>
          </div>
        </div>
        <div style={{ marginTop: 16 }}>
          <label style={labelStyle}>Descrição</label>
          <input value={form.descricao} onChange={e => setForm({ ...form, descricao: e.target.value })}
            placeholder="Uma breve descrição..." style={inputStyle} />
        </div>
        <div style={{ marginTop: 20, display: "flex", gap: 12 }}>
          <button onClick={salvar} style={btnPrimario}>{editId ? "Salvar alterações" : "Cadastrar cerveja"}</button>
          {editId && <button onClick={cancelar} style={btnSecundario}>Cancelar</button>}
        </div>
      </div>
 
      {/* Tabela */}
      <TabelaLista
        colunas={[
          { key: "nome", label: "Nome" },
          { key: "estilo", label: "Estilo" },
          { key: "abv", label: "ABV", render: v => `${v}%` },
          { key: "preco", label: "Preço", render: v => `R$ ${parseFloat(v).toFixed(2)}` },
          { key: "descricao", label: "Descrição" },
        ]}
        dados={cervejas}
        onEditar={iniciarEdicao}
        onDeletar={remove}
      />
    </div>
  );
}

export default CrudCervejas;