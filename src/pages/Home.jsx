import "./Home.css";

export default function Home() {
  return (
    <div className="home">
      <section className="hero">
        <img
          src="/assets/logobranca.svg"
          alt="Logo Mars"
          className="logo"
        />

        <div className="texto">
          <h1>
            A CADA GOLE
            <br />
            UMA SENSAÇÃO
            <br />
            ÚNICA
          </h1>
        </div>

        <img
          src="/assets/3-mars-beer.png"
          alt="Cervejas"
          className="cervejas"
        />
      </section>
    </div>
  );
}