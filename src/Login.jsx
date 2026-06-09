import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const navigate = useNavigate();

  const fazerLogin = (e) => {
    e.preventDefault();

    if (!email || !senha) {
      alert("Preencha todos os campos");
      return;
    }

    localStorage.setItem("logado", "true");
    navigate("/cervejas");
  };

  return (
    <div style={{ padding: "40px" }}>
      <h1>Login</h1>

      <form onSubmit={fazerLogin}>
        <div>
          <label>E-mail</label>
          <br />
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <br />

        <div>
          <label>Senha</label>
          <br />
          <input
            type="password"
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
          />
        </div>

        <br />

        <button type="submit">
          Entrar
        </button>
      </form>
    </div>
  );
}

export default Login;