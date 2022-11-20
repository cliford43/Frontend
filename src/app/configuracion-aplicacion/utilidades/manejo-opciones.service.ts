import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ManejoOpcionesService {

  //Variables
  usuario: any;
  constructor() {    
  }


  public mostrarOpcion(nombre: string, item?: any){
    if(!sessionStorage.getItem("usuario")){
      return false;
    }
    if(!this.usuario){
      this.usuario  = JSON.parse(sessionStorage.getItem("usuario") as string);
    }    
    switch (nombre) {
      case "editarProyecto":
        return this.mostrarEditarProyecto(item);
      case "cambiarEstadoProyecto":
        return this.mostrarCambiarEstadoProyecto(item);
      default:
        return false;
    }
  }

  
  private mostrarEditarProyecto(item: any){
    return item.idEstado === "EP01" || item.idEstado === "EP08";
  }

  private mostrarCambiarEstadoProyecto(item: any){
    return item.idEstado !== "EP09";
  }

}
