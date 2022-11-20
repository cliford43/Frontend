import { Component, Input, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { NgbModalRef } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-modal-mostrar-ubicacion',
  templateUrl: './modal-mostrar-ubicacion.component.html',
  styleUrls: []
})
export class ModalMostrarUbicacionComponent implements OnInit {

  //Referencia del modal iniciada en la vista padre
  @Input() modal!: NgbModalRef;
  
  ubicacion: any;
  src: any;
  numeroPaso: any;
  
  constructor(private sanitize: DomSanitizer) { 
    this.numeroPaso = 1;
  }

  ngOnInit(): void {
    let src = "https://maps.google.com/maps?width=490&height=400&hl=en&q="+this.ubicacion.latitud+","+this.ubicacion.longitud+"&z=14&ie=UTF8&iwloc=B&output=embed";
    this.src = this.sanitize.bypassSecurityTrustResourceUrl(src);
  }

  /**
 * @description 
 * Variable tipo funcion que cierra el modal.
*/
cerrarModal = ():void => {
  this.modal.close();
}


}
