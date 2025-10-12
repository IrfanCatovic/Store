import { useState } from "react";

export default function Artikal({ ime, cena, onDodaj }) {
  return (
    <>
      <div>
        <p>
          {ime}: {cena}{" "}
          <button onClick={() => onDodaj({ ime, cena })}>+</button>
        </p>
        <p>Zavrsi kupovinu</p>
      </div>
    </>
  );
}
