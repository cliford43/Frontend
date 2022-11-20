import { Injectable } from '@angular/core';
import { NgbDateAdapter, NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { Constantes } from '../constantes/constantes';
import { Utilidades } from '../utilidades/utilidades';

/* Servicio para darle formato a la fecha que obtendra el ngMModel o formControl*/
@Injectable()
export class DatepickerAdapterService extends NgbDateAdapter<string> {

  fromModel(value: string): NgbDateStruct | null {
    if(!value){ 
      return null; 
    }

    let fecha = value.split(Constantes.SEPARADOR_FECHA_MODElO);
    return {
      year :  parseInt(fecha[2], 10),
      month : parseInt(fecha[1], 10),
      day :   parseInt(fecha[0], 10)      
      
    };
  }

  toModel(date: NgbDateStruct): string | null {
    if(!date){ 
      return null; 
    }

    let fechaFormato =          date.year.toString()
                                + Constantes.SEPARADOR_FECHA_MODElO
                                + Utilidades.llenarCeros(date.month)
                                + Constantes.SEPARADOR_FECHA_MODElO
                                + Utilidades.llenarCeros(date.day);
    return date ?  fechaFormato : null;
  }

}
