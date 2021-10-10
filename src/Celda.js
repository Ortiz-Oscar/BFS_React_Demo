import { Cord } from "./Cord";

export class Celda{
    #cord;
    #visitado;
    #seleccionado;
    constructor({x,y}, visitado, seleccionado){
        this.#cord = new Cord(x,y);
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
    posX(){
        return this.#cord.x;
    }
    posY(){
        return this.#cord.y;
    }
}