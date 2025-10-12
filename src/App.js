import { useState } from "react";
import Artikal from "./Artikal";

const Artikli = [
  {
    Id: 1,
    Ime: "Majonez",
    Cena: 120,
  },
  {
    Id: 2,
    Ime: "Kečap",
    Cena: 100,
  },
  {
    Id: 3,
    Ime: "Hleb",
    Cena: 60,
  },
];

export default function App() {
  const [listaArtikala, setListaArtikala] = useState(Artikli);
  const [artikal, setArtikal] = useState({ Ime: "", Cena: "" });

  function handleAddItem(e) {
    e.preventDefault();

    if (!artikal.Ime || !artikal.Cena) {
      alert("Unesite Ime i cenu artikla");
      return;
    }

    const noviArtikal = {
      Id: listaArtikala.length + 1,
      Ime: artikal.Ime,
      Cena: artikal.Cena,
    };

    setListaArtikala([...listaArtikala, noviArtikal]);
    setArtikal({ Ime: "", Cena: "" });
  }
  return (
    <div>
      <form onSubmit={handleAddItem}>
        <input
          value={artikal.Ime}
          placeholder="Upisite ime artikla"
          onChange={(e) => setArtikal({ ...artikal, Ime: e.target.value })}
        />
        <input
          value={artikal.Cena}
          placeholder="Upisite cenu"
          onChange={(e) =>
            setArtikal({ ...artikal, Cena: Number(e.target.value) })
          }
        />
        <button type="submit">Dodaj</button>
      </form>
      {listaArtikala.map((a) => (
        <li key={a.Id}>
          <Artikal ime={a.Ime} cena={a.Cena} />
        </li>
      ))}
    </div>
  );
}
