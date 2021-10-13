/* 
    Funcion que verifica los vecinos que sean válidos y que tambien no hayan sido visitados
    para una celda dada
*/
export function unvisitedNeighbors(celda, tablero){
    let vecinos = celda.vecinos();
    let result = vecinos.filter(({row,col}) => 0 <= row && 0 <= col && row < 20 && col < 45 )
                     .filter(({row,col}) => !tablero[row][col].seleccionado);
    return result;
}