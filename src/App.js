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
  function BFS(){
    return reconstruirCamino(solve());
  }
  function unvisitedNeighbors(celda){
    return (celda.vecinos()).filter(({row,col}) => 0 <= row && 0 <= col && row < rowCuantity && col < columnCuantity )
    .filter(({row,col})=> !celdas[row][col].isLocked);
  }
  function solve(){
    let queue = new Queue();
    let visitados = [...new Array(rowCuantity).keys()].map(() =>
    [...new Array(columnCuantity).keys()].map(() =>
        false
    ));
    let anteriores = [...new Array(rowCuantity).keys()].map(() =>
    [...new Array(columnCuantity).keys()].map(() =>
        null
    ));
    //Inicia algoritmo
    queue.enqueue(celdaInicial);
    visitados[celdaInicial.row][celdaInicial.column] = true;
    anteriores[celdaInicial.row][celdaInicial.column] = {prev:null};
    while(!queue.isEmpty()){
        let encontrado = false;
        let actual = queue.dequeue();
        let vecinos = unvisitedNeighbors(actual).map(({row,col})=>celdas[row][col]);
        encontrado = vecinos.some(v => v === celdaFinal);//Revisamos si se encontró de antemano
        vecinos.forEach(v => {
            if(!visitados[v.row][v.column]){
                queue.enqueue(v);
                visitados[v.row][v.column] = true;
                anteriores[v.row][v.column] = {prev:actual};
                setTimeout(()=>{//Animación de dibujo en grid principal
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
        if(encontrado) break;
    }
    return anteriores;
  }
  function reconstruirCamino(anteriores){
    let camino = [];
    let celda = celdaFinal;
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
  const agregarCelda = (row, column) => {
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
        BFS().forEach(path => {
          setTimeout(()=>{
            updateCeldas(celdas.map(filas => filas.map(celda =>{
              if(celda.row === path.row && celda.column === path.column && !path.isStart && !path.isFinal ){
                celda.clase = 'Celda-path';
              }
              return celda;
            })))
          },5);
        })
      }
    }
  return (
    <div className="marco">
      <h2>BFS Shortest Path</h2>
      <div className="actions">
        <button className="Inicio" onClick = { ()=>updateAddingStart(!addingStart) }>Celda inicial</button>
        <button className="Fin" onClick = { ()=>updateAddingEnd(!addingEnd) }>Celda final</button>
        <button className="Correr" onClick = {run}>Ejecutar BFS</button>
        <button className="Limpiar" onClick = {clearGrid}>Limpiar</button>
      </div>
      <br/>
      <div className="description">
        <div className="Celda-start"></div> <p>Inicio</p>
        <div className="Celda-final"></div><p>Final</p>
        <div className="Celda-locked"></div><p>Bloqueado</p>
        <div className="Celda-visited"></div><p>Visitado</p>
        <div className="Celda"></div><p>Sin visitar</p>
        <div className="Celda-path"></div><p>Recorrido</p>
      </div>
      <br/>
      <table className="grid">
        {celdas.map(arr => <tr> {arr.map(celda => <
                    td className = { celda.clase } 
                    row = { celda.row } 
                    column = { celda.column }
                    key = {`{${ celda.row },${ celda.column }}`}
                    onClick={ ()=>agregarCelda(celda.row, celda.column) }
                ></td>)}</tr>)}
      </table>
    </div>
  );
}

export default App;
