import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { MessageAlertService } from 'src/app/configuracion-aplicacion/servicios/message-alert.service';

@Component({
  selector: 'app-modal-descarga-archivo',
  templateUrl: './modal-descarga-archivo.component.html',
  styleUrls: []
})
export class ModalDescargaArchivoComponent implements OnInit {

//Variables
numeroPaso:number;
informacionFormulario: any;
idProyecto:any;

//Referencia del modal iniciada en la vista padre
@Input() modal!: NgbModalRef;

//Formulario 
formHito: FormGroup;


//Constructor
constructor(private msgAlert: MessageAlertService) {
  this.informacionFormulario = {};
  this.numeroPaso = 1;
  this.formHito = new FormGroup({
    nombre: new FormControl(null, Validators.required),
    fechaEstimada: new FormControl(null, Validators.required)
  });
}

/**
 * @description 
 * Funcion que se inicia al cargar el componente
*/
ngOnInit() {}

/**
 * @description 
 * Variable tipo funcion que cierra el modal.
*/
cerrarModal = (respuesta?: any):void => {
  this.modal.close(respuesta);
  this.formHito.reset();
}

/**
* @description
* Función que se ejecuta para regresar un paso en el wizard.        
*/
regresarPaso = ():void => {
  this.numeroPaso -- ;
}

/**
* @description
* Variable tipo funcion que se ejecuta para mostrar el siguiente paso en el wizard.        
* En esta funcion se valida que sea correcta la información que lleva cada paso.  
*/
 avanzarPaso = ():void => {

  switch (this.numeroPaso) {
    case 1:
          this.cerrarModal();
          break;          
    case 2:
          break;         
  }
  this.numeroPaso++;
}


}
