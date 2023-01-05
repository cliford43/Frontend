import { Component, ElementRef, Inject, NgZone, OnInit, PLATFORM_ID, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import * as am5 from '@amcharts/amcharts5';
import * as am5xy from '@amcharts/amcharts5/xy';
import am5themes_Animated from '@amcharts/amcharts5/themes/Animated';
import { isPlatformBrowser } from '@angular/common';
import * as am5percent from "@amcharts/amcharts5/percent";
import { HttpClient } from "@angular/common/http";

import { Aereo } from "./depto";
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import * as $ from 'jquery';
import { html } from 'd3';
import { environment } from "../../../environments/environment";
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

//import * as d3 from 'd3';

@Component({
  selector: 'app-indicadores-logisticos',
  templateUrl: './indicadores-logisticos.component.html',
  styleUrls: [],

})
export class IndicadoresLogisticosComponent implements OnInit {
  aduanasInfo = [
    {
      "id": 1,
      "nombre": "Aduana El Ceibo",
      "depto": "Petén",
      "tipo": "Terrestre",
      "direccion": "Kilómetro 657.5 de la Carretera Departamental número RD-PET-13, del Municipio de la Libertad, del Departamento de El Peten"
    },
    {
      "id": 2,
      "nombre": "Aduana San Cristobal",
      "depto": "Jutiapa",
      "tipo": "Terrestre",
      "direccion": "Kilómetro 175 de la Carretera Centroamericana número CA-1 Or. Aldea San Cristóbal de la Frontera, Municipio de Atescatempa, Departamento de Jutiapa"
    },
    {
      "id": 3,
      "nombre": "Aduana Pedro De Alvarado",
      "depto": "Jutiapa",
      "tipo": "Terrestre",
      "direccion": "Kilómetro 166 de la Carretera Centroamericana número CA-2 Or. Ciudad Pedro de Alvarado, Municipio de Moyuta, Departamento de Jutiapa"
    },
    {
      "id": 4,
      "nombre": "Aduana Integrada El Florido",
      "depto": "Chiquimula",
      "tipo": "Terrestre",
      "direccion": "Kilómetro 228 de la Carretera Centroamericana número CA-11. Caserío El Florido, Municipio de Camotán, Departamento de Chiquimula"
    },
    {
      "id": 5,
      "nombre": "Aduana Integrada Agua Caliente",
      "depto": "Chiquimula",
      "tipo": "Terrestre",
      "direccion": "Kilómetro 240 de Carretera Centroamericana número CA-10. Aldea Agua Caliente, Municipio de Esquipulas, Departamento de Chiquimula"
    },
    {
      "id": 6,
      "nombre": "Aduana La Ermita",
      "depto": "Chiquimula",
      "tipo": "Terrestre",
      "direccion": "Kilómetro 237 de la Carretera Centroamericana número CA-12. Aldea Anguiatú, Municipio Concepción Las Minas, Departamento de Chiquimula"
    },
    {
      "id": 7,
      "nombre": "Aduana Integrada Corinto",
      "depto": "Izabal",
      "tipo": "Terrestre",
      "direccion": "Kilometro 303 entrada por aldea Entre Rios Puerto Barrios, Izabal"
    },
    {
      "id": 8,
      "nombre": "Aduana Valle Nuevo",
      "depto": "Jutiapa",
      "tipo": "Terrestre",
      "direccion": "Kilómetro 129 de la Carretera Centroamericana número CA-8. Caserío Valle Nuevo, Municipio de Jalpatagua, Departamento de Jutiapa"
    },
    {
      "id": 9,
      "nombre": "Aduana Santo Tomas De Castilla",
      "depto": "Izabal",
      "tipo": "Marítima",
      "direccion": "Dentro del Puerto Maritimo Puerto Santo Tomas de Castilla en la calle principal al muelle a la altura del Kilometro 298 de la carretera Centroamericana CA-9 norte, municipio de Puerto Barrios, Departamento de Izabal"
    },
    {
      "id": 10,
      "nombre": "Aduana Tecun Uman I",
      "depto": "San Marcos",
      "tipo": "Terrestre",
      "direccion": "2ª Av. y 7ª calle 7-52 zona 2, Municipio de Tecún Umán, Departamento de San Marcos"
    },
    {
      "id": 11,
      "nombre": "Aduana Puerto Barrios",
      "depto": "Izabal",
      "tipo": "Marítima",
      "direccion": "Dentro del Puerto marítimo Puerto Barrios en la 9ª Calle Final, Colonia Las Champas, Municipio de Puerto Barrios, Departamento de Izabal"
    },
    {
      "id": 12,
      "nombre": "Aduana Express Aereo",
      "depto": "Guatemala",
      "tipo": "Aérea",
      "direccion": "15 calle “A” y 9a. Avenida frente al Club Aurora zona 13"
    },
    {
      "id": 13,
      "nombre": "Aduana Melchor De Mencos",
      "depto": "Petén",
      "tipo": "Terrestre",
      "direccion": "Kilometro 557 de la carretera Centroamericana número CA-13 Barrio Fallabon, Melchor de Mencos, Departamento de Petén"
    },
    {
      "id": 14,
      "nombre": "Aduana El Carmen",
      "depto": "San Marcos",
      "tipo": "Terrestre",
      "direccion": "Kilómetro 290 de la Carretera Centroamericana número CA-2-Occ., Aldea El Carmen, Municipio de Malacatán, Departamento de San Marcos"
    },
    {
      "id": 15,
      "nombre": "Aduana Puerto Quetzal",
      "depto": "Escuintla",
      "tipo": "Marítima",
      "direccion": "Kilómetro 111 de la Carretera Centroamericana número CA-9 Sur, Puerto Quetzal. Municipio de San José, Departamento de Escuintla"
    },
    {
      "id": 16,
      "nombre": "Aduana Central",
      "depto": "Guatemala",
      "tipo": "Terrestre",
      "direccion": "Aduana terrestre, 26 Calle 7-25 zona 11, Ciudad de Guatemala., Guatemala"
    },
    {
      "id": 17,
      "nombre": "Aduana La Mesilla",
      "depto": "Huehuetenango",
      "tipo": "Terrestre",
      "direccion": "Kilómetro 336 de la Carretera Centroamericana número CA-1-Occ. Aldea La Mesilla, Municipio La Democracia, Departamento de Huehuetenango"
    },
    {
      "id": 18,
      "nombre": "Aduana Tikal",
      "depto": "Petén",
      "tipo": "Aérea",
      "direccion": "Edificio “A”. Aeropuerto Internacional Mundo Maya. Santa Elena, Flores, Departamento de El Petén"
    },
    {
      "id": 19,
      "nombre": "Aduana Fardos Postales",
      "depto": "Guatemala",
      "tipo": "Terrestre",
      "direccion": "7a. Av. 11-69 zona 1 2o. Nivel, Edificio El Correo Oficina 203, Ciudad de Guatemala, Guatemala"
    },
    {
      "id": 20,
      "nombre": "Aduana Central De Aviacion",
      "depto": "Guatemala",
      "tipo": "Aérea",
      "direccion": "Aeropuerto Internacional La Aurora, 1er. Nivel, zona 13, Ciudad de Guatemala, Guatemala"
    },
    {
      "id": 21,
      "nombre": "Aduana Tecun Umán II",
      "depto": "San Marcos",
      "tipo": "Terrestre",
      "direccion": "Km. 251 Carretera Aldea El Triunfo, Tecún Umán, Departamento de San Marcos"
    }
  ];
  name = "Angular";
  element = false;
  nombreDepartamento = "";
  descripcionDepartamento = "";
  anioDepartamento = 0;
  poblacionTotal = 0;
  poblacionInicio = 0;
  hombresTotal = 0;
  hombresInicio = 0;
  porcentajeHombres = 0;
  mujeresTotal = 0;
  mujeresInicio = 0;
  porcentajeMujeres = 0;
  private root!: am5.Root;
  @ViewChild("videoPlayer", { static: false })
  videoplayer!: ElementRef;
  rutasAereo: Aereo[] = [];
  rutasMaritimas: Aereo[] = [];
  rutasTerrestres: Aereo[] = [];
  rutasTerrestresGt: Aereo[] = [];

  public nombremodal="";
  public deptomodal="";
  public tipomodal="";
  public direccionmodal="";

  constructor(@Inject(PLATFORM_ID) private platformId: Object, private zone: NgZone, private activatedRoute: ActivatedRoute, private http: HttpClient, private modalService: NgbModal) {
    this.activatedRoute.params.subscribe(params => {
      // let deptoId = params['id'];

      this.element = false;

      this.element = true;

      let url = environment.API_URL + "rutasAereo";
      this.http.get<Aereo>(url).subscribe(data => {
        for (var i = 0; i < data['length']; i++) {
          this.rutasAereo.push(data[i]);
        }
      });
      let url2 = environment.API_URL + "rutasMaritimo";
      this.http.get<Aereo>(url2).subscribe(data => {
        for (var i = 0; i < data['length']; i++) {
          this.rutasMaritimas.push(data[i]);
        }
      });
      let url3 = environment.API_URL + "rutasTerrestreInternacional";
      this.http.get<Aereo>(url3).subscribe(data => {
        for (var i = 0; i < data['length']; i++) {
          this.rutasTerrestres.push(data[i]);
        }
      });
      let url4 = environment.API_URL + "rutasTerrestresGt";
      this.http.get<Aereo>(url4).subscribe(data => {
        for (var i = 0; i < data['length']; i++) {
          this.rutasTerrestresGt.push(data[i]);
        }
      });
      


    });

  }
  asignar(idBusca: number, idIter: number, nombreDepto: string) {

    if (idBusca == idIter) {
      this.nombreDepartamento = nombreDepto;
    }
  }

  browserOnly(f: () => void) {
    if (isPlatformBrowser(this.platformId)) {
      this.zone.runOutsideAngular(() => {
        f();
      });
    }
  }
  ngOnInit() {
    try {

      document.querySelector('#titulo')?.scrollIntoView();
      const el = <HTMLElement>document.querySelector(".bg-image");
      el.style.display = 'block';
      const e2 = <HTMLElement>document.querySelector(".bg-maritimo");
      e2.style.display = 'none';
      const e3 = <HTMLElement>document.querySelector(".bg-terrestre");
      e3.style.display = 'none';
      const e4 = <HTMLElement>document.querySelector(".bg-aereo");
      e4.style.display = 'none';
      const e5 = <HTMLElement>document.querySelector(".bg-puertos");
      e5.style.display = 'none';

    } catch (e) { }
  }
  ngAfterViewInit() {
    // Chart code goes in here
    this.browserOnly(() => { });
  }

  ngOnDestroy() {
    // Clean up chart when the component is removed
    this.browserOnly(() => {
      if (this.root) {
        this.root.dispose();
      }
    });
  }
  public aereo(event?: any) {
    const el = <HTMLElement>document.querySelector(".bg-image");
    el.style.display = 'none';
    const e2 = <HTMLElement>document.querySelector(".bg-maritimo");
    e2.style.display = 'none';
    const e3 = <HTMLElement>document.querySelector(".bg-terrestre");
    e3.style.display = 'none';
    const e4 = <HTMLElement>document.querySelector(".bg-aereo");
    e4.style.display = 'block';
    const e5 = <HTMLElement>document.querySelector(".bg-puertos");
    e5.style.display = 'none';

  }
  public maritimo(event?: any) {
    const el = <HTMLElement>document.querySelector(".bg-image");
    el.style.display = 'none';
    const e2 = <HTMLElement>document.querySelector(".bg-maritimo");
    e2.style.display = 'block';
    const e3 = <HTMLElement>document.querySelector(".bg-terrestre");
    e3.style.display = 'none';
    const e4 = <HTMLElement>document.querySelector(".bg-aereo");
    e4.style.display = 'none';
    const e5 = <HTMLElement>document.querySelector(".bg-puertos");
    e5.style.display = 'none';

  }
  public terrestre(event?: any) {
    const el = <HTMLElement>document.querySelector(".bg-image");
    el.style.display = 'none';
    const e2 = <HTMLElement>document.querySelector(".bg-maritimo");
    e2.style.display = 'none';
    const e3 = <HTMLElement>document.querySelector(".bg-terrestre");
    e3.style.display = 'block';
    const e4 = <HTMLElement>document.querySelector(".bg-aereo");
    e4.style.display = 'none';
    const e5 = <HTMLElement>document.querySelector(".bg-puertos");
    e5.style.display = 'none';
  }
  public puertos(event?: any) {
    const el = <HTMLElement>document.querySelector(".bg-image");
    el.style.display = 'none';
    const e2 = <HTMLElement>document.querySelector(".bg-maritimo");
    e2.style.display = 'none';
    const e3 = <HTMLElement>document.querySelector(".bg-terrestre");
    e3.style.display = 'none';
    const e4 = <HTMLElement>document.querySelector(".bg-aereo");
    e4.style.display = 'none';
    const e5 = <HTMLElement>document.querySelector(".bg-puertos");
    e5.style.display = 'block';
  }
  public menuLogistica(event?: any) {
    const el = <HTMLElement>document.querySelector(".bg-image");
    el.style.display = 'block';
    const e2 = <HTMLElement>document.querySelector(".bg-maritimo");
    e2.style.display = 'none';
    const e3 = <HTMLElement>document.querySelector(".bg-terrestre");
    e3.style.display = 'none';
    const e4 = <HTMLElement>document.querySelector(".bg-aereo");
    e4.style.display = 'none';
    const e5 = <HTMLElement>document.querySelector(".bg-puertos");
    e5.style.display = 'none';
  }
  public buscar(id: number) {

    var el;
    let url: string;
    let urlVideo: string;
    url = "";
    urlVideo = "";
    if (id == 1) {
      el = $(".form-aereo").val();
      url = environment.API_URL + "indicadoresAereo?idDestino=" + el;
      urlVideo = "assets/images/esp/Aereo/";
    }
    else if (id == 2) {
      el = $(".form-maritimo").val();
      url = environment.API_URL + "indicadoresMaritimo?idDestino=" + el;
      urlVideo = "assets/images/esp/Maritimo/";
    }
    else if (id == 3) {
      el = $(".form-terrestre").val();
      url = environment.API_URL + "indicadoresTerrestre?idDestino=" + el;
      urlVideo = "assets/images/esp/Terrestre/";
    }
    else if (id == 4) {
      el = $(".form-terrestregt").val();
      url = environment.API_URL + "indicadoresTerrestreGT?idLogistica=" + el;
      urlVideo = "assets/images/esp/Terrestre/GT/";
    }


    this.http.get<Aereo>(url).subscribe(data => {

      var temp = '';
      /*  var temp ='<video id="my_video_'+id+'" class="video-js vjs-default-skin" width="640px" height="267px" controls autoplay';
        temp+='data-setup=\'{ "aspectRatio":"640:267", "playbackRates": [1, 1.5, 2] }\'>';
        for (let index = 0; index < data['length']; index++) {
          console.log(data[index].video);
          temp+='<source src="'+urlVideo+data[index].video+'" type="video/mp4" /> ';
        }
       
        temp+='</video>';*/
      for (let index = 0; index < data['length']; index++) {
        temp += '<img src="' + urlVideo + data[index].video + '" alt="Computer man" style="width:690px;height:388px;">';
      }
      if (id == 1) {
        $("#cargaVideo").html(temp);
      }
      else if (id == 2) {
        $("#cargaVideo2").html(temp);
      }
      else if (id == 3) {
        $("#cargaVideo3").html(temp);
      }
      else if (id == 4) {
        $("#cargaVideo4").html(temp);
      }

      // this.toggleVideo(id); 

    });

  }

  public toggleVideo(id: number) {

    /*var myVideo: any = document.getElementById("my_video_"+id);
      if (myVideo.paused) myVideo.play();
      else myVideo.pause();*/
  }
  public infoAduana(id: number) {
    var index = id - 1;
    console.log(id);
    console.log(this.aduanasInfo[0]);
    console.log(this.aduanasInfo[index].id);
    console.log(this.aduanasInfo[index].nombre);
    console.log(this.aduanasInfo[index].depto);
    console.log(this.aduanasInfo[index].tipo);
    console.log(this.aduanasInfo[index].direccion);
    //var informacion = this.aduanasInfo[index].nombre;
    //informacion +="Departamento: "+ this.aduanasInfo[index].depto;
    //informacion +="Tipo: "+ this.aduanasInfo[index].tipo;
    var informacion = "Direccion: " + this.aduanasInfo[index].direccion;
    var informacion ="Nombre:"+ this.aduanasInfo[index].nombre;
    informacion +="Departamento:"+ this.aduanasInfo[index].depto;
    informacion +="Tipo:"+ this.aduanasInfo[index].tipo;
    informacion +="Direccion:"+ this.aduanasInfo[index].direccion;
  
    this.nombremodal=this.aduanasInfo[index].nombre;
    this.deptomodal=this.aduanasInfo[index].depto;
    this.tipomodal=this.aduanasInfo[index].tipo;
    this.direccionmodal= this.aduanasInfo[index].direccion;
    //this.openVerticallyCentered(informacion)
  }

  openBackDropCustomClass(Infoaduana: any) {
    this.modalService.open(Infoaduana, { backdropClass: 'light-blue-backdrop' });
  }

  openWindowCustomClass(Infoaduana: any) {
    this.modalService.open(Infoaduana, { windowClass: 'dark-modal' });
  }

  openSm(Infoaduana: any) {
    this.modalService.open(Infoaduana, { size: 'sm' });
  }

  openLg(Infoaduana: any) {
    this.modalService.open(Infoaduana, { size: 'lg' });
  }

  openXl(Infoaduana: any) {
    this.modalService.open(Infoaduana, { size: 'xl' });
  }


  openVerticallyCentered(Infoaduana: any,numero:number) {
    var index =numero-1;
    console.log(numero);
    console.log(this.aduanasInfo[0]);
    console.log(this.aduanasInfo[index].id);
    console.log(this.aduanasInfo[index].nombre);
    console.log(this.aduanasInfo[index].depto);
    console.log(this.aduanasInfo[index].tipo);
    console.log(this.aduanasInfo[index].direccion);
    var informacion ="Nombre:"+ this.aduanasInfo[index].nombre;
    informacion +="Departamento:"+ this.aduanasInfo[index].depto;
    informacion +="Tipo:"+ this.aduanasInfo[index].tipo;
    informacion +="Direccion:"+ this.aduanasInfo[index].direccion;
  
    this.nombremodal=this.aduanasInfo[index].nombre;
    this.deptomodal=this.aduanasInfo[index].depto;
    this.tipomodal=this.aduanasInfo[index].tipo;
    this.direccionmodal= this.aduanasInfo[index].direccion;
    this.modalService.open(Infoaduana, { centered: true });
  }

  openScrollableInfoaduana(longInfoaduana: any) {
    this.modalService.open(longInfoaduana, { scrollable: true, size: 'xl' });
  }

  openModalDialogCustomClass(Infoaduana: any) {
    this.modalService.open(Infoaduana, { modalDialogClass: 'dark-modal' });
  }
  cerrarModal = (usuario?: any): void => {
    this.modalService.dismissAll(usuario);
  }

}

