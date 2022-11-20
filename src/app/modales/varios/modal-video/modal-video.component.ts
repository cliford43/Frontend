import { Component, Input, OnInit } from '@angular/core';
import { NgbModalRef } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-modal-video',
  templateUrl: './modal-video.component.html',
  styleUrls: []
})
export class ModalVideoComponent implements OnInit {

  //Referencia del modal iniciada en la vista padre
  @Input() modal!: NgbModalRef;

  //variables
  url!:string;

  constructor() { 
    console.log(this.url);
  }

  ngOnInit(): void {
    console.log(this.url);
  }
/**
 * @description 
 * Variable tipo funcion que cierra el modal.
 * @param usuario objeto que contiene la información del
 * objeto a retornar al componente donde se abrio el modal.
*/
cerrarModal = (usuario?: any):void => {
  this.modal.close(usuario);
}
}
