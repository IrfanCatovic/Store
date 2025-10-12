export default function Racun({ racun, onUkloni, onZavrsiKupovinu }) {
  const ukupno = racun.reduce((s, a) => s + a.Cena, 0);

  return (
    <div>
      <h2>Trenutni račun</h2>
      <ul>
        {racun.map((a, i) => (
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
