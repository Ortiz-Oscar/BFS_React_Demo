import './App.css';
import { useState } from 'react';
import { Queue } from "./Queue";
import { rowCuantity, columnCuantity, defaultGrid } from "./Globales";
import { Celda } from './Celda';

function App() {
  const [celdas, updateCeldas] = useState(defaultGrid);
  const [celdaInicial, updateCeldaInicial] = useState(null);
  const [celdaFinal, updateCeldaFinal] = useState(null);
  const [addingEnd, updateAddingEnd] = useState(false);
  const [addingStart, updateAddingStart] = useState(false);
  const [running, updateRunning] = useState(false);
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
        celda = anteriores[celda.row][celda.column].prev;
    }
    camino.reverse();
    if(camino[0] === celdaInicial)return camino;
    return []; 
  }
  const clearGrid = ()=>{
    updateCeldas(defaultGrid.map(filas => filas.map(celda => new Celda(celda.row,celda.column,false,false, false))));
    updateCeldaInicial(null);
    updateCeldaFinal(null);
    setTimeout(()=>updateRunning(false),1);
  }
  const setPunto = (row, column) => {
    console.log(row,column);
    if(!running){
      let celdasAux = celdas.slice();
      let celdaObjetivo = celdasAux[row][column];
      if(addingStart){
        if(celdaInicial){
          celdaInicial.isStart = !celdaInicial.isStart;
          celdaInicial.clase = 'Celda';
        }
        celdaObjetivo.isStart = !celdaObjetivo.isStart;
        celdaObjetivo.clase = 'Celda-start';
        updateCeldaInicial(celdaObjetivo);
        updateAddingStart(!addingStart);
      }else if(addingEnd){
        if(celdaFinal){
          celdaFinal.isFinal = !celdaFinal.isFinal;
          celdaFinal.clase = 'Celda';
        }
        celdaObjetivo.isFinal = !celdaObjetivo.isFinal;
        celdaObjetivo.clase = 'Celda-final';
        updateCeldaFinal(celdaObjetivo);
        updateAddingEnd(!addingEnd);
      }else{
        if(!celdaObjetivo.isFinal && !celdaObjetivo.isStart){
          celdaObjetivo.isLocked = !celdaObjetivo.isLocked;
          celdaObjetivo.clase !== 'Celda' ? celdaObjetivo.clase = 'Celda' : celdaObjetivo.clase = 'Celda-locked';
        }
      }
      updateCeldas(celdasAux);
    }
  }
    const run = ()=>{
      if(celdaFinal && celdaInicial && !running){
        updateRunning(true);//No permite que se dibuje mientras grafica
        let result = BFS(celdaInicial,celdaFinal);
        result.forEach(r => {
          setTimeout(()=>{
            updateCeldas(celdas.map(filas => filas.map(c =>{
              if(c.row === r.row && c.column === r.column && !r.isStart && !r.isFinal ){
                c.clase = 'Celda-path';
              }
              return c;
            })))
          },5);
        })
      }
    }
  return (
    <div className="marco">
      <table className="grid">
        {celdas.map(arr => <tr> {arr.map(celda => <
                    td className = { celda.clase } 
                    row = { celda.row } 
                    column = { celda.column }
                    key = {`{${ celda.row },${ celda.column }}`}
                    onClick={ ()=>setPunto(celda.row, celda.column) }
                ></td>)}</tr>)}
      </table>
      <div className="actions">
        <button className="Inicio" onClick = { ()=>updateAddingStart(!addingStart) }>Agregar punto inicial</button>
        <button className="Fin" onClick = { ()=>updateAddingEnd(!addingEnd) }>Agregar punto final</button>
        <button className="Correr" onClick = {run}>Ejecutar</button>
        <button className="Correr" onClick = {clearGrid}>Limpiar</button>
      </div>
      <br/>
    </div>
  );
}

export default App;
