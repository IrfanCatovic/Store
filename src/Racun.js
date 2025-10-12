export default function Racun({ trenutniRacun, onUkloni, onZavrsiKupovinu }) {
  const ukupno = trenutniRacun.reduce((s, a) => s + a.Cena, 0);

  return (
    <div>
      <h2>Trenutni račun</h2>
      <ul>
        {trenutniRacun.map((a, i) => (
          <li key={i}>
            {a.Ime} - {a.Cena} RSD
            <button onClick={() => onUkloni(i)}>−</button>
          </li>
        ))}
      </ul>
      <p>Ukupno: {ukupno} RSD</p>
      <button onClick={onZavrsiKupovinu}>Završi kupovinu</button>
    </div>
  );
}
