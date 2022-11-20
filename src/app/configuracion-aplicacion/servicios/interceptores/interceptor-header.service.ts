import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from 'rxjs';

/**
 * Interceptor que se encarga de colocar los headers a las petición
 */
@Injectable({
  providedIn: 'root'
})
export class InterceptorHeaderService implements HttpInterceptor {

  //metodo que procesa el request y response
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    //Procesando el request
    const authToken:    string = window.sessionStorage.getItem("accessToken") as string;

    if (request && request.url.includes("api/") && !request.url.includes("autenticar")) {
      
      //Si existe token en la sesion del navegador
      if (authToken) {
        request = request.clone( { setHeaders: { Authorization: "Bearer " + authToken } } );
      }
    }

    return next.handle(request);
  }

}