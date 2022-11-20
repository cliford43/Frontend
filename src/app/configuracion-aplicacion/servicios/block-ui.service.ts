import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root",
})
/**
 * Clase para llevar control de las peticiones que solicitan bloqueo de pantalla
 * Se considera que se puede desbloquear hasta que la ultima peticion retorno
 */
export class BlockUiService {
  requestCounter: number;

  constructor() {
    this.requestCounter = 0;
  }

  /**
   * @description 
   */
  lock() {
    this.requestCounter++;
    //console.log("Peticion bloqueada no.", this.requestCounter);
  }

  /**
   * @description 
   */
  unlock() {
    if (this.isBlocked()) this.requestCounter--;
    //console.log("Peticion desbloqueada no.", this.requestCounter);
  }

  /**
   * @description 
   */
  isBlocked(): boolean {
    return this.requestCounter > 0;
  }
}
