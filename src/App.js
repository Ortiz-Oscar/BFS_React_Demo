import './App.css';
import './Celda.css';
import { useState } from 'react';
import { Celda } from "./Celda";
import { BFS } from './Engine';
function App() {
  const rowCuantity = 20;
  const columnCuantity = 45;
  const [celdas, updateCeldas] = useState([...new Array(rowCuantity).keys()].map(i =>
    [...new Array(columnCuantity).keys()].map(j =>
        new Celda(i,j,false)
    )));
  const [celdaInicial, updateCeldaInicial] = useState(null);
  const [celdaFinal, updateCeldaFinal] = useState(null);
  let agregandoFinal = false;
  let agregandoInicio = false;

  const setPunto = (row, column) => {
    let celdasAux = celdas.slice();
    let celdaObjetivo = celdasAux[row][column];
    if(agregandoInicio){
      if(celdaInicial){
        celdaInicial.isStart = !celdaInicial.isStart;
      }
      celdaObjetivo.isStart = !celdaObjetivo.isStart;
      updateCeldaInicial(celdaObjetivo);
      agregandoInicio = false;
    }else if(agregandoFinal){
      if(celdaFinal){
        celdaFinal.isFinal = !celdaFinal.isFinal;
      }
      celdaObjetivo.isFinal = !celdaObjetivo.isFinal;
      updateCeldaFinal(celdaObjetivo);
      agregandoFinal = false;
    }else{
      if(!celdaObjetivo.isFinal && !celdaObjetivo.isStart){
        celdaObjetivo.seleccionado = !celdaObjetivo.seleccionado;
      }
    }
    updateCeldas(celdasAux);
  }
    const run = ()=>{
      if(celdaFinal && celdaInicial){
        let result = BFS(celdaInicial,celdaFinal,celdas);
        result.forEach(r => {
          setPunto(r.row,r.column);
        })
      }else{
        alert("No hay inicio ni fin");
      }
    }
  return (
    <div>
      <div className="actions">
        <h2>Dijkstra SP visualizado</h2>
        <button className="Inicio" onClick = { ()=>agregandoInicio = true }>Agregar punto inicial</button>
        <button className="Fin" onClick = { ()=>agregandoFinal = true }>Agregar punto final</button>
        <button className="Correr" onClick = {run}>Ejecutar</button>
      </div>
      <br/>
      <div className="container">
        {celdas.map(arr => arr.map(celda => <
                    div className={ celda.seleccionado ? "Celda-selected": 
                                    celda.isStart ? "Celda-start": 
                                    celda.isFinal ? "Celda-final" : "Celda" } 
                    row = { celda.row } 
                    column = { celda.column }
                    key = {`${ celda.row },${ celda.column }`}
                    onClick={ ()=>setPunto(celda.row, celda.column) }
                ></div>))}
      </div>
    </div>
  );
}

export default App;
