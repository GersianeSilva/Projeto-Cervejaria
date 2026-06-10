function Login({ onLogin }) {
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [erro, setErro] = useState("");
  const [carregando, setCarregando] = useState(false);
 
  const handleSubmit = () => {
    setErro("");
    if (!email.trim()) return setErro("Informe seu e-mail.");
    if (!email.includes("@")) return setErro("E-mail inválido.");
    if (senha.length < 4) return setErro("Senha deve ter pelo menos 4 caracteres.");
    setCarregando(true);
    setTimeout(() => {
      if (login(email, senha)) { onLogin(); }
      else { setErro("Não foi possível fazer login. Verifique seus dados."); }
      setCarregando(false);
    }, 600);
  };
 
  return (
    <div style={{ display: "flex", justifyContent: "center", alignItems: "center", minHeight: "60vh", animation: "fadeIn 0.7s ease" }}>
      <div style={{
        background: "#fff", borderRadius: 24, padding: "50px 48px",
        width: "100%", maxWidth: 400, boxShadow: "0 20px 60px rgba(0,0,0,0.2)",
        animation: "slideUp 0.6s ease",
      }}>
        <div style={{ textAlign: "center", marginBottom: 32 }}>
          <svg height={60} viewBox="0 0 224 309" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M0 40.328V227.25C0 240.058 1.88183 248.254 9.65369 258.522C14.9696 265.555 36.3608 280.466 43.7287 285.295L81.1048 307.762L63.4879 281.234C48.4864 253.911 46.1049 242.897 45.5786 219.219L44.5154 83.0895C44.4919 79.5358 43.624 76.0392 41.9838 72.89C40.3437 69.7407 37.9785 67.0299 35.085 64.9827L0 40.328Z" fill="#FFA800"/>
            <path d="M223.661 41.5501V228.483C223.661 241.29 221.78 249.487 214.008 259.755C208.692 266.788 187.295 281.698 179.933 286.533L142.557 309L160.174 282.472C175.175 255.128 177.551 244.113 178.083 223.642L177.689 92.7539C177.689 79.0871 182.825 69.2733 191.458 63.4031L223.661 41.5501Z" fill="#FF2525"/>
            <path opacity="0.98" d="M111.347 0C111.347 0 78.08 53.5946 54.387 77.3794L96.4943 116.336L78.9943 92.8553L102.065 84.6211C102.065 84.6211 77.155 79.8929 111.331 50.9263C111.331 50.9263 147.782 77.9131 122.112 84.7758L143.758 92.1295L127.81 118.465C139.702 106.575 161.439 84.6798 168.28 77.3741C145.06 54.0535 111.347 0 111.347 0Z" fill="#FFA800"/>
            <path d="M48.6936 80.2025L111.347 147.133L173.341 81.2698V99.7288C173.341 110.066 175.196 136.77 162.55 147.405L111.347 195.695L59.251 147.021C48.6989 134.715 48.6989 106.997 48.6989 96.9698L48.6936 80.2025Z" fill="#FF6600"/>
          </svg>
          <h2 style={{ color: "#FFA800", fontFamily: "'Alata'", fontSize: 28, marginTop: 12 }}>Mars Cervejaria</h2>
          <p style={{ color: "#888", fontSize: 14, marginTop: 4 }}>Acesso à área administrativa</p>
        </div>
 
        {[
          { label: "E-mail", val: email, set: setEmail, type: "email", ph: "seu@email.com", icon: "✉️" },
          { label: "Senha", val: senha, set: setSenha, type: "password", ph: "••••••", icon: "🔒" },
        ].map(({ label, val, set, type, ph, icon }) => (
          <div key={label} style={{ marginBottom: 16 }}>
            <label style={{ display: "block", fontSize: 13, color: "#555", marginBottom: 6, fontWeight: 600 }}>{label}</label>
            <div style={{ display: "flex", alignItems: "center", border: "2px solid #eee", borderRadius: 12, padding: "8px 14px", gap: 8, transition: "border-color 0.2s" }}
              onFocus={() => {}} >
              <span>{icon}</span>
              <input type={type} value={val} onChange={e => set(e.target.value)}
                placeholder={ph}
                onKeyDown={e => e.key === "Enter" && handleSubmit()}
                style={{ border: "none", outline: "none", flex: 1, fontSize: 15, fontFamily: "'Quicksand', sans-serif" }} />
            </div>
          </div>
        ))}
 
        {erro && <p style={{ color: "#e53e3e", fontSize: 13, marginBottom: 12, textAlign: "center" }}>{erro}</p>}
 
        <button onClick={handleSubmit} disabled={carregando} style={{
          width: "100%", padding: "12px 0", borderRadius: 20, border: "none", cursor: "pointer",
          background: "linear-gradient(135deg, #FFA800, #FF2525)",
          color: "#fff", fontSize: 16, fontWeight: 700, fontFamily: "inherit",
          transition: "opacity 0.2s, transform 0.2s", opacity: carregando ? 0.7 : 1,
        }}
        onMouseEnter={e => !carregando && (e.target.style.transform = "scale(1.02)")}
        onMouseLeave={e => e.target.style.transform = "scale(1)"}>
          {carregando ? "Entrando..." : "Entrar"}
        </button>
        <p style={{ textAlign: "center", color: "#aaa", fontSize: 12, marginTop: 16 }}>
          Qualquer e-mail válido + senha com 4+ caracteres funciona nesta demo.
        </p>
      </div>
    </div>
  );
}

export default Login;