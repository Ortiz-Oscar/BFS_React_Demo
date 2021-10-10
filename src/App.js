import './App.css';
import { Rect } from 'react-konva';
import { Tablero } from './Tablero';
import { useState } from 'react';
import { Stage, Layer } from 'react-konva';


function App() {
  const tablero = new Tablero();
  const tamano = {width:800/tablero.tamano, height:600/tablero.tamano};

  const setMuro = (e) => {
    let celdasAux = celdas.slice();
    // eslint-disable-next-line no-eval
    let [a,b] = eval(`[${e.target.attrs.id}]`)//Que cochinada :v
    let celdaObjetivo = celdasAux[a][b];//Almacena el puntero a dicha celda
    if(ingresandoFinal){
      celdaObjetivo.esFinal ? celdaObjetivo.fill = '#ffffff' : celdaObjetivo.fill = '#FF0000';
      if(CeldaFinal){
        CeldaFinal.esFinal = false;
        CeldaFinal.fill = '#ffffff';
      }
      celdaObjetivo.esFinal = !(celdaObjetivo.esFinal);
      updateCeldaFinal(celdaObjetivo);
      ingresandoFinal = false;
    }else if(ingresandoInicial){
      celdaObjetivo.esInicial ? celdaObjetivo.fill = '#ffffff' : celdaObjetivo.fill = '#0000CD';
      if(CeldaInicial){
        CeldaInicial.esInicial = false;
        CeldaInicial.fill = '#ffffff';
      }
      celdaObjetivo.esInicial = !(celdaObjetivo.esInicial);
      updateCeldaInicial(celdaObjetivo)
      ingresandoInicial = false;
    }else{
      if(celdaObjetivo !== CeldaFinal && celdaObjetivo !== CeldaInicial){
        celdaObjetivo.seleccionado ? celdaObjetivo.fill = '#ffffff' : celdaObjetivo.fill = '#000000';
        celdaObjetivo.seleccionado = !(celdaObjetivo.seleccionado);
      }
    }
    updateCeldas(celdasAux)//Ahhh ya entendí esta wea mae que nivel
  }
  let ingresandoFinal = false;
  let ingresandoInicial = false;
  const [CeldaFinal, updateCeldaFinal] = useState(null);
  const [CeldaInicial, updateCeldaInicial] = useState(null);
  const [celdas, updateCeldas] = useState(
    tablero.getTablero.map(arr => 
          arr.map(celda => 
            ({
              id : `${celda.posX()},${celda.posY()}`,
              x : celda.posX() * tamano.width,
              y : celda.posY() * tamano.height,
              width : tamano.width,
              height : tamano.height,
              stroke :'#000000',
              strokeWidth : 0.5,
              fill : '#ffffff',
              visitado : false,
              seleccionado : false,
              esInicial : false,
              esFinal : false
          }))
      )
  )
  
  return (
    <div className="container">
      <Stage className="stage" onClick = {setMuro} width={800} height={600}>
        <Layer className="layer">
            {
            celdas.map(arr => arr.map( ({id, x, y, width, height, stroke,strokeWidth, fill}) =>
                  <Rect
                  key = {id} 
                  id = {id}
                  x = {x}
                  y = {y}
                  width = {width}
                  height = {height}
                  stroke = {stroke}
                  strokeWidth = {strokeWidth}
                  fill = {fill}/>
            ))
          }
        </Layer>
      </Stage>
      <div className="Descripcion">
        <h3>Guia de interaccion</h3>
        <button onClick={()=>{ ingresandoInicial = true; }}> Asignar celda inicial </button>
        <button onClick={()=>{ ingresandoFinal = true; }}> Asignar celda final </button>
      </div>
    </div>

  );
}

export default App;
