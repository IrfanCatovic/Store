import "./IstorijaRacuna.css";

export default function IstorijaRacuna({ istorijaRacuna }) {
  return (
    <div className="istorija-container">
      <h2>Istorija računa</h2>
      {istorijaRacuna.map((racun, i) => {
        const ukupno = racun.reduce((s, a) => s + a.Cena, 0);
        return (
          <div className="racun-item" key={i}>
            <span className="racun-info">
              Račun #{i + 1}: {ukupno} RSD ({racun.length} artikala)
            </span>
          </div>
        );
      })}
    </div>
  );
}
