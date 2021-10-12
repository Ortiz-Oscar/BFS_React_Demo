import './App.css';
import './Celda.css';
import { useState } from 'react';
import { Celda } from "./Celda";

function App() {
  const rowCuantity = 15;
  const columnCuantity = 45;//No cambiar, debido a la forma de la resolución
  const setMuro = (row, column) => {
    let celdasAux = celdas.slice();
    let celdaObjetivo = celdasAux[row][column];
    celdaObjetivo.seleccionado = !celdaObjetivo.seleccionado;
    updateCeldas(celdasAux);
  }
  const [celdas, updateCeldas] = useState([...new Array(rowCuantity).keys()].map(i =>
    [...new Array(columnCuantity).keys()].map(j =>
        new Celda(i,j,false)
    )));
  return (
    <div>
      <div className="actions">
        <h2>Dijkstra SP visualizado</h2>
        <button className="Inicio">Agregar punto inicial</button>
        <button className="Fin">Agregar punto final</button>
        <button className="Correr">Ejecutar</button>
      </div>
      <br/>
      <div className="container">
        {celdas.map(arr => arr.map(celda => <
                    div className={ celda.seleccionado ? "Celda-selected": "Celda" } 
                    row = { celda.row } 
                    column = { celda.column }
                    key = {`${ celda.row },${ celda.column }`}
                    onClick={ ()=>setMuro(celda.row, celda.column) }
                ></div>))}
      </div>
    </div>
  );
}

export default App;
