import { Queue } from "./Queue";

export function BFS(celdaInicial, celdaFinal, tablero){
    let anteriores = solve(celdaInicial,celdaFinal, tablero);
    return reconstruirCamino(celdaInicial,celdaFinal,anteriores);
}
function unvisitedNeighbors(celda, tablero){
    let vecinos = celda.vecinos();
    let result = vecinos.filter(({row,col}) => 0 <= row && 0 <= col && row < 20 && col < 45 );
    return result;
}
function solve(celdaInicial,celdaFinal, tablero){
    let queue = new Queue();
    queue.enqueue(celdaInicial);
    let visitados = [...new Array(20).keys()].map(() =>
        [...new Array(45).keys()].map(() =>
            false
        ));
    let anteriores = [...new Array(20).keys()].map(() =>
        [...new Array(45).keys()].map(() =>
            null
        ));
    visitados[celdaInicial.row][celdaInicial.column] = true;
    anteriores[celdaInicial.row][celdaInicial.column] = {ant:null};
    while(!queue.isEmpty()){
        let actual = queue.dequeue();
        if(actual === celdaFinal){break;}
        let vecinos = unvisitedNeighbors(actual,tablero).map(({row,col})=>tablero[row][col]);
        vecinos.forEach(v => {
            if(!visitados[v.row][v.column]){
                queue.enqueue(v);
                visitados[v.row][v.column] = true;
                anteriores[v.row][v.column] = {ant:actual};
            }
        })
    }
    return anteriores;
}
function reconstruirCamino(celdaInicial, CeldaFinal, anteriores){
    let camino = [];
    let celda = CeldaFinal;
    console.log(anteriores[celda.row][celda.column])
    while(celda!==null){
        camino.push(celda);
        celda = anteriores[celda.row][celda.column].ant;
    }
    camino.reverse();
    if(camino[0] === celdaInicial)return camino;
    return []; 
}