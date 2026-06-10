function Layout({ pagina, setPagina, children }) {
  return (
    <div style={{ ...bg, minHeight: "100vh", display: "flex", flexDirection: "column" }}>
      <style>{FONTS}</style>
      <Navbar pagina={pagina} setPagina={setPagina} />
      <hr style={{ borderColor: "rgba(255,255,255,0.4)", borderWidth: 1, borderStyle: "solid", margin: "0 40px" }} />
      <div style={{ flex: 1, padding: "40px" }}>
        {children}
      </div>
      <footer style={{ textAlign: "center", color: "#fff", padding: 20, opacity: 0.8, fontSize: 13 }}>
        Criado e desenvolvido por Mars Design Gráfico @
      </footer>
    </div>
  );
}

export default Layout;