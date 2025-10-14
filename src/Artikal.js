import "./Artikal.css";

export default function Artikal({ Ime, Cena, onDodaj }) {
  return (
    <div className="artikal-container">
      <div className="artikal-info">
        <span className="artikal-ime">{Ime}</span>
        <span className="artikal-cena">{Cena} RSD</span>
      </div>
      <button className="artikal-button" onClick={() => onDodaj({ Ime, Cena })}>
        +
      </button>
    </div>
  );
}
