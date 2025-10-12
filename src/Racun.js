import "./Racun.css";

export default function Racun({ trenutniRacun, onUkloni, onZavrsiKupovinu }) {
  const ukupno = trenutniRacun.reduce((s, a) => s + a.Cena, 0);

  return (
    <div className="racun-container">
      <h2>Trenutni račun</h2>
      <ul>
        {trenutniRacun.map((a, i) => (
          <li key={i}>
            <span>
              {a.Ime} - {a.Cena} RSD
            </span>
            <button onClick={() => onUkloni(i)}>−</button>
          </li>
        ))}
      </ul>
      <p>Ukupno: {ukupno} RSD</p>
      <button className="zavrsi-button" onClick={onZavrsiKupovinu}>
        Završi kupovinu
      </button>
    </div>
  );
}
