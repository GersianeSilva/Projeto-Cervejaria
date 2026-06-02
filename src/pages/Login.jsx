import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");

  const navigate = useNavigate();

  function fazerLogin(e) {
    e.preventDefault();

    if (!email || !senha) {
      alert("Preencha todos os campos");
      return;
    }

    localStorage.setItem("logado", "true");

    navigate("/home");
  }

  return (
    <div>
      <h1>Login</h1>

      <form onSubmit={fazerLogin}>
        <input
          type="email"
          placeholder="E-mail"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <br /><br />

        <input
          type="password"
          placeholder="Senha"
          value={senha}
          onChange={(e) => setSenha(e.target.value)}
        />

        <br /><br />

        <button type="submit">
          Entrar
        </button>
      </form>
    </div>
  );
}

export default Login;