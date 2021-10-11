import './App.css';
import { Tablero } from './Tablero';
import { useState } from 'react';


function App() {
  const tablero = new Tablero();
  const tamano = {width:800/tablero.tamano, height:600/tablero.tamano};

  const setMuro = (e) => {
    //updateCeldas(celdasAux);
  }
  const [celdas, updateCeldas] = useState(undefined);
  return (
    <div>
      <div>
        <h2>Dijkstra SP visualizado</h2>
      </div>
      <Tablero></Tablero>
      <p>*Favor ajustar la resolución tal que la cantidad de columnas sea 48 y las filas 15*</p>
    </div>
  );
}

export default App;
