import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ModalService } from 'src/app/configuracion-aplicacion/servicios/modal.service';
import { ModalDescargaArchivoComponent } from 'src/app/modales/varios/modal-descarga-archivo/modal-descarga-archivo.component';
import { ModalVideoComponent } from 'src/app/modales/varios/modal-video/modal-video.component';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: []
})
export class InicioComponent implements OnInit {

  constructor(private modal: ModalService) { }

  ngOnInit() {
    try {
      document.querySelector('#titulo')?.scrollIntoView();
    } catch (e) { }
  }
  
  reproducirVideo(url:string){
    this.modal.abrirModal(ModalVideoComponent,"url",url,"",0,"modal-lg");
  }

  descargarArchivo(){
    this.modal.abrirModal(ModalDescargaArchivoComponent);
  }
  
}
