import { Component, OnInit } from '@angular/core';
import { DeseosService } from 'src/app/services/deseos.service';
import { ActivatedRoute } from '@angular/router';
import { Lista } from 'src/app/models/lista.model';
import { ListaItem } from 'src/app/models/lista-item.model';

@Component({
  selector: 'app-agregar',
  templateUrl: './agregar.page.html',
  styleUrls: ['./agregar.page.scss'],
})
export class AgregarPage implements OnInit {

  lista: Lista;
  nombreItem = '';

  constructor(private deseosService: DeseosService, private router: ActivatedRoute) {

    const listaId = this.router.snapshot.paramMap.get('listaId');
    this.lista = this.deseosService.obtenerLista( listaId );

   }

  ngOnInit() {
  }

  agregarItem(){
    if( this.nombreItem.length === 0){
      return;
    }
    this.revisarPendiente();
    const nuevioItem  = new ListaItem( this.nombreItem );

    this.lista.items.push( nuevioItem );
    console.log(this.lista.items)
    this.nombreItem = '';
    this.deseosService.guardarStorage();
  }

  cambioCheck( item: ListaItem ){
    this.revisarPendiente();
   this.deseosService.guardarStorage();

   
  }

  revisarPendiente(){
    const pendiente= this.lista.items.filter( itemData => !itemData.completado).length;
    if (pendiente === 0){
      this.lista.terminadaEn = new Date();
      this.lista.terminada = true;
    } else {
      this.lista.terminadaEn = null;
      this.lista.terminada = false;
    }
    console.log(this.deseosService.listas);
  }

  borrar(iterm: number){

    this.lista.items.splice(iterm, 1);
    this.deseosService.guardarStorage();
  }
}
