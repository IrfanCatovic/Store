import "./Artikal.css";

export default function Artikal({ ime, cena, onDodaj }) {
  return (
    <div className="artikal-container">
      <div className="artikal-info">
        <span className="artikal-ime">{ime}</span>
        <span className="artikal-cena">{cena} RSD</span>
      </div>
      <button className="artikal-button" onClick={() => onDodaj({ ime, cena })}>
        +
      </button>
    </div>
  );
}
