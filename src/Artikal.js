import "./Artikal.css";

export default function Artikal({ ime, cena, kolicina, onDodaj }) {
  console.log("evo me u artikal", ime, cena, kolicina);
  return (
    <div className="artikal-container">
      <div className="artikal-info">
        <span className="artikal-ime">{ime}</span>
        <span className="artikal-cena">{cena} RSD</span>
        <span className="artikal-cena">{kolicina}</span>
      </div>
      <button className="artikal-button" onClick={() => onDodaj({ ime, cena })}>
        +
      </button>
    </div>
  );
}
