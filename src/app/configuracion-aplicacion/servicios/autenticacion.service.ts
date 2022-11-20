import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import firebase from 'firebase/compat/app';
import { ApiUsuariosService } from './apis/api-usuarios';
import { BlockUiService } from './block-ui.service';
import { MessageAlertService } from './message-alert.service';


@Injectable({
  providedIn: 'root'
})
export class AutenticacionService {
  constructor(public auth: AngularFireAuth, 
              public mensaje: MessageAlertService, 
              public apiAutenticacion: ApiUsuariosService,
              private router: Router,
              private blockUI: BlockUiService,){
  }
  login() {
    this.blockUI.lock();
    this.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider()).then(res => {
      this.auth.currentUser.then(user =>{
        user?.getIdToken().then(token =>{
          var cuerpoSolicitud = {
            tokenGoogle: token
          };
          this.apiAutenticacion.postAutenticar(cuerpoSolicitud).then( respuesta => {
            this.blockUI.unlock();
            if(respuesta.idRol == "RU00"){
              this.mensaje.successAlert("LR-201","Se registro su cuenta correctamente, espere a que el administrador del sistema apruebe su acceso y vuelva a iniciar sesión");
              return;
            }
            sessionStorage.setItem("accessToken", token);
            sessionStorage.setItem("guard", "Authorization");
            sessionStorage.setItem("usuario",JSON.stringify(respuesta));
            this.router.navigate(["/inicio"]);
          }).catch(error =>{});
        })
      });
    })
    .catch(error => {
      this.blockUI.unlock();
      this.mensaje.errorAlert("LR-401","No se pudo completar el inicio de sesión");
    });
  }
  validarUsuario(){
    this.blockUI.lock();
    this.apiAutenticacion.getUsuarioAutenticado().then(respuesta =>{
      this.blockUI.unlock();
      this.router.navigate(["inicio"]);
    })
    .catch(error =>{
      this.blockUI.unlock();
    });
  }
  logout() {
    this.blockUI.lock();
    this.auth.signOut()
    .then(respuesta =>{
      this.router.navigate(["login"]);
      sessionStorage.clear();
      this.blockUI.unlock();
    })
    .catch(error => {
      this.blockUI.unlock();
    });
  }
}
