import './App.css';
import { useState } from 'react';
import { Celda } from "./Celda";
import { Queue } from "./Queue";
import { rowCuantity, columnCuantity } from "./Globales";

function App() {
  const [celdas, updateCeldas] = useState([...new Array(rowCuantity).keys()].map(i =>
    [...new Array(columnCuantity).keys()].map(j =>
        new Celda(i,j,false,false, false)
    )));
  const [celdaInicial, updateCeldaInicial] = useState(null);
  const [celdaFinal, updateCeldaFinal] = useState(null);
  let agregandoFinal = false;
  let agregandoInicio = false;
  function BFS(celdaInicial, celdaFinal){
    let visitados = solve(celdaInicial,celdaFinal);
    return reconstruirCamino(celdaInicial,celdaFinal,visitados);
  }
  function unvisitedNeighbors(celda){
    let vecinos = celda.vecinos();
    let result = vecinos.filter(({row,col}) => 0 <= row && 0 <= col && row < rowCuantity && col < columnCuantity )
                        .filter(({row,col})=> !celdas[row][col].isLocked);
    return result;
  }
  function solve(celdaInicial,celdaFinal){
    let queue = new Queue();
    queue.enqueue(celdaInicial);
    let visitados = [...new Array(rowCuantity).keys()].map(() =>
        [...new Array(columnCuantity).keys()].map(() =>
            false
        ));
    let anteriores = [...new Array(rowCuantity).keys()].map(() =>
        [...new Array(columnCuantity).keys()].map(() =>
            null
        ));
    visitados[celdaInicial.row][celdaInicial.column] = true;
    anteriores[celdaInicial.row][celdaInicial.column] = {prev:null};
    while(!queue.isEmpty()){
        let actual = queue.dequeue();
        if(actual === celdaFinal){break;}
        let vecinos = unvisitedNeighbors(actual,celdas).map(({row,col})=>celdas[row][col]);
        vecinos.forEach(v => {
            if(!visitados[v.row][v.column]){
                queue.enqueue(v);
                visitados[v.row][v.column] = true;
                anteriores[v.row][v.column] = {prev:actual};
                setTimeout(()=>{
                  updateCeldas(celdas.map(fila => fila.map(c => {
                    if(c.row === v.row && c.column === v.column){
                      if(!c.isFinal && !c.isStart){
                        c.clase = 'Celda-visited';
                      }
                    }
                    return c;
                  })));
                },1);
            }
        })
    }
    return anteriores;
  }
  function reconstruirCamino(celdaInicial, CeldaFinal, anteriores){
    let camino = [];
    let celda = CeldaFinal;
    while(celda !== null && anteriores[celda.row][celda.column]){
        camino.push(celda);
        console.log(celda.row, celda.column);
        celda = anteriores[celda.row][celda.column].prev;
    }
    camino.reverse();
    if(camino[0] === celdaInicial)return camino;
    return []; 
  }
  const setPunto = (row, column) => {
    let celdasAux = celdas.slice();
    let celdaObjetivo = celdasAux[row][column];
    if(agregandoInicio){
      if(celdaInicial){
        celdaInicial.isStart = !celdaInicial.isStart;
        celdaInicial.clase = 'Celda';
      }
      celdaObjetivo.isStart = !celdaObjetivo.isStart;
      celdaObjetivo.clase = 'Celda-start';
      updateCeldaInicial(celdaObjetivo);
      agregandoInicio = false;
    }else if(agregandoFinal){
      if(celdaFinal){
        celdaFinal.isFinal = !celdaFinal.isFinal;
        celdaFinal.clase = 'Celda';
      }
      celdaObjetivo.isFinal = !celdaObjetivo.isFinal;
      celdaObjetivo.clase = 'Celda-final';
      updateCeldaFinal(celdaObjetivo);
      agregandoFinal = false;
    }else{
      if(!celdaObjetivo.isFinal && !celdaObjetivo.isStart){
        celdaObjetivo.isLocked = !celdaObjetivo.isLocked;
        celdaObjetivo.clase !== 'Celda' ? celdaObjetivo.clase = 'Celda' : celdaObjetivo.clase = 'Celda-locked';
      }
    }
    updateCeldas(celdasAux);
  }
    const run = ()=>{
      if(celdaFinal && celdaInicial){
        let result = BFS(celdaInicial,celdaFinal);
        result.forEach(r => {
          setTimeout(()=>{
            updateCeldas(celdas.map(filas => filas.map(c =>{
              if(c.row === r.row && c.column === r.column){
                c.clase = 'Celda-path';
              }
              return c;
            })))
          },10);
          
        })
      }else{
        alert("No hay celda de inicio o fin");
      }
    }
  return (
    <div>
      <div className="container">
        {celdas.map(arr => arr.map(celda => <
                    div className={ celda.clase } 
                    row = { celda.row } 
                    column = { celda.column }
                    key = {`${ celda.row },${ celda.column }`}
                    onClick={ ()=>setPunto(celda.row, celda.column) }
                ></div>))}
      </div>
      <div className="actions">
        <button className="Inicio" onClick = { ()=>agregandoInicio = true }>Agregar punto inicial</button>
        <button className="Fin" onClick = { ()=>agregandoFinal = true }>Agregar punto final</button>
        <button className="Correr" onClick = {run}>Ejecutar</button>
      </div>
      <br/>
    </div>
  );
}

export default App;
