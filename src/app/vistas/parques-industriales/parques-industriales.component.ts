import { Component, HostListener, OnInit } from '@angular/core';
import { ModalService } from 'src/app/configuracion-aplicacion/servicios/modal.service';
import { ModalInformacionUbicacionComponent } from 'src/app/modales/parquesIndustriales/modal-informacion-ubicacion/modal-informacion-ubicacion.component';
import { ModalMostrarUbicacionComponent } from 'src/app/modales/parquesIndustriales/modal-mostrar-ubicacion/modal-mostrar-ubicacion.component';

@Component({
  selector: 'app-parques-industriales',
  templateUrl: './parques-industriales.component.html',
  styleUrls: []
})
export class ParquesIndustrialesComponent implements OnInit {

  @HostListener('window:resize', ['$event']) onResize(event:any) {
    this.configurarVista();
  }

  columnasMapa!:string;
  columnasOpciones!:string;
  ubicacionDepartamento!:string;
  listaDepartamentosUbicaciones: any [] =  [
    {
      "nombre": "Puerta del Istmo",
      "pagina": "https://pdi.com.gt/",
      "regimen": "ZDEEP",
      "status": "Aprobada por SAT y Zolic",
      "desarrollador": "Puerta del Istmo, S.A.",
      "paginaDesarrolador": "https://pdi.com.gt/",
      "telefono": "2316-4560",
      "latitud": 14.696864,
      "longitud": -92.1165826,
      "direccion": "Km. 249.5 del Municipio de Tecún Umán, en el Departamento de San Marcos",
      "zona": "",
      "departamento": "San Marcos",
      "municipio": "Pajapita",
      "tipoIndustria": "Empresas de graneles líquidos por la ubicación, pero pueden considerar industrias",
      "totalBodegas": 3,
      "bodegasDesde": 740,
      "bodegasHasta": 10000,
      "areaTotal": 3500000,
      "areaConstruccion": 77000,
      "enVenta": 0,
      "enRenta": 1,
      "distanciaAeropuertoAurora": 250,
      "distanciaPuertoQuetzal": 235,
      "distanciaPuertoSantoTomas": 551,
      "distanciaFronteraPedroAlvarado": 299,
      "distanciaFronteraTecunUman": 4.3,
      "certificaciones": "",
      "plantaDesechos": "Si",
      "pozoPropio": "Si",
      "gasPropano": "Si",
      "plantaElectrica": "Si",
      "conexionTelefonica": "Si",
      "conexionInternet": "Si",
      "accesoTransportePublico": "Si",
      "disponibilidad": "Si",
      "tipoBodega": 10,
      "alturaTecho": 9,
      "promotor": "Puerta del Istmo",
      "nombreContacto": "Fredy Vargas",
      "telefonoContacto": "2316-4560",
      "correoContacto": "fpalma@pdi.com.gt",
      "paginaPromotor": "https://pdi.com.gt/"
    },
    {
      "nombre": "Zona Libre Santander",
      "pagina": "",
      "regimen": "ZDEEP",
      "status": "Aprobada por Zolic",
      "desarrollador": "Construexpoinpo La Vib",
      "paginaDesarrolador": "",
      "telefono": "5030-0625 / 3025-7035",
      "latitud": 15.712209,
      "longitud": -88.587266,
      "direccion": "Km. 292 Santo Tomás de Castilla, Puerto Barrios, Izabal",
      "zona": "",
      "departamento": "Izabal",
      "municipio": "Puerto Barrios",
      "tipoIndustria": "Empresas de graneles líquidos por la ubicación, pero pueden considerar industrias",
      "totalBodegas": "",
      "bodegasDesde": "",
      "bodegasHasta": "",
      "areaTotal": "42,460.29",
      "areaConstruccion": "39,547.65",
      "enVenta": 1,
      "enRenta": 1,
      "distanciaAeropuertoAurora": 303,
      "distanciaPuertoQuetzal": 402,
      "distanciaPuertoSantoTomas": 6.7,
      "distanciaFronteraPedroAlvarado": 360,
      "distanciaFronteraTecunUman": 551,
      "certificaciones": "",
      "plantaDesechos": "No",
      "pozoPropio": "No",
      "gasPropano": "Si",
      "plantaElectrica": "Si",
      "conexionTelefonica": "Si",
      "conexionInternet": "Si",
      "accesoTransportePublico": "No",
      "disponibilidad": "Si",
      "tipoBodega": 10,
      "alturaTecho": 7,
      "promotor": "Zona Libre Santander",
      "nombreContacto": "Dilma Arevalo",
      "telefonoContacto": "4531-9013 / 3025-7035",
      "correoContacto": "dilma.arevalo@gmail.com",
      "paginaPromotor": ""
    },
    {
      "nombre": "Zona Libre Quetzal",
      "pagina": "http://zonalibrequetzal.com/",
      "regimen": "ZDEEP",
      "status": "Aprobada por Zolic",
      "desarrollador": "Zona Libre Quetzal",
      "paginaDesarrolador": "http://zonalibrequetzal.com/",
      "telefono": "5510-2084",
      "latitud": 13.94793,
      "longitud": -90.81126,
      "direccion": "Km.98 Puerto Quetzal, Departamento de Escuintla",
      "zona": "",
      "departamento": "Escuintla",
      "municipio": "Puerto de San José",
      "tipoIndustria": "Todas Industrias son bienvenidas desde maquilas de ropa, manufactura de eletrónicos, lógistica, graneles líquidos, hidrocarburos, empaque de granos, farmacéuticas, servicios, etc.",
      "totalBodegas": "",
      "bodegasDesde": 500,
      "bodegasHasta": "",
      "areaTotal": "1,150,000.00",
      "areaConstruccion": 800000,
      "enVenta": 1,
      "enRenta": 1,
      "distanciaAeropuertoAurora": 106,
      "distanciaPuertoQuetzal": 14.2,
      "distanciaPuertoSantoTomas": 407,
      "distanciaFronteraPedroAlvarado": 149,
      "distanciaFronteraTecunUman": 241,
      "certificaciones": "LEED",
      "plantaDesechos": "Si",
      "pozoPropio": "Si",
      "gasPropano": "Si",
      "plantaElectrica": "Si",
      "conexionTelefonica": "Si",
      "conexionInternet": "Si",
      "accesoTransportePublico": "Si",
      "disponibilidad": "Si",
      "tipoBodega": 10,
      "alturaTecho": 8,
      "promotor": "Zona Libre Quetzal",
      "nombreContacto": "Andres Sandoval",
      "telefonoContacto": "5510-2084",
      "correoContacto": "es@zonalibrequetzal.com",
      "paginaPromotor": "http://zonalibrequetzal.com/"
    },
    {
      "nombre": "PUMA 2",
      "pagina": "https://pumaenergy.com/es/whoweare/whereweoperate/detailspage?countryName=Guatemala&region=2",
      "regimen": "ZDEEP",
      "status": "Aprobada por Zolic",
      "desarrollador": "",
      "paginaDesarrolador": "",
      "telefono": "",
      "latitud": 15.712209,
      "longitud": -88.587266,
      "direccion": "Puerto de San José, Departamento de Escuintla",
      "zona": "",
      "departamento": "Escuintla",
      "municipio": "Puerto de San José",
      "tipoIndustria": "Petroleo, combustibles",
      "totalBodegas": "",
      "bodegasDesde": "",
      "bodegasHasta": "",
      "areaTotal": "277,713",
      "areaConstruccion": "",
      "enVenta": 0,
      "enRenta": 0,
      "distanciaAeropuertoAurora": 108,
      "distanciaPuertoQuetzal": 11.6,
      "distanciaPuertoSantoTomas": 409,
      "distanciaFronteraPedroAlvarado": 151,
      "distanciaFronteraTecunUman": 243,
      "certificaciones": "ISO 14001",
      "plantaDesechos": "Si",
      "pozoPropio": "Si",
      "gasPropano": "Si",
      "plantaElectrica": "Si",
      "conexionTelefonica": "Si",
      "conexionInternet": "Si",
      "accesoTransportePublico": "Si",
      "disponibilidad": "No",
      "tipoBodega": 10,
      "alturaTecho": "",
      "promotor": "PUMA 2",
      "nombreContacto": "Roberto Cuevas",
      "telefonoContacto": "2338-9000 / 4498-4444",
      "correoContacto": "Guatemala@pumaenergy.com",
      "paginaPromotor": "https://pumaenergy.com/es/whoweare/whereweoperate/detailspage?countryName=Guatemala&region=2"
    },
    {
      "nombre": "Miel Verde",
      "pagina": "",
      "regimen": "ZDEEP",
      "status": "Aprobada por SAT y Zolic",
      "desarrollador": "Miel verde",
      "paginaDesarrolador": "",
      "telefono": "2419-4600",
      "latitud": 15.01974814,
      "longitud": -89.59220422,
      "direccion": "Km127 carretera NR20, Aldea Santa Cruz, Rio Hondo, Zacapa",
      "zona": "",
      "departamento": "Zacapa",
      "municipio": "Río Hondo",
      "tipoIndustria": "Alimentos",
      "totalBodegas": 3,
      "bodegasDesde": 1200,
      "bodegasHasta": 3500,
      "areaTotal": 25000,
      "areaConstruccion": 11000,
      "enVenta": 0,
      "enRenta": 0,
      "distanciaAeropuertoAurora": 150,
      "distanciaPuertoQuetzal": 248,
      "distanciaPuertoSantoTomas": 165,
      "distanciaFronteraPedroAlvarado": 200,
      "distanciaFronteraTecunUman": 397,
      "certificaciones": "",
      "plantaDesechos": "Si",
      "pozoPropio": "Si",
      "gasPropano": "Si",
      "plantaElectrica": "Si",
      "conexionTelefonica": "Si",
      "conexionInternet": "Si",
      "accesoTransportePublico": "Si",
      "disponibilidad": "No",
      "tipoBodega": 10,
      "alturaTecho": 0,
      "promotor": "Miel Verde",
      "nombreContacto": "Julio Lacan",
      "telefonoContacto": "5423-4679",
      "correoContacto": "jlacan@jiabrands.com",
      "paginaPromotor": ""
    },
    {
      "nombre": "Puma Energy I",
      "pagina": "",
      "regimen": "ZDEEP",
      "status": "Aprobada por SAT y Zolic",
      "desarrollador": "Puma Energy Guatemala S.A.",
      "paginaDesarrolador": "",
      "telefono": "2338-9000",
      "latitud": 13.9232,
      "longitud": 90.83947,
      "direccion": "Kilómetro 1.2 carretera a Chulamar",
      "zona": "",
      "departamento": "Escuintla",
      "municipio": "Puerto San José",
      "tipoIndustria": "Comercial y Servicios",
      "totalBodegas": "",
      "bodegasDesde": "",
      "bodegasHasta": "",
      "areaTotal": "103,714.64",
      "areaConstruccion": "",
      "enVenta": "",
      "enRenta": "",
      "distanciaAeropuertoAurora": 107,
      "distanciaPuertoQuetzal": 10.7,
      "distanciaPuertoSantoTomas": 408,
      "distanciaFronteraPedroAlvarado": 123,
      "distanciaFronteraTecunUman": 242,
      "certificaciones": "",
      "plantaDesechos": "Si",
      "pozoPropio": "Si",
      "gasPropano": "Si",
      "plantaElectrica": "Si",
      "conexionTelefonica": "Si",
      "conexionInternet": "Si",
      "accesoTransportePublico": "Si",
      "disponibilidad": "No",
      "tipoBodega": "",
      "alturaTecho": "",
      "promotor": "Puma",
      "nombreContacto": "",
      "telefonoContacto": "",
      "correoContacto": "",
      "paginaPromotor": ""
    },
    {
      "nombre": "Parque Industrial Michatoya",
      "pagina": "https://michatoyapalin.com/",
      "regimen": "ZDEEP",
      "status": "Aprobada por SAT y Zolic",
      "desarrollador": "Michatoya",
      "paginaDesarrolador": "https://www.michatoyapacifico.com/es/",
      "telefono": "2311 1600",
      "latitud": 14.67055642,
      "longitud": -90.56639671,
      "direccion": "Km. 72 Ruta al Pacifico",
      "zona": "",
      "departamento": "Escuintla",
      "municipio": "Escuintla",
      "tipoIndustria": "Empresas de Servicio, Industriales y Comerciales",
      "totalBodegas": "",
      "bodegasDesde": 908.61,
      "bodegasHasta": "450,000",
      "areaTotal": "458,361",
      "areaConstruccion": 1,
      "enVenta": 1,
      "enRenta": 0.1,
      "distanciaAeropuertoAurora": 36.3,
      "distanciaPuertoQuetzal": 69.7,
      "distanciaPuertoSantoTomas": 337,
      "distanciaFronteraPedroAlvarado": 133,
      "distanciaFronteraTecunUman": 219,
      "certificaciones": "",
      "plantaDesechos": "Si",
      "pozoPropio": "Si",
      "gasPropano": "Si",
      "plantaElectrica": "Si",
      "conexionTelefonica": "Si",
      "conexionInternet": "Si",
      "accesoTransportePublico": "Si",
      "disponibilidad": "Si",
      "tipoBodega": "",
      "alturaTecho": 6,
      "promotor": "",
      "nombreContacto": "",
      "telefonoContacto": "",
      "correoContacto": "",
      "paginaPromotor": ""
    },
    {
      "nombre": "ZODISA",
      "pagina": "",
      "regimen": "ZDEEP",
      "status": "Aprobada por Zolic",
      "desarrollador": "Zona de Desarrollo Industrial Puerto Barrios,S.A",
      "paginaDesarrolador": "",
      "telefono": "",
      "latitud": 15.71906,
      "longitud": -88.577488,
      "direccion": "Calz Nueva Jerusalén Km 293",
      "zona": "",
      "departamento": "Izabal",
      "municipio": "Puerto",
      "tipoIndustria": "Comercial, Industrial y Servicios",
      "totalBodegas": "",
      "bodegasDesde": "",
      "bodegasHasta": "",
      "areaTotal": "30,073.26",
      "areaConstruccion": "",
      "enVenta": "",
      "enRenta": "",
      "distanciaAeropuertoAurora": 309,
      "distanciaPuertoQuetzal": 400,
      "distanciaPuertoSantoTomas": 1.4,
      "distanciaFronteraPedroAlvarado": 358,
      "distanciaFronteraTecunUman": 549,
      "certificaciones": "",
      "plantaDesechos": "",
      "pozoPropio": "",
      "gasPropano": "",
      "plantaElectrica": "",
      "conexionTelefonica": "",
      "conexionInternet": "",
      "accesoTransportePublico": "",
      "disponibilidad": "",
      "tipoBodega": "",
      "alturaTecho": "",
      "promotor": "",
      "nombreContacto": "",
      "telefonoContacto": "",
      "correoContacto": "",
      "paginaPromotor": ""
    },
    {
      "nombre": "Scali Centroamericana",
      "pagina": "http://scalisa.com.gt/",
      "regimen": "ZDEEP",
      "status": "Aprobada por Zolic",
      "desarrollador": "Scali Centroamericana S.A",
      "paginaDesarrolador": "",
      "telefono": "23334152/22274700",
      "latitud": 13.965252,
      "longitud": -90.797031,
      "direccion": "Kilómetro 98 Autopista a Puerto Quetzal 1era. Avenida Parcelamineto Arizona Parcela 43",
      "zona": "",
      "departamento": "Escuintla",
      "municipio": "San José",
      "tipoIndustria": "Comercial, industrial y servicios",
      "totalBodegas": "",
      "bodegasDesde": "",
      "bodegasHasta": "",
      "areaTotal": "41,454.22",
      "areaConstruccion": 1,
      "enVenta": 1,
      "enRenta": 0.1,
      "distanciaAeropuertoAurora": 104,
      "distanciaPuertoQuetzal": 8.7,
      "distanciaPuertoSantoTomas": 404,
      "distanciaFronteraPedroAlvarado": 120,
      "distanciaFronteraTecunUman": 239,
      "certificaciones": "",
      "plantaDesechos": "",
      "pozoPropio": "",
      "gasPropano": "",
      "plantaElectrica": "",
      "conexionTelefonica": "",
      "conexionInternet": "",
      "accesoTransportePublico": "",
      "disponibilidad": "",
      "tipoBodega": "",
      "alturaTecho": "",
      "promotor": "",
      "nombreContacto": "Luz Amanda Tobar Soza",
      "telefonoContacto": 46749292,
      "correoContacto": "amandadeangel@scalisa.net",
      "paginaPromotor": ""
    },
    {
      "nombre": "Zona Libre Mauricio Pacífico",
      "pagina": "",
      "regimen": "ZDEEP",
      "status": "Aprobada por Zolic",
      "desarrollador": "Inmobiliaria KJR.S.A.",
      "paginaDesarrolador": "",
      "telefono": "23206262/42987659",
      "latitud": 410709.5418,
      "longitud": -3644722473096.53,
      "direccion": "Kilómetro 62.5 Antigua carretera Puerto de San José",
      "zona": "",
      "departamento": "Escuintla",
      "municipio": "Masagua",
      "tipoIndustria": "Empresas de Servicio, Industriales y Comerciales",
      "totalBodegas": "",
      "bodegasDesde": "908,361",
      "bodegasHasta": 450,
      "areaTotal": "458,361",
      "areaConstruccion": 1,
      "enVenta": 1,
      "enRenta": 0.1,
      "distanciaAeropuertoAurora": 62.4,
      "distanciaPuertoQuetzal": 42.62,
      "distanciaPuertoSantoTomas": 363,
      "distanciaFronteraPedroAlvarado": 106,
      "distanciaFronteraTecunUman": 198,
      "certificaciones": "",
      "plantaDesechos": "",
      "pozoPropio": "",
      "gasPropano": "",
      "plantaElectrica": "",
      "conexionTelefonica": "",
      "conexionInternet": "",
      "accesoTransportePublico": "",
      "disponibilidad": "",
      "tipoBodega": "",
      "alturaTecho": "",
      "promotor": "",
      "nombreContacto": "Ariel Koll-Nescher Valenzuela",
      "telefonoContacto": 42987659,
      "correoContacto": "",
      "paginaPromotor": ""
    },
    {
      "nombre": "Zona Libre Gualán",
      "pagina": "",
      "regimen": "ZDEEP",
      "status": "Proceso",
      "desarrollador": "",
      "paginaDesarrolador": "",
      "telefono": "",
      "latitud": 15.1333168,
      "longitud": 89.3447664,
      "direccion": "Km. 166Ruta el Atlantico Aldea Mayuelas Gualan Zacapa",
      "zona": "",
      "departamento": "Zacapa",
      "municipio": "Gualán",
      "tipoIndustria": "",
      "totalBodegas": "",
      "bodegasDesde": "",
      "bodegasHasta": "",
      "areaTotal": "19,045.54",
      "areaConstruccion": "",
      "enVenta": "",
      "enRenta": "",
      "distanciaAeropuertoAurora": 181,
      "distanciaPuertoQuetzal": 275,
      "distanciaPuertoSantoTomas": 133,
      "distanciaFronteraPedroAlvarado": 233,
      "distanciaFronteraTecunUman": 424,
      "certificaciones": "",
      "plantaDesechos": "",
      "pozoPropio": "",
      "gasPropano": "",
      "plantaElectrica": "",
      "conexionTelefonica": "",
      "conexionInternet": "",
      "accesoTransportePublico": "",
      "disponibilidad": "",
      "tipoBodega": "",
      "alturaTecho": "",
      "promotor": "",
      "nombreContacto": "Enrique Rodriguez",
      "telefonoContacto": "5555-4373",
      "correoContacto": "jenrique_rz@hotmail.com",
      "paginaPromotor": ""
    },
    {
      "nombre": "Parque Industrial Quirigua",
      "pagina": "",
      "regimen": "ZDEEP",
      "status": "Proceso",
      "desarrollador": "Parque Industrial Quirigua",
      "paginaDesarrolador": "",
      "telefono": "4832-5409",
      "latitud": 15.690697,
      "longitud": -88.61021,
      "direccion": "Kilómetro 294 carretera CA-9",
      "zona": "",
      "departamento": "Izabal",
      "municipio": "Santo Tomas de Castilla",
      "tipoIndustria": "Industrial",
      "totalBodegas": "",
      "bodegasDesde": "",
      "bodegasHasta": "",
      "areaTotal": "71,666.55",
      "areaConstruccion": "",
      "enVenta": "",
      "enRenta": "",
      "distanciaAeropuertoAurora": 310,
      "distanciaPuertoQuetzal": 404,
      "distanciaPuertoSantoTomas": "",
      "distanciaFronteraPedroAlvarado": 362,
      "distanciaFronteraTecunUman": 553,
      "certificaciones": "",
      "plantaDesechos": "",
      "pozoPropio": "",
      "gasPropano": "",
      "plantaElectrica": "",
      "conexionTelefonica": "",
      "conexionInternet": "",
      "accesoTransportePublico": "",
      "disponibilidad": "",
      "tipoBodega": "",
      "alturaTecho": "",
      "promotor": "",
      "nombreContacto": "Ramon Cabarruvias",
      "telefonoContacto": "4832 5409",
      "correoContacto": "",
      "paginaPromotor": ""
    },
    {
      "nombre": "Parque Industrial Zeta La Unión",
      "pagina": "http://www.zetaonline.com/",
      "regimen": "Zona Franca",
      "status": "",
      "desarrollador": "",
      "paginaDesarrolador": "",
      "telefono": "",
      "latitud": 14.460874,
      "longitud": -90.640786,
      "direccion": "KM.30.5 Carretera CA-9 Sur Amatitlan, CA-9, Amatitlán",
      "zona": "",
      "departamento": "Guatemala",
      "municipio": "Amatitlán",
      "tipoIndustria": "Farmaceutica,Agroquimicos, textiles, quimicos, accesorios a vestuario, otros.",
      "totalBodegas": 80,
      "bodegasDesde": 100,
      "bodegasHasta": 8000,
      "areaTotal": 133000,
      "areaConstruccion": 68000,
      "enVenta": 0,
      "enRenta": 8000,
      "distanciaAeropuertoAurora": 31.3,
      "distanciaPuertoQuetzal": 79.9,
      "distanciaPuertoSantoTomas": 332,
      "distanciaFronteraPedroAlvarado": 143,
      "distanciaFronteraTecunUman": 229,
      "certificaciones": "",
      "plantaDesechos": "Si",
      "pozoPropio": "Si",
      "gasPropano": "No",
      "plantaElectrica": "Si",
      "conexionTelefonica": "Si",
      "conexionInternet": "Si",
      "accesoTransportePublico": "Si",
      "disponibilidad": "Si",
      "tipoBodega": 8,
      "alturaTecho": 8,
      "promotor": "Zeta la unión",
      "nombreContacto": "Veronica Rivera",
      "telefonoContacto": "6638-3838",
      "correoContacto": "vrivera@zetaonline.com",
      "paginaPromotor": "http://www.zetaonline.com/"
    },
    {
      "nombre": "Sadinsa",
      "pagina": "",
      "regimen": "Zona Franca",
      "status": "",
      "desarrollador": "",
      "paginaDesarrolador": "",
      "telefono": "",
      "latitud": 14.659577,
      "longitud": -90.557151,
      "direccion": "26 avenida 8-50 zona 4 de Mixco, El Naranjo, Guatemala",
      "zona": 4,
      "departamento": "Guatemala",
      "municipio": "Mixco",
      "tipoIndustria": "Mixta - Textiles, Logisticas, servicios",
      "totalBodegas": 16,
      "bodegasDesde": 500,
      "bodegasHasta": 1200,
      "areaTotal": 13974.78,
      "areaConstruccion": 7500,
      "enVenta": 0,
      "enRenta": 1,
      "distanciaAeropuertoAurora": 14.7,
      "distanciaPuertoQuetzal": 109,
      "distanciaPuertoSantoTomas": 304,
      "distanciaFronteraPedroAlvarado": 159,
      "distanciaFronteraTecunUman": 258,
      "certificaciones": "",
      "plantaDesechos": "No",
      "pozoPropio": "Si",
      "gasPropano": "Si",
      "plantaElectrica": "Si - costo aparte",
      "conexionTelefonica": "Si",
      "conexionInternet": "Si",
      "accesoTransportePublico": "Si",
      "disponibilidad": "Si",
      "tipoBodega": 8,
      "alturaTecho": 9,
      "promotor": "Sadinsa",
      "nombreContacto": "Mayra Rendon",
      "telefonoContacto": "2428-6900",
      "correoContacto": "recepcionsadinsa@gmail.com",
      "paginaPromotor": ""
    },
    {
      "nombre": "Zofracro / Zona Franca Cropa",
      "pagina": "https://grupocropa.com/servicio/centros-de-distribucion/?lang=es",
      "regimen": "Zona Franca",
      "status": "",
      "desarrollador": "",
      "paginaDesarrolador": "",
      "telefono": "",
      "latitud": 14.578205,
      "longitud": -90.547926,
      "direccion": "18 Avenida 40-23, Zona 12, Guatemala, Guatemala",
      "zona": 12,
      "departamento": "Guatemala",
      "municipio": "Guatemala",
      "tipoIndustria": "Almacenaje",
      "totalBodegas": 1,
      "bodegasDesde": 50,
      "bodegasHasta": 2000,
      "areaTotal": 10900,
      "areaConstruccion": 7300,
      "enVenta": 0,
      "enRenta": 1,
      "distanciaAeropuertoAurora": 6.4,
      "distanciaPuertoQuetzal": 101,
      "distanciaPuertoSantoTomas": 308,
      "distanciaFronteraPedroAlvarado": 145,
      "distanciaFronteraTecunUman": 250,
      "certificaciones": "",
      "plantaDesechos": "Si",
      "pozoPropio": "Si",
      "gasPropano": "No",
      "plantaElectrica": "Si",
      "conexionTelefonica": "Si",
      "conexionInternet": "Si",
      "accesoTransportePublico": "Si",
      "disponibilidad": "Si",
      "tipoBodega": 8,
      "alturaTecho": 14,
      "promotor": "Zofracro",
      "nombreContacto": "Irene Ayala",
      "telefonoContacto": "2462-4300",
      "correoContacto": "Irene.Ayala@cropa.com.gt",
      "paginaPromotor": "https://grupocropa.com/"
    },
    {
      "nombre": "Ciplesa",
      "pagina": "",
      "regimen": "Zona Franca",
      "status": "",
      "desarrollador": "",
      "paginaDesarrolador": "",
      "telefono": "",
      "latitud": 14.6402507,
      "longitud": -90.5620321,
      "direccion": "37 Avenida 2-77, Zona 7 Colonia El Rodeo, Guatemala, Guatemala",
      "zona": 7,
      "departamento": "Guatemala",
      "municipio": "Guatemala",
      "tipoIndustria": "",
      "totalBodegas": "",
      "bodegasDesde": "",
      "bodegasHasta": "",
      "areaTotal": "",
      "areaConstruccion": "",
      "enVenta": "",
      "enRenta": "",
      "distanciaAeropuertoAurora": 9.7,
      "distanciaPuertoQuetzal": 104,
      "distanciaPuertoSantoTomas": 304,
      "distanciaFronteraPedroAlvarado": 166,
      "distanciaFronteraTecunUman": 254,
      "certificaciones": "",
      "plantaDesechos": "",
      "pozoPropio": "",
      "gasPropano": "",
      "plantaElectrica": "",
      "conexionTelefonica": "",
      "conexionInternet": "",
      "accesoTransportePublico": "",
      "disponibilidad": "",
      "tipoBodega": 8,
      "alturaTecho": "",
      "promotor": "Ciplesa",
      "nombreContacto": "Leticia Estrada",
      "telefonoContacto": "2420-4747 / 2431-3109 / 2420-4600 Ext. 1220 / Cel. +502 5450-9698",
      "correoContacto": "leticia@ciplesa.com",
      "paginaPromotor": ""
    },
    {
      "nombre": "Inssa",
      "pagina": "",
      "regimen": "Zona Franca",
      "status": "",
      "desarrollador": "",
      "paginaDesarrolador": "",
      "telefono": "",
      "latitud": 14.63374177,
      "longitud": -90.58476936,
      "direccion": "Calzada Roosevelt 5-70, Zona 2 de, Mixco, Mixco, Guatemala",
      "zona": 2,
      "departamento": "Guatemala",
      "municipio": "Mixco",
      "tipoIndustria": "",
      "totalBodegas": "",
      "bodegasDesde": "",
      "bodegasHasta": "",
      "areaTotal": "",
      "areaConstruccion": "",
      "enVenta": 0,
      "enRenta": 0,
      "distanciaAeropuertoAurora": 10,
      "distanciaPuertoQuetzal": 105,
      "distanciaPuertoSantoTomas": 306,
      "distanciaFronteraPedroAlvarado": 155,
      "distanciaFronteraTecunUman": 254,
      "certificaciones": "",
      "plantaDesechos": "",
      "pozoPropio": "",
      "gasPropano": "",
      "plantaElectrica": "",
      "conexionTelefonica": "",
      "conexionInternet": "",
      "accesoTransportePublico": "",
      "disponibilidad": "No",
      "tipoBodega": 8,
      "alturaTecho": "",
      "promotor": "Inssa",
      "nombreContacto": "Karen Barahona",
      "telefonoContacto": "2429-9090",
      "correoContacto": "",
      "paginaPromotor": ""
    },
    {
      "nombre": "Consigna",
      "pagina": "",
      "regimen": "Zona Franca",
      "status": "",
      "desarrollador": "",
      "paginaDesarrolador": "",
      "telefono": "",
      "latitud": 14.51520012,
      "longitud": -90.60192631,
      "direccion": "Ruta a el Pacifico Km 19.3, Granjas Italia, Villa Nueva, Guatemala",
      "zona": "",
      "departamento": "Guatemala",
      "municipio": "Villa Nueva",
      "tipoIndustria": "",
      "totalBodegas": "",
      "bodegasDesde": "",
      "bodegasHasta": "",
      "areaTotal": "",
      "areaConstruccion": "",
      "enVenta": 0,
      "enRenta": 0,
      "distanciaAeropuertoAurora": 18.2,
      "distanciaPuertoQuetzal": 89,
      "distanciaPuertoSantoTomas": 320,
      "distanciaFronteraPedroAlvarado": 153,
      "distanciaFronteraTecunUman": 238,
      "certificaciones": "",
      "plantaDesechos": "",
      "pozoPropio": "",
      "gasPropano": "",
      "plantaElectrica": "",
      "conexionTelefonica": "",
      "conexionInternet": "",
      "accesoTransportePublico": "",
      "disponibilidad": "No",
      "tipoBodega": 8,
      "alturaTecho": "",
      "promotor": "Consigna",
      "nombreContacto": "Clayton Alburez",
      "telefonoContacto": "5963-6871 / 6630-5353 Ext. 104",
      "correoContacto": "",
      "paginaPromotor": ""
    }
  ];
  listadoDepartamentos: any [] = [];
  listaUbicaciones: any [] = [];
  listadoUbicaciones: any [] = [];
  constructor(private servicioModal: ModalService) {
    this.configurarVista();
   }

  ngOnInit(): void {
  }
  configurarVista(){
    if(window.innerWidth < 991){
      this.columnasMapa = this.columnasOpciones = "row";
    }
    else{
      this.columnasMapa = "col-md-6";
      this.columnasOpciones = "col-md-3";
    }
  }
  filtrar(tipo:any){
    tipo = tipo === 1? 'Zona Franca' : 'ZDEEP';
    this.ubicacionDepartamento = "";
    this.listadoUbicaciones = [];
    let departamentos: any [] = [];
    this.listaUbicaciones = [];
    this.listaDepartamentosUbicaciones.forEach(ubicacion => {
      if(ubicacion.regimen === tipo){
        this.listaUbicaciones.push(ubicacion);
        let departamentoBuscado = departamentos.filter(departamento => departamento.departamento === ubicacion.departamento)[0];
        if(departamentoBuscado){
          departamentoBuscado.numeroUbicaciones ++;
        }
        else{
          departamentos.push({departamento: ubicacion.departamento, numeroUbicaciones: 1});
        }
      }
    });
    this.listadoDepartamentos = departamentos;
  }

  verParques(departamento:any){
    this.ubicacionDepartamento = departamento;
    this.listadoUbicaciones = this.listaUbicaciones.filter(ubicacion => ubicacion.departamento === departamento);
  }

  mostrarUbicacion(ubicacion: any){
    this.servicioModal.abrirModal(ModalMostrarUbicacionComponent,"ubicacion",ubicacion);
  }

  mostrarInformacionUbicacion(ubicacion: any){
    this.servicioModal.abrirModal(ModalInformacionUbicacionComponent,"ubicacion",ubicacion);
  }

}
