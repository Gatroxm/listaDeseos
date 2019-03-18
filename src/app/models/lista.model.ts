import { ListaItem } from './lista-item.model';


export class Lista{

    id:Number;
    titulo:String;
    creadaEn:Date;
    terminadaEn:Date;
    terminada:Boolean;
    items: ListaItem[];

    constructor( titulo:String ){
        this.titulo = titulo;
        this.terminadaEn = new Date();
        this.terminada = false;
        this.items = [];

        this.id = new Date().getTime();
    }

}
