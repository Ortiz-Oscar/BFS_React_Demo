import React from "react";
import './Celda.css';
export class Celda extends React.Component{
    #row;
    #column;
    #visitado;
    #seleccionado;
    constructor(x, y, visitado, seleccionado){
        super();
        this.#row = x;
        this.#column = y;
        this.#visitado = visitado;
        this.#seleccionado = seleccionado;
    }
    
    get visitado(){
        return this.#visitado;
    }
    get seleccionado(){
        return this.#seleccionado;
    }

    set visitado(visitado){
        this.#visitado = visitado;
    }
    render(){
        return <div className="Celda" 
                    row = { this.#row } 
                    column = { this.#column }
                    key = {`${this.#row},${this.#column}`}
                    onClick = {()=>console.log(this.#row, this.#column)}
                ></div>
    }

}