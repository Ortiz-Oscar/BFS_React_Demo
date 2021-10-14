export class Queue{
    constructor(){
        this.queue = [];
    }
    isEmpty(){
        return this.queue.length === 0;
    }
    enqueue(element) {
        //Agrega un elemento a la pila
        this.queue.push(element);
    }
    dequeue(){
        //Saca el último en ser ingresado
        if(!this.isEmpty()){
            return this.queue.shift();
        }
        return;
    }
    peek(){
        if(!this.isEmpty()){
            return this.queue[0];
        }
        return;
    }
    clear(){
        this.queue = [];
    }
}