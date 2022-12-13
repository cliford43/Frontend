import { Component, Injectable, Input, OnInit } from '@angular/core';
import { NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import {  ViewEncapsulation } from '@angular/core';
@Injectable({
  providedIn: 'root'
})
@Component({
  selector: 'app-modal-fuentes',  
  templateUrl: './modal-fuentes.component.html',
  encapsulation: ViewEncapsulation.None,
  styleUrls: []
})
export class ModalFuentesComponent  {

  //Referencia del modal iniciada en la vista padre
  //@Input() modal!: NgbModalRef;

  //variables
  url!:string;

  constructor(private modalService:NgbModal) { 
    console.log(this.url);
  }
  openBackDropCustomClass(fuentesInfo: any) {
		this.modalService.open(fuentesInfo, { backdropClass: 'light-blue-backdrop' });
	}

	openWindowCustomClass(fuentesInfo: any) {
		this.modalService.open(fuentesInfo, { windowClass: 'dark-modal' });
	}

	openSm(fuentesInfo: any) {
		this.modalService.open(fuentesInfo, { size: 'sm' });
	}

	openLg(fuentesInfo: any) {
		this.modalService.open(fuentesInfo, { size: 'lg' });
	}

	openXl(fuentesInfo: any) {
		this.modalService.open(fuentesInfo, { size: 'xl' });
	}


	openVerticallyCentered(fuentesInfo: any) {
		this.modalService.open(fuentesInfo, { centered: true });
	}

	openScrollablefuentesInfo(longfuentesInfo: any) {
		this.modalService.open(longfuentesInfo, { scrollable: true ,size: 'xl'});
	}

	openModalDialogCustomClass(fuentesInfo: any) {
		this.modalService.open(fuentesInfo, { modalDialogClass: 'dark-modal' });
	}
cerrarModal = (usuario?: any):void => {
  this.modalService.dismissAll(usuario);
}
}
