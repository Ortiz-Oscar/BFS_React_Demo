export class Celda{
    #row;
    #column;
    #isFinal;
    #isStart;
    #isLocked;
    #clase;
    constructor(x, y, isFinal, isStart, isLocked, clase = 'Celda'){
        this.#row = x;
        this.#column = y;
        this.#isFinal = isFinal;
        this.#isStart = isStart;
        this.#isLocked = isLocked;
        this.#clase = clase;
    }
    get row(){ return this.#row; }
    get column(){ return this.#column; }
    get isFinal(){ return this.#isFinal; }
    get isStart(){ return this.#isStart; }
    get isLocked(){ return this.#isLocked; }
    get clase(){return this.#clase};

    set isFinal(isFinal){ this.#isFinal= isFinal; }
    set isStart(isStart){ this.#isStart = isStart; }
    set isLocked(isLocked){ this.#isLocked = isLocked; }
    set clase(clase){ this.#clase = clase; }

    vecinos(){
        return [
            {row:this.#row, col: this.#column + 1},
            {row:this.#row + 1, col: this.#column},
            {row:this.#row, col: this.#column - 1},
            {row:this.#row - 1, col: this.#column}
        ]
    }

}