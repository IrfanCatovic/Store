import { useState } from "react";
import Artikal from "./Artikal";
import Racun from "./Racun";
import IstorijaRacuna from "./IstorijaRacuna";
import "./App.css"; // 👈 obavezno dodaj ovaj import za stilove

const Artikli = [
  { Id: 1, Ime: "Majonez", Cena: 120 },
  { Id: 2, Ime: "Kečap", Cena: 100 },
  { Id: 3, Ime: "Hleb", Cena: 60 },
];

export default function App() {
  const [listaArtikala, setListaArtikala] = useState(Artikli);
  const [artikal, setArtikal] = useState({ Ime: "", Cena: "" });
  const [trenutniRacun, setTrenutniRacun] = useState([]);
  const [istorijaRacuna, setIstorijaRacuna] = useState([]);

  // ➕ Dodavanje novog artikla
  function handleAddItem(e) {
    e.preventDefault();

    if (!artikal.Ime || !artikal.Cena) {
      alert("Unesite ime i cenu artikla");
      return;
    }

    const noviArtikal = {
      Id: listaArtikala.length + 1,
      Ime: artikal.Ime,
      Cena: Number(artikal.Cena),
    };

    setListaArtikala([...listaArtikala, noviArtikal]);
    setArtikal({ Ime: "", Cena: "" });
  }

  // ➕ Dodavanje artikla u trenutni račun
  function handleDodaj(artikal) {
    setTrenutniRacun((prev) => [...prev, artikal]);
  }

  // ✅ Završi kupovinu
  function handleZavrsiKupovinu() {
    if (trenutniRacun.length === 0) return alert("Račun je prazan!");
    setIstorijaRacuna((prev) => [...prev, trenutniRacun]);
    setTrenutniRacun([]);
  }

  return (
    <div className="app">
      <header className="header">
        <h1>XYZ</h1>
      </header>

      <div className="main">
        {/* LEVA STRANA */}
        <div className="left">
          <form onSubmit={handleAddItem} className="form">
            <input
              value={artikal.Ime}
              placeholder="Naziv artikla"
              onChange={(e) => setArtikal({ ...artikal, Ime: e.target.value })}
            />
            <input
              value={artikal.Cena}
              placeholder="Cena"
              type="number"
              onChange={(e) =>
                setArtikal({ ...artikal, Cena: Number(e.target.value) })
              }
            />
            <button type="submit">Dodaj artikal</button>
          </form>

          <h2>🛍️ Artikli u ponudi</h2>
          <ul className="artikli-list">
            {listaArtikala.map((a) => (
              <li key={a.Id}>
                <Artikal
                  ime={a.Ime}
                  cena={a.Cena}
                  onDodaj={() => handleDodaj(a)}
                />
              </li>
            ))}
          </ul>
        </div>

        {/* DESNA STRANA */}
        <div className="right">
          <Racun
            trenutniRacun={trenutniRacun}
            onZavrsiKupovinu={handleZavrsiKupovinu}
          />
        </div>
      </div>

      {/* ISTORIJA RAČUNA */}
      <div className="history">
        <IstorijaRacuna istorijaRacuna={istorijaRacuna} />
      </div>
    </div>
  );
}
