export default function IstorijaRacuna({ istorijaRacuna }) {
  return (
    <div>
      <h2>Istorija računa</h2>
      {istorijaRacuna.map((racun, i) => {
        const ukupno = racun.reduce((s, a) => s + a.Cena, 0);
        return (
          <p key={i}>
            Račun #{i + 1}: {ukupno} RSD ({racun.length} artikala)
          </p>
        );
      })}
    </div>
  );
}
