import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from "@angular/common/http";
import { MessageAlertService } from "../message-alert.service";
import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { catchError, filter, switchMap, take } from 'rxjs/operators';

/**
 * Interceptor que procesa las respuestas de la seguridad de SAT
 */
@Injectable({
  providedIn: 'root'
})
export class InterceptorAuthService implements HttpInterceptor {

	private isRefreshingConect: boolean = false;
	private refreshConectSubject: BehaviorSubject<any> = new BehaviorSubject<any>(null);
  
  private refreshToken:string;
  private guard:string;

  constructor(private msgAlert: MessageAlertService) {
    this.refreshToken = "";
    this.guard = "";
  }

  //metodo que procesa el request y response
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    
    this.refreshToken = window.sessionStorage.getItem("refreshToken") as string;
    this.guard        = window.sessionStorage.getItem("guard") as string;
        
    return next.handle(request)
      .pipe(
        catchError(error => { return this.procesarHttpError(error, request, next); })
      );
  }

  // ======================================================================================
  //Procesa los response de error  status > 201
  procesarHttpError(response: any, request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    if (response instanceof HttpErrorResponse) {      
      if (response.status === 401) {
        //Si es por token invalido
        if (response.error.error == 'invalid_token') {
          if (this.refreshToken && this.guard == 'Authorization') { 
            return this.handle401Error(request, next, this.refreshToken);
          }
          else {
            this.cerrarSession();
          }
        }
      } else if (response.status == 503){
        return this.handle503Error(request, next);
      } else if (response.status == 500) {        
        this.msgAlert.errorAlert("500", this.obtenerMensajeError(response));
        return throwError(null);        
      }
    }
    return throwError(response);
  }

  // ======================================================================================
  // Procesa los response de error status 401.
  // Renueva el token.
	private handle401Error(request: HttpRequest<any>, next: HttpHandler, refreshToken: string): Observable<HttpEvent<any>> {

          return next.handle(this.addToken(request, ""));
	}

  // ======================================================================================
  // Procesa los response de error status 503 de alfresco o 500 de MS por despliege.
  // Renueva el token.  
	private handle503Error(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

		return this.refreshConectSubject.pipe(
			filter(num => num != null),
			take(1),
			switchMap(() => {
				return next.handle(request);
			}),
			catchError(err => {
				if (!this.isRefreshingConect)
					console.error('error al reintentar, intenta una ves más', err);
				return this.handle503Error(request, next);
			})
		);

  }
  
  // ======================================================================================
  // Agrega token al header.
	private addToken(request: HttpRequest<any>, token: string) {
		return request.clone({
			setHeaders: { Authorization: 'Bearer ' + token }
		});
  }

  // ======================================================================================
  // Limpia session storages  
	private cerrarSession() {
		window.sessionStorage.removeItem('accessToken');
		window.sessionStorage.removeItem('refreshToken');
		window.sessionStorage.removeItem('pageRedirect');
		window.sessionStorage.removeItem('pageRedirectParams');
		window.sessionStorage.removeItem("guard");
		window.location.reload();
  }

  // ======================================================================================
  // Obtiene mensaje en response error   
  private obtenerMensajeError(response: any): string {
    let mensaje = "Error desconocido";
    
    if (response.error.error) {
      mensaje = response.error.error;       // zuul
    }else if (response.error.message) {   
      mensaje = response.error.message;     // proxy
    }else if (response.error.userMessage) {
      mensaje = response.error.userMessage; // catalogo y rtu
    } else if (response.error) {
      mensaje = response.error.mensaje;
    }

    return mensaje;
  }

}