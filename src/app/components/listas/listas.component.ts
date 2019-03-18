import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { DeseosService } from 'src/app/services/deseos.service';
import { Lista } from 'src/app/models/lista.model';
import { Router } from '@angular/router';
import { AlertController, IonList } from '@ionic/angular';

@Component({
  selector: 'app-listas',
  templateUrl: './listas.component.html',
  styleUrls: ['./listas.component.scss'],
})
export class ListasComponent implements OnInit {

  @Input() terminada = true;
  @ViewChild( IonList ) lista: IonList;

  constructor( public deseosService: DeseosService, private router:Router, private alertCtrl:AlertController) { }

  ngOnInit() {}

  listaSeleccionada(lista: Lista){

    if(this.terminada){
      this.router.navigateByUrl(`/tabs/tab2/agregar/${ lista.id }`);
    }else{
      this.router.navigateByUrl(`/tabs/tab1/agregar/${ lista.id }`);
    }
  }

  borrarLista(lista:Lista){
    this.deseosService.borrarLista(lista);
  }

  async editarLista(lista: Lista){

    const alert = await this.alertCtrl.create({
      header: 'Editar ' + lista.titulo,
      inputs: [
        {
          name: 'titulo',
          type: 'text',
          placeholder: 'Editar lista',
          value: lista.titulo
        }
      ],
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          handler: () =>{
            console.log('Cancelar')
          }
        },
        {
          text: 'Actualizar',
          handler: (data) =>{
            console.log(data)
            if (data.titulo.length === 0){
              return;
            }
            /* Editar lista */
           lista.titulo = data.titulo;
           this.deseosService.guardarStorage();
           this.lista.closeSlidingItems();
          }
        }
      ]
    });
    alert.present();
    
  }

}
