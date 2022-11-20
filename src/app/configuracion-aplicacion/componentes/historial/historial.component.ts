import { Component, Input, OnInit } from '@angular/core';
import { Constantes } from '../../constantes/constantes';

@Component({
  selector: 'app-historial',
  templateUrl: './historial.component.html',
  styleUrls: []
})
export class HistorialComponent implements OnInit {

  @Input('historial-colores')         listaColoresEstados:  any = [];              //Lista de estados con sus colores
  @Input('historial-estados')         listaEstados: any = [];                      //Lista de estados por los que ha pasado el registro

  //variables
  formatoFechaTiempo:string;
  
  constructor() {
    this.formatoFechaTiempo = Constantes.FORMATO_FECHA_TIEMPO;
   }

  ngOnInit(): void {
  }

  /**
    * @description obtiene el color que le corresponde al estado
    * @param estado objeto del estado del cual se obtendrá el color
  */
 obtenerColor(estado:any) {
  for (let item of this.listaColoresEstados) {
    if (item.valor == estado.nombreEstado) {
      return item.detalle.cssColor;
    }
  }
  return "secondary";
}

/**
  * @description obtiene el icono que le corresponde al estado
  * @param estado objeto del estado del cual se obtendrá el icono
*/
obtenerIcono(estado: any) {
  for (let item of this.listaColoresEstados) {
    if (item.valor == estado.nombreEstado) {
      return item.detalle.cssIcono;
    }
  }
  return "fa-square";
}

}
