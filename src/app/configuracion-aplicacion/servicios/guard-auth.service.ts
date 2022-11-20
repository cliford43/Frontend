import { Injectable } from "@angular/core";
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from "@angular/router";
import { Observable } from "rxjs";
import { BlockUiService } from "./block-ui.service";


@Injectable({
    providedIn: "root"
})
export class GuardAuth implements CanActivate {
    
    constructor(private blockUI: BlockUiService) { }
    
    canActivate( next: ActivatedRouteSnapshot, state: RouterStateSnapshot ): Observable<boolean> | Promise<boolean> | boolean {
        /** 
         * si no existe token o si existe lo valida
        
        if (!sessionStorage.getItem("accessToken")) {
            this.blockUI.lock();
            window.location.href = "login";
            this.blockUI.unlock();
            return false;
        } else {
            return this.apiAutenticacion.getUsuarioAutenticado().then(respuesta =>{
                return true;
            }).catch(error => {
                this.blockUI.lock();
                sessionStorage.clear();
                window.location.href = "login";
                this.blockUI.unlock();
                return false;
            });
        }*/
        return true;
    }
}
