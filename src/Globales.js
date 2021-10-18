import { Celda } from "./Celda";
export const rowCuantity = 15;
export const columnCuantity = 56;
export const defaultGrid = [...new Array(rowCuantity).keys()].map(i =>
    [...new Array(columnCuantity).keys()].map(j =>
        new Celda(i,j,false,false, false)
    ));