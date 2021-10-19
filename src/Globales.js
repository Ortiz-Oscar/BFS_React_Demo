import { Celda } from "./Celda";
export const rowCuantity = 19;
export const columnCuantity = 30;
export const defaultGrid = [...new Array(rowCuantity).keys()].map(i =>
    [...new Array(columnCuantity).keys()].map(j =>
        new Celda(i,j,false,false, false)
    ));