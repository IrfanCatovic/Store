import { useEffect, useState } from "react";
import Artikal from "./Artikal";
import Racun from "./Racun";
import IstorijaRacuna from "./IstorijaRacuna";
import "./App.css"; //

// const Artikli = [
//   { Id: 1, Ime: "Belstaff SIGNATURE Majica", Cena: 11000 },
//   { Id: 2, Ime: "Belstaff Cailin Cashmere Jumper", Cena: 42000 },
//   { Id: 3, Ime: "Belstaff Women's Base Layer Merino", Cena: 12000 },
// ];

export default function App() {
  const [listaArtikala, setListaArtikala] = useState([]);
  const [artikal, setArtikal] = useState({ Ime: "", Cena: "" });
  const [trenutniRacun, setTrenutniRacun] = useState([]);
  const [istorijaRacuna, setIstorijaRacuna] = useState([]);
  const [loading, setLoading] = useState(true);

  //fetch items from backend
  useEffect(() => {
    async function fetchArtikli() {
      try {
        const res = await fetch("http://localhost:8080/artikli");
        if (!res.ok) throw new Error("Greška pri dohvatanju artikala");

        const data = await res.json();
        console.log("Dobijeni artikli", data);
        setListaArtikala(data);
      } catch (error) {
        console.error("Greška pri dohvatanju artikala:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchArtikli(); // ✅ poziv funkcije ide ovde, van nje
  }, []);

  // Add new item
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

  // Add item to cart
  // We sent this fucntion to Artikal component like onAdd and after that recieve artikal
  // to set it to list as new artikal
  //later on we show that list on screen and calculate bill
  function handleDodaj(artikal) {
    setTrenutniRacun((prev) => [...prev, artikal]);
    console.log(trenutniRacun);
  }

  function handleUkloni(index) {
    setTrenutniRacun((prev) => prev.filter((_, i) => i !== index));
  }

  // End with shopping
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
        {/* Items */}
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

          {/* Current Items List  */}
          <h2>🛍️ Artikli u ponudi</h2>
          {loading ? (
            <p>Ucitavanje artikala...</p>
          ) : (
            <ul className="artikli-list">
              {listaArtikala.map((a) => (
                <li key={a.Id}>
                  {console.log(a)}
                  <Artikal
                    ime={a.Ime}
                    cena={a.Cena}
                    onDodaj={() => handleDodaj(a)}
                  />
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Currently bill */}
        <div className="right">
          <Racun
            onUkloni={handleUkloni}
            trenutniRacun={trenutniRacun}
            onZavrsiKupovinu={handleZavrsiKupovinu}
          />
        </div>
      </div>

      {/* Bill history */}
      <div className="history">
        <IstorijaRacuna istorijaRacuna={istorijaRacuna} />
      </div>
    </div>
  );
}
