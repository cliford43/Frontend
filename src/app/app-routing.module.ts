import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ErrorPageComponent } from './configuracion-aplicacion/componentes/error-page/error-page.component';
import { GuardAuth } from './configuracion-aplicacion/servicios/guard-auth.service';
import { AcuerdosComercialesInversionComponent } from './vistas/acuerdos-comerciales-inversion/acuerdos-comerciales-inversion.component';
import { CasosExitoComponent } from './vistas/casos-exito/casos-exito.component';
import { ContactenosComponent } from './vistas/contactenos/contactenos.component';
import { DatosGeneralesComponent } from './vistas/datos-generales/datos-generales.component';
import { IniciarOperacionesComponent } from './vistas/iniciar-operaciones/iniciar-operaciones.component';
import { InicioComponent } from './vistas/inicio/inicio.component';
import { ParquesIndustrialesComponent } from './vistas/parques-industriales/parques-industriales.component';
import { QuienesSomosComponent } from './vistas/quienes-somos/quienes-somos.component';
import { TramitesDisercomiComponent } from './vistas/tramites-disercomi/tramites-disercomi.component';
import { InformacionDepartamentosComponent } from './vistas/informacion-departamentos/informacion-departamentos.component';
import { IndicadoresLogisticosComponent } from './vistas/indicadores-logisticos/indicadores-logisticos.component';
const routes: Routes = [
  { path : '', component : InicioComponent, canActivate:[GuardAuth]},
  { path : 'datosGenerales', component : DatosGeneralesComponent, canActivate:[GuardAuth]},
  { path : 'iniciarOperaciones', component : IniciarOperacionesComponent, canActivate:[GuardAuth]},
  { path : 'acuerdosComercialesInversion', component : AcuerdosComercialesInversionComponent, canActivate:[GuardAuth]},
  { path : 'quienesSomos', component : QuienesSomosComponent, canActivate:[GuardAuth]},
  { path : 'contactenos', component : ContactenosComponent, canActivate:[GuardAuth]},
  { path : 'tramitesDisercomi', component : TramitesDisercomiComponent, canActivate:[GuardAuth]},
  { path : 'casosExito', component : CasosExitoComponent, canActivate:[GuardAuth]},
  { path : 'parquesIndustriales', component : ParquesIndustrialesComponent, canActivate:[GuardAuth]},
  { path : 'error', component : ErrorPageComponent},
  { path : 'informacionDepartamentos', component : InformacionDepartamentosComponent, canActivate:[GuardAuth]},
  { path : 'indicadoresLogisticos', component : IndicadoresLogisticosComponent, canActivate:[GuardAuth]},
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
