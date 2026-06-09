import { useState } from "react";

export default function Produtos() {

  const [form, setForm] = useState({
    nome: "",
    email: "",
    cerveja: ""
  });

  return (
    <div className="pedido">

      <form>

        <h2>Adquira a sua</h2>

        <input
          type="text"
          placeholder="Nome"
        />

        <input
          type="email"
          placeholder="Email"
        />

        <input
          type="text"
          placeholder="Escolha sua cerveja"
        />

        <button>
          Enviar
        </button>

      </form>

    </div>
  );
}