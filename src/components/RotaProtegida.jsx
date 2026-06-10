function RotaProtegida({ children, setPagina }) {
  const { user } = useAuth();
  if (!user) return (
    <div style={{ textAlign: "center", color: "#fff", padding: 60, animation: "fadeIn 0.5s ease" }}>
      <div style={{ fontSize: 60, marginBottom: 16 }}>🔐</div>
      <h2 style={{ fontFamily: "'Alata'", fontSize: 28 }}>Área Restrita</h2>
      <p style={{ marginTop: 12, opacity: 0.8 }}>Você precisa estar logado para acessar essa página.</p>
      <button onClick={() => setPagina("login")} style={{ ...btnPrimario, marginTop: 24 }}>Fazer Login</button>
    </div>
  );
  return children;
}

export default RotaProtegida;