import { Component, Input, OnInit } from '@angular/core';
import { NgbModalRef } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-modal-informacion-ubicacion',
  templateUrl: './modal-informacion-ubicacion.component.html',
  styleUrls: []
})
export class ModalInformacionUbicacionComponent implements OnInit {

 //Referencia del modal iniciada en la vista padre
 @Input() modal!: NgbModalRef;
  
 ubicacion: any;

 etiquetas: any = [
  {campo: "status", etiqueta : "Estado"},
  {campo: "desarrollador", etiqueta : "Desarrollador"},
  {campo: "paginaDesarrolador", etiqueta : "Página del desarrollador"},
  {campo: "direccion", etiqueta : "Dirección"},
  {campo: "departamento", etiqueta : "Departamento"},
  {campo: "municipio", etiqueta : "Municipio"},
  {campo: "totalBodegas", etiqueta : "Total de bodegas"},
  {campo: "areaTotal", etiqueta : "Área Total del complejo (M)"},
  {campo: "enVenta", etiqueta : "En Venta"},
  {campo: "enRenta", etiqueta : "En Renta"},
  {campo: "distanciaAeropuertoAurora", etiqueta : "Distancias a Aeropuerto Internacional La Aurora (km)"},
  {campo: "distanciaPuertoQuetzal", etiqueta : "Distancias a Puerto Quetzal (km)"},
  {campo: "distanciaPuertoSantoTomas", etiqueta : "Distancias a Puerto Santo Tomas de Castilla (km)"},
  {campo: "distanciaFronteraPedroAlvarado", etiqueta : "Distancias a Frontera Pedro de Alvarado (km)"},
  {campo: "distanciaFronteraTecunUman", etiqueta : "Distancias a Frontera Tecún Umán (km)"},
  {campo: "certificaciones", etiqueta : "Parque Industrial/ZDEEP: Certificaciones"},
  {campo: "plantaDesechos", etiqueta : "Hay planta de tratamiento de desechos"},
  {campo: "pozoPropio", etiqueta : "Pozo propio"},
  {campo: "gasPropano", etiqueta : "Instalación de gas propano"},
  {campo: "plantaElectrica", etiqueta : "Planta eléctrica de emergencia"},
  {campo: "conexionTelefonica", etiqueta : "Acceso a conexión de telefonía"},
  {campo: "conexionInternet", etiqueta : "Acceso a conexión de internet"},
  {campo: "accesoTransportePublico", etiqueta : "Acceso a transporte público"},
  {campo: "disponibilidad", etiqueta : "Disponibilidad"},
  {campo: "alturaTecho", etiqueta : "Altura del techo (M) (al hombro)"}
 ];
 
 constructor() {}

 ngOnInit(): void {}

 /**
* @description 
* Variable tipo funcion que cierra el modal.
*/
cerrarModal = ():void => {
 this.modal.close();
}

}
