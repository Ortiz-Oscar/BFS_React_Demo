export class Celda{
    #row;
    #column;
    #seleccionado;
    #isFinal;
    #isStart;
    constructor(x, y, seleccionado, isFinal, isStart){
        this.#row = x;
        this.#column = y;
        this.#seleccionado = seleccionado;
        this.#isFinal = isFinal;
        this.#isStart = isStart;
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
    get isFinal(){
        return this.#isFinal;
    }
    get isStart(){
        return this.#isStart;
    }

    set seleccionado(seleccionado){
        this.#seleccionado = seleccionado;
    }
    set row(row){
        this.#row = row;
    }
    set column(column){
        this.#column = column;
    }
    set isFinal(isFinal){
        this.#isFinal= isFinal;
    }
    set isStart(isStart){
        this.#isStart = isStart;
    }

    vecinos(){
        return [
            {row:this.#row, col: this.#column + 1},
            {row:this.#row + 1, col: this.#column},
            {row:this.#row, col: this.#column - 1},
            {row:this.#row - 1, col: this.#column}
        ]
    }

}