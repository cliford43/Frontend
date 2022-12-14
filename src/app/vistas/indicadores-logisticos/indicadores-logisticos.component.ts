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
import { NgModule, CUSTOM_ELEMENTS_SCHEMA }      from '@angular/core';
import * as $ from 'jquery';
import { html } from 'd3';
import { environment } from "../../../environments/environment";

//import * as d3 from 'd3';

@Component({
  selector: 'app-indicadores-logisticos',
  templateUrl: './indicadores-logisticos.component.html',
  styleUrls: [],
  
})
export class IndicadoresLogisticosComponent implements OnInit {
  name = "Angular";
  element = false;
  nombreDepartamento = "";
  descripcionDepartamento = "";
  anioDepartamento = 0;
  poblacionTotal=0;
  poblacionInicio=0;
  hombresTotal=0;
  hombresInicio=0;
  porcentajeHombres=0;
  mujeresTotal=0;
  mujeresInicio=0;
  porcentajeMujeres=0;
  private root!: am5.Root;
  @ViewChild("videoPlayer", { static: false })
  videoplayer!: ElementRef;
  
  
  constructor(@Inject(PLATFORM_ID) private platformId: Object, private zone: NgZone ,private activatedRoute: ActivatedRoute, private http: HttpClient ) { 
    this.activatedRoute.params.subscribe(params => {
     // let deptoId = params['id'];
     
        this.element = false;
      
        this.element = true;
        
      //  this.departamentos.forEach(elemento => this.asignar(deptoId,elemento['idDepartamento'],elemento['nomDepartamento']));
        
     //   this.getMunis(deptoId).subscribe(munis => this.municipios = munis);
        
        
        
        //this.nombreDepartamento = this.departamentos[1].nombre;
     /*   this.descripcionDepartamento = this.departamentos[depto-1].descripcion;
        this.anioDepartamento = this.departamentos[depto-1].anio;
        this.poblacionTotal=this.departamentos[depto-1].poblacionTotal;
        this.poblacionInicio= this.poblacionTotal-(this.poblacionTotal*0.05);
        this.hombresTotal=this.departamentos[depto-1].hombreTotal;
        this.hombresInicio = this.hombresTotal- (this.hombresTotal*0.05);
        this.mujeresTotal=this.departamentos[depto-1].mujerTotal;
        this.mujeresInicio = this.mujeresTotal-(this.mujeresTotal*0.05);
        var tempPorH=((this.hombresTotal*100)/this.poblacionTotal).toFixed(2);
        this.porcentajeHombres=parseFloat(tempPorH);
        
        var tempPorM=((this.mujeresTotal*100)/this.poblacionTotal).toFixed(2);
        this.porcentajeMujeres=parseFloat(tempPorM);
        
        console.log(this.porcentajeMujeres+"-----"+this.departamentos[depto-1].id+"-----"+this.departamentos[depto-1].nombre);
        */
      
    
      
      });
   //   const temporal =this.getDeptos();



     // this.departamentos.push({ id: temporalidDepartamento, nombre: temporal.nomDepartamento });
 //   this.getDeptos().subscribe(deptos => this.departamentos = deptos);
  }
  asignar(idBusca: number,idIter: number,nombreDepto: string){

    if(idBusca==idIter){
      this.nombreDepartamento=nombreDepto;
    }
  }

 /* getDeptos(): Observable<Deptos[]> {
    return this.http.get<Deptos[]>(environment.API_URL+"departamentos"); 
  }
  getMunis(idDepto: number): Observable<Munis[]> {
    console.log(idDepto);
    return this.http.get<Munis[]>(environment.API_URL+"municipios?idDepartamento="+(idDepto-1));
  }*/
/*  getDeptos() {
    this.http.get<Deptos>(environment.API_URL+"deptosbenjamin").subscribe(data => {
      dat.foreach(
        address => this.addresses.push(address)
      )
    });
  }*/
  browserOnly(f: () => void) {
    if (isPlatformBrowser(this.platformId)) {
      this.zone.runOutsideAngular(() => {
        f();
      });
    }
  }
  ngOnInit()  {
    try {
      
      document.querySelector('#titulo')?.scrollIntoView();
      const el =<HTMLElement>document.querySelector( ".bg-image" );
    el.style.display = 'block';		
    const e2 =<HTMLElement>document.querySelector( ".bg-maritimo" );
    e2.style.display = 'none';		
    const e3 =<HTMLElement>document.querySelector( ".bg-terrestre" );
    e3.style.display = 'none';		
    const e4 =<HTMLElement>document.querySelector( ".bg-aereo" );
    e4.style.display = 'none';		
    const e5 =<HTMLElement>document.querySelector( ".bg-puertos" );
    e5.style.display = 'none';		

    } catch (e) { }
  }
  ngAfterViewInit() {
    // Chart code goes in here
    this.browserOnly(() => {    });
  }

  ngOnDestroy() {
    // Clean up chart when the component is removed
    this.browserOnly(() => {
      if (this.root) {
        this.root.dispose();
      }
    });
  }
  public aereo(event?: any){
    const el =<HTMLElement>document.querySelector( ".bg-image" );
    el.style.display = 'none';		
    const e2 =<HTMLElement>document.querySelector( ".bg-maritimo" );
    e2.style.display = 'none';		
    const e3 =<HTMLElement>document.querySelector( ".bg-terrestre" );
    e3.style.display = 'none';		
    const e4 =<HTMLElement>document.querySelector( ".bg-aereo" );
    e4.style.display = 'block';
    const e5 =<HTMLElement>document.querySelector( ".bg-puertos" );
    e5.style.display = 'none';			

  }
  public maritimo(event?: any){
    const el =<HTMLElement>document.querySelector( ".bg-image" );
    el.style.display = 'none';		
    const e2 =<HTMLElement>document.querySelector( ".bg-maritimo" );
    e2.style.display = 'block';		
    const e3 =<HTMLElement>document.querySelector( ".bg-terrestre" );
    e3.style.display = 'none';		
    const e4 =<HTMLElement>document.querySelector( ".bg-aereo" );
    e4.style.display = 'none';		
    const e5 =<HTMLElement>document.querySelector( ".bg-puertos" );
    e5.style.display = 'none';	

  }
  public terrestre(event?: any){
  const el =<HTMLElement>document.querySelector( ".bg-image" );
  el.style.display = 'none';		
  const e2 =<HTMLElement>document.querySelector( ".bg-maritimo" );
  e2.style.display = 'none';		
  const e3 =<HTMLElement>document.querySelector( ".bg-terrestre" );
  e3.style.display = 'block';		
  const e4 =<HTMLElement>document.querySelector( ".bg-aereo" );
  e4.style.display = 'none';	
  const e5 =<HTMLElement>document.querySelector( ".bg-puertos" );
  e5.style.display = 'none';	
}
public puertos(event?: any){
  const el =<HTMLElement>document.querySelector( ".bg-image" );
  el.style.display = 'none';		
  const e2 =<HTMLElement>document.querySelector( ".bg-maritimo" );
  e2.style.display = 'none';		
  const e3 =<HTMLElement>document.querySelector( ".bg-terrestre" );
  e3.style.display = 'none';		
  const e4 =<HTMLElement>document.querySelector( ".bg-aereo" );
  e4.style.display = 'none';	
  const e5 =<HTMLElement>document.querySelector( ".bg-puertos" );
  e5.style.display = 'block';	
}
public menuLogistica(event?: any){
  const el =<HTMLElement>document.querySelector( ".bg-image" );
  el.style.display = 'block';		
  const e2 =<HTMLElement>document.querySelector( ".bg-maritimo" );
  e2.style.display = 'none';		
  const e3 =<HTMLElement>document.querySelector( ".bg-terrestre" );
  e3.style.display = 'none';		
  const e4 =<HTMLElement>document.querySelector( ".bg-aereo" );
  e4.style.display = 'none';	
  const e5 =<HTMLElement>document.querySelector( ".bg-puertos" );
  e5.style.display = 'none';	
}
public buscar(id: number){

  var el;
  let url: string;
  let urlVideo: string;
  url="";
  urlVideo="";
  if(id==1){
    el =$( ".form-aereo" ).val();
    url=environment.API_URL+"indicadoresAereo?idDestino="+el;
    urlVideo="assets/images/esp/Aereo/";
  }
  else if(id==2){
    el =$( ".form-maritimo" ).val();
    url=environment.API_URL+"indicadoresMaritimo?idDestino="+el;
    urlVideo="assets/images/esp/Maritimo/";
  }
  else if(id==3){
    el =$( ".form-terrestre" ).val();    
    url=environment.API_URL+"indicadoresTerrestre?idDestino="+el;
    urlVideo="assets/images/esp/Terrestre/";
  }
  else if(id==4){
    el =$( ".form-terrestregt" ).val();    
    url=environment.API_URL+"indicadoresTerrestreGT?idLogistica="+el;
    urlVideo="assets/images/esp/Terrestre/GT/";
  }
 
  	
    this.http.get<Aereo>(url).subscribe(data => {  
      
      var temp ='';
    /*  var temp ='<video id="my_video_'+id+'" class="video-js vjs-default-skin" width="640px" height="267px" controls autoplay';
      temp+='data-setup=\'{ "aspectRatio":"640:267", "playbackRates": [1, 1.5, 2] }\'>';
      for (let index = 0; index < data['length']; index++) {
        console.log(data[index].video);
        temp+='<source src="'+urlVideo+data[index].video+'" type="video/mp4" /> ';
      }
     
      temp+='</video>';*/
      for (let index = 0; index < data['length']; index++) {
        temp+='<img src="'+urlVideo+data[index].video+'" alt="Computer man" style="width:875px;height:500px;">';
      }
      if(id==1){
        $("#cargaVideo").html(temp);
      }
      else if(id==2){
        $("#cargaVideo2").html(temp);
      }
      else if(id==3){
        $("#cargaVideo3").html(temp); 
      }
      else if(id==4){
        $("#cargaVideo4").html(temp); 
      }
     
     this.toggleVideo(id); 
    
});

}
 
public toggleVideo(id:number) {
  
  var myVideo: any = document.getElementById("my_video_"+id);
    if (myVideo.paused) myVideo.play();
    else myVideo.pause();
}


}

