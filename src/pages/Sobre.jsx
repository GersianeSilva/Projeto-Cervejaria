const cervejas_info = [
  {
    nome: "PILSEN — SOL DA TARDE",
    cor: "rgba(255,200,0,0.15)",
    emoji: "🌅",
    texto: "Surgida na República Tcheca, a Pilsner é marcada pelo aroma e sabor acentuados pelo lúpulo, além da cor dourada característica. Teor alcoólico entre 4,6% e 5%. A nossa 'Sol da Tarde' captura tudo isso numa garrafa.",
    abv: "4,8%",
    estilo: "Pilsen",
  },
  {
    nome: "TRIPEL — FLOREST",
    cor: "rgba(0,200,80,0.15)",
    emoji: "🌿",
    texto: "Criada na Bélgica, no Mosteiro Trapista de Westmalle, a Tripel é bem carbonatada, com sabor amargo cítrico e aroma frutado. Forte e elegante, com teor alcoólico entre 7,5% e 8,5%.",
    abv: "8,0%",
    estilo: "Tripel",
  },
  {
    nome: "WEIZENBIER — BLUE DARK",
    cor: "rgba(0,100,255,0.15)",
    emoji: "🌾",
    texto: "Da região da Baviera, a Weizenbier leva no mínimo 50% de malte de trigo. Cor clara e opaca, aroma frutado lembrando banana e cravo. Refrescante, com teor alcoólico entre 5% e 6%.",
    abv: "5,5%",
    estilo: "Weizenbier",
  },
];
 
function Sobre() {
  return (
    <div style={{ animation: "fadeIn 0.7s ease" }}>
      <h1 style={{ color: "#fff", fontFamily: "'Alata'", fontSize: 40, marginBottom: 40, textAlign: "center" }}>
        Nossas Cervejas
      </h1>
      <div style={{ display: "flex", flexDirection: "column", gap: 40 }}>
        {cervejas_info.map((c, i) => (
          <div key={i} style={{
            background: c.cor, backdropFilter: "blur(6px)", borderRadius: 20,
            padding: "36px 40px", display: "flex", gap: 40, alignItems: "center",
            border: "1px solid rgba(255,255,255,0.2)", flexWrap: "wrap",
            animation: `slideUp ${0.3 + i * 0.2}s ease`,
          }}>
            <div style={{ fontSize: 80 }}>{c.emoji}</div>
            <div style={{ flex: 1 }}>
              <p style={{ color: "#fff", fontWeight: 700, fontSize: 28, fontFamily: "'Alata'" }}>{c.nome}</p>
              <p style={{ color: "rgba(255,255,255,0.88)", fontSize: 16, marginTop: 12, lineHeight: 1.7 }}>{c.texto}</p>
              <div style={{ marginTop: 16, display: "flex", gap: 16 }}>
                <span style={{ background: "rgba(255,255,255,0.2)", borderRadius: 20, padding: "4px 16px", color: "#fff", fontSize: 14 }}>
                  🍺 {c.estilo}
                </span>
                <span style={{ background: "rgba(255,255,255,0.2)", borderRadius: 20, padding: "4px 16px", color: "#fff", fontSize: 14 }}>
                  🍷 ABV {c.abv}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
 
export default Sobre;