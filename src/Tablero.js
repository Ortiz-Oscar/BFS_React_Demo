import { Celda } from "./Celda";
export class Tablero{
    #tablero;
    #tamano = 25;
    constructor(){
        this.#tablero = [...new Array(this.#tamano).keys()].map(i =>
            [...new Array(this.#tamano).keys()].map(j =>
                new Celda({x:i, y:j},false, false)
            ));
    }
    get getTablero(){
        return this.#tablero;
    }
    get tamano(){
        return this.#tamano;
    }
}