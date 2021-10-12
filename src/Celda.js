export class Celda{
    #row;
    #column;
    #seleccionado;
    constructor(x, y, seleccionado){
        this.#row = x;
        this.#column = y;
        this.#seleccionado = seleccionado;
    }
    get seleccionado(){
        return this.#seleccionado;
    }
    get row(){
        return this.#row;
    }
    get column(){
        return this.#column;
    }
    
    set seleccionado(seleccionado){
        this.#seleccionado = seleccionado;
    }
    set row(row){
        this.row = row;
    }
    set column(column){
        this.#column = column;
    }

}