import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { LOCALE_ID, NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { registerLocaleData } from '@angular/common';
import localerGt from '@angular/common/locales/es-GT';



import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ErrorPageComponent } from './configuracion-aplicacion/componentes/error-page/error-page.component';
import { LoadingComponent } from './configuracion-aplicacion/componentes/loading/loading.component';
import { MessageAlertComponent } from './configuracion-aplicacion/componentes/message-alert/message-alert.component';
import { FooterComponent } from './configuracion-aplicacion/secciones/footer/footer.component';
import { InterceptorAppService } from './configuracion-aplicacion/servicios/interceptores/interceptor-app.service';
import { InterceptorAuthService } from './configuracion-aplicacion/servicios/interceptores/interceptor-auth.service';
import { InterceptorHeaderService } from './configuracion-aplicacion/servicios/interceptores/interceptor-header.service';
import { InicioComponent } from './vistas/inicio/inicio.component';
import { NavbarComponent } from './configuracion-aplicacion/secciones/navbar/navbar.component';

import { InputAppComponent } from './configuracion-aplicacion/componentes/input-app/input-app.component';
import {NgbPaginationModule, NgbModule, NgbDateAdapter} from '@ng-bootstrap/ng-bootstrap';
import { SelectComponent } from './configuracion-aplicacion/componentes/select/select.component';
import { NgSelectModule } from '@ng-select/ng-select';
import { ModalFooterComponent } from './configuracion-aplicacion/secciones/modal-footer/modal-footer.component';
import { ModalHeaderComponent } from './configuracion-aplicacion/secciones/modal-header/modal-header.component';
import { OutputComponent } from './configuracion-aplicacion/componentes/output/output.component';
import { DatepickerComponent } from './configuracion-aplicacion/componentes/datepicker/datepicker.component';
import { TxtareaComponent } from './configuracion-aplicacion/componentes/txtarea/txtarea.component';
import { DatepickerAdapterService } from './configuracion-aplicacion/servicios/datepicker-adapter.service';
import { HistorialComponent } from './configuracion-aplicacion/componentes/historial/historial.component';
import { MapaComponent } from './configuracion-aplicacion/componentes/mapa/mapa.component';
import { ContadorComponent } from './configuracion-aplicacion/componentes/contador/contador.component';
import { ModalVideoComponent } from './modales/varios/modal-video/modal-video.component';
import { HoverClassDirective } from './configuracion-aplicacion/directivas/hover-class.directive';
import { ModalDescargaArchivoComponent } from './modales/varios/modal-descarga-archivo/modal-descarga-archivo.component';
import { DatosGeneralesComponent } from './vistas/datos-generales/datos-generales.component';
import { IniciarOperacionesComponent } from './vistas/iniciar-operaciones/iniciar-operaciones.component';
import { AcuerdosComercialesInversionComponent } from './vistas/acuerdos-comerciales-inversion/acuerdos-comerciales-inversion.component';
import { QuienesSomosComponent } from './vistas/quienes-somos/quienes-somos.component';
import { MapaMundoComponent } from './configuracion-aplicacion/componentes/mapa-mundo/mapa-mundo.component';
import { ContactenosComponent } from './vistas/contactenos/contactenos.component';
import { TramitesDisercomiComponent } from './vistas/tramites-disercomi/tramites-disercomi.component';
import { CasosExitoComponent } from './vistas/casos-exito/casos-exito.component';
import { ParquesIndustrialesComponent } from './vistas/parques-industriales/parques-industriales.component';
import { ModalMostrarUbicacionComponent } from './modales/parquesIndustriales/modal-mostrar-ubicacion/modal-mostrar-ubicacion.component';
import { ModalInformacionUbicacionComponent } from './modales/parquesIndustriales/modal-informacion-ubicacion/modal-informacion-ubicacion.component';
import { InformacionDepartamentosComponent } from './vistas/informacion-departamentos/informacion-departamentos.component';

registerLocaleData(localerGt, 'es-GT');
@NgModule({
  declarations: [
    AppComponent,
    FooterComponent,
    MessageAlertComponent,
    LoadingComponent,
    ErrorPageComponent,
    InicioComponent,
    NavbarComponent,
    InputAppComponent,
    SelectComponent,
    ModalFooterComponent,
    ModalHeaderComponent,
    OutputComponent,
    DatepickerComponent,
    TxtareaComponent,
    HistorialComponent,
    MapaComponent,
    ContadorComponent,
    ModalVideoComponent,
    HoverClassDirective,
    HoverClassDirective,
    ModalDescargaArchivoComponent,
    DatosGeneralesComponent,
    IniciarOperacionesComponent,
    AcuerdosComercialesInversionComponent,
    QuienesSomosComponent,
    MapaMundoComponent,
    MapaComponent,
    ContactenosComponent,
    TramitesDisercomiComponent,
    CasosExitoComponent,
    ParquesIndustrialesComponent,
    ModalMostrarUbicacionComponent,
    ModalInformacionUbicacionComponent,
    InformacionDepartamentosComponent
  ],
  imports: [
    NgbPaginationModule,
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgbModule,
    NgSelectModule,
   
  ],
  providers: [
    { provide: LOCALE_ID, useValue: 'es-GT' },
    { provide: HTTP_INTERCEPTORS,      useClass: InterceptorHeaderService,  multi: true },
    { provide: HTTP_INTERCEPTORS,      useClass: InterceptorAppService,     multi: true },
    { provide: HTTP_INTERCEPTORS,      useClass: InterceptorAuthService,    multi: true },
    { provide: NgbDateAdapter,         useClass: DatepickerAdapterService}

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
