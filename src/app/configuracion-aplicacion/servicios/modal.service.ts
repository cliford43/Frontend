import { Injectable } from '@angular/core';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';

@Injectable({
  providedIn: 'root'
})
export class ModalService {

  constructor(public modalService: NgbModal) { }
  /**
   * @description Abre el modal que recibe como parametro y envia los parametros iniciales.
   * @param componenteModal componente que contiene el modal a mostrar
   * @param nombreParametro nombre de la clave que contendrá la información inicial que necesita el modal
   * @param informacion objeto que contiene la información inicial que necesita el modal
   */
  abrirModal(componenteModal:any, nombreClave?: string, informacion?:any, nombreClave2?: string, informacion2?:any,tam?:string): NgbModalRef {
    let modal = this.modalService.open(componenteModal, { backdrop: "static", keyboard: false, modalDialogClass:tam });
    modal.componentInstance.modal = modal;
    if(nombreClave)
      modal.componentInstance[nombreClave] = informacion;
    if(nombreClave2)
      modal.componentInstance[nombreClave2] = informacion2;
    return modal;
  }
}
