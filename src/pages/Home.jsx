import { useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();

  function logout() {
    localStorage.removeItem("logado");
    navigate("/");
  }

  return (
    <div>
      <h1>Mars Cervejaria</h1>

      <button onClick={logout}>
        Sair
      </button>
    </div>
  );
}

export default Home;