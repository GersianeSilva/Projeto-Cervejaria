function Navbar({ pagina, setPagina }) {
  const { user, logout } = useAuth();
  const [menu, setMenu] = useState(false);
 
  const navStyle = {
    display: "flex", alignItems: "center", justifyContent: "space-between",
    padding: "18px 40px", animation: "slideDown 0.6s ease",
  };
  const linkBase = {
    color: "#fff", textDecoration: "none", fontWeight: 600,
    fontSize: 15, letterSpacing: "0.05em", cursor: "pointer",
    transition: "opacity 0.2s", background: "none", border: "none",
    fontFamily: "inherit",
  };
  const pages = user
    ? [["inicio","INÍCIO"], ["sobre","SOBRE A MARS"], ["cervejas","CERVEJAS"],
       ["clientes","CLIENTES"], ["pedidos","PEDIDOS"], ["relatorio","RELATÓRIO"], ["contatos","CONTATOS"]]
    : [["inicio","INÍCIO"], ["sobre","SOBRE A MARS"], ["contatos","CONTATOS"]];
 
  return (
    <nav style={navStyle}>
      <LogoBranca h={54} />
      {/* Desktop */}
      <div style={{ display: "flex", gap: 28, flexWrap: "wrap", alignItems: "center" }}>
        {pages.map(([pg, label]) => (
          <button key={pg} style={{
            ...linkBase,
            opacity: pagina === pg ? 1 : 0.75,
            borderBottom: pagina === pg ? "2px solid #fff" : "2px solid transparent",
            paddingBottom: 2,
          }} onClick={() => setPagina(pg)}>{label} |</button>
        ))}
        {user && (
          <button onClick={logout} style={{
            ...linkBase, background: "rgba(255,255,255,0.2)",
            padding: "6px 16px", borderRadius: 20, border: "none", opacity: 0.9,
          }}>Sair ({user.nome})</button>
        )}
        {!user && (
          <button onClick={() => setPagina("login")} style={{
            ...linkBase, background: "rgba(255,255,255,0.2)",
            padding: "6px 16px", borderRadius: 20, border: "none",
          }}>Login</button>
        )}
      </div>
    </nav>
  );
}

export default Navbar;