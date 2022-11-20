import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from "@angular/common/http";
import { MessageAlertService } from "../message-alert.service";
import { Injectable } from "@angular/core";
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { BlockUiService } from "../block-ui.service";
import { Router } from "@angular/router";



/**
 * Interceptor que procesa las respuestas de las peticiones a los apis de la aplicacion
 */
@Injectable({
  providedIn: 'root'
})
export class InterceptorAppService implements HttpInterceptor {

  constructor(private msgAlert: MessageAlertService,
              private blockUI: BlockUiService,
              public router: Router ) { }

  //metodo que procesa el request y response
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    this.blockUI.lock();
    return next.handle(request).pipe(
        tap({
            next:eventoExito  => this.procesarHttpResponse(eventoExito),
            error:eventError  => this.procesarHttpError(eventError),
            complete:()       => {this.blockUI.unlock();}
        })
    );
  }

  // ======================================================================================  
  //Procesa los response de exito status 200 o 201
    procesarHttpResponse(eventoExito: HttpEvent<any>): void {
    }

  // ======================================================================================
  //Procesa los response de error  status > 201
  procesarHttpError(response: HttpEvent<any>):void {
    
    this.blockUI.unlock();
    if(!response){
      return;
    }
    let responseError = JSON.parse(JSON.stringify(response));    
    
    //hack para cuando el tipo de error  de un servicio que tambien devuelve blob
    if (responseError.status !== 401 && (response instanceof ArrayBuffer)) {
      let dataView = new DataView(response);
      let decoder = new TextDecoder('utf8');
      responseError.error = JSON.parse(decoder.decode(dataView));
    }

    let titulo:string = "";
    let mensaje:string = "";
    let listaErrores:any[] = new Array();

    //Obteniendo datos del error
    if (responseError.error){
      titulo  = "LR-" + responseError.status;      

      //Obteniendo mensaje general
      if(responseError.error.mensaje){
        mensaje = responseError.error.mensaje;
      }

      //Obteniendo lista de erroes
      if(responseError.error.errores) {
        listaErrores = responseError.error.errores;
      }      
    }

    //Mostrando el mensaje
    if( responseError.status === 303 || responseError.status === 404 ){
      this.msgAlert.infoAlert(titulo ,mensaje);
    } else if( responseError.status === 400 || responseError.status === 403 || responseError.status === 415 || responseError.status === 422 ){
      this.msgAlert.warningAlert(titulo ,responseError.error.mensaje,listaErrores);
    } else if( responseError.status  === 401 && responseError.error.mensaje){
      sessionStorage.setItem("codigoError", responseError.status);
      sessionStorage.setItem("mensajeError", responseError.error.mensaje);
      this.router.navigate(["/error"]);
    }else if(responseError.status <= 0){
      sessionStorage.setItem("codigoError", "000");
      sessionStorage.setItem("mensajeError", "Hay un problema con la red, por favor intente más tarde");
      this.router.navigate(["/error"]);
    }
    this.blockUI.unlock();
    
  }

}