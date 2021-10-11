import React from "react";
import { Celda } from "./Celda";
export class Tablero extends React.Component{
    #tablero;
    #rowCuantity = 15;
    #columnCuantity = 48;//No cambiar, debido a la forma de la resolución
    constructor(){
        super();
        this.#tablero = [...new Array(this.#rowCuantity).keys()].map(i =>
            [...new Array(this.#columnCuantity).keys()].map(j =>
                new Celda(i,j,false, false)
            ));
    }
    get getTablero(){
        return this.#tablero;
    }
    render(){
        return (
            <div className="container">{this.getTablero.flatMap(arr => arr.map(c => c.render()))}</div>)
    }
}