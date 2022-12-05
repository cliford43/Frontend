import { Component, Inject, NgZone, OnInit, PLATFORM_ID } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import * as am5 from '@amcharts/amcharts5';
import * as am5xy from '@amcharts/amcharts5/xy';
import am5themes_Animated from '@amcharts/amcharts5/themes/Animated';
import { isPlatformBrowser } from '@angular/common';
import * as am5percent from "@amcharts/amcharts5/percent";
import { HttpClient } from "@angular/common/http";
import { Deptos, Empresa, Estimacion, Indicadores, PoblacionAnio, Universidad } from "./depto";
import { Munis } from "./depto";
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA }      from '@angular/core';



//import * as d3 from 'd3';

@Component({
  selector: 'app-informacion-departamentos',
  templateUrl: './informacion-departamentos.component.html',
  styleUrls: [],
  
})
export class InformacionDepartamentosComponent implements OnInit {
  element = false;
  nombreDepartamento = "";
  descripcionDepartamento = "";
  anioDepartamento = 0;
  
  poblacionInicio=0;
  hombresTotal=0;
  hombresInicio=0;
  porcentajeHombres=0;
  mujeresTotal=0;
  mujeresInicio=0;
  porcentajeMujeres=0;
  private root!: am5.Root;
  departamentos: Deptos[] = [];
  municipios: Munis[] = [];
  infoDeptoPanel=false;
  infoDeptoh2='';
  infoDeptop='';
  datosDeptos = <Deptos> <unknown>[];
  tablaMunicipios = '';
  
  constructor(@Inject(PLATFORM_ID) private platformId: Object, private zone: NgZone ,private activatedRoute: ActivatedRoute, private http: HttpClient ) { 
    this.activatedRoute.params.subscribe(params => {
     // let deptoId = params['id'];
     
        this.element = false;
      
        this.element = true;
        
      //  this.departamentos.forEach(elemento => this.asignar(deptoId,elemento['idDepartamento'],elemento['nomDepartamento']));
        
     //   this.getMunis(deptoId).subscribe(munis => this.municipios = munis);
        //console.log("MUNICIPIOS:");
        //console.log(this.municipios);
        
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
        
        //console.log(this.porcentajeMujeres+"-----"+this.departamentos[depto-1].id+"-----"+this.departamentos[depto-1].nombre);
        */
      
    
        //this.getDeptos().subscribe(deptos => this.departamentos = deptos);
        
        //console.log("DEPARTAMENTOS:");
        this.getDeptos();
        ////console.log(this.tempDeptos);
        
      });
      //const temporal =this.getDeptos();
      



     // this.departamentos.push({ id: temporalidDepartamento, nombre: temporal.nomDepartamento });
   
  
    
  }
  asignar(idBusca: number,idIter: number,nombreDepto: string){

    if(idBusca==idIter){
      this.nombreDepartamento=nombreDepto;
    }
  }

 /* getDeptos(): Observable<Deptos[]> {
    return this.http.get<Deptos[]>("http://localhost:8082/vui-api/departamentos"); 
  }*/
 /* getMunis(idDepto: number): Observable<Munis[]> {
    //console.log(idDepto);
    return this.http.get<Munis[]>("http://localhost:8082/vui-api/municipios?idDepartamento="+(idDepto-1));
  }*/
  getDeptos() {
    this.http.get<Deptos>("http://localhost:8082/vui-api/departamentos").subscribe(data => {
      //console.log(data.nomDepartamento);
      for (let index = 0; index < data['length']; index++) {
        const element = data[index];
        //this.tempDeptos.push(data);
        ////console.log(element.nomDepartamento); 
        this.datosDeptos[data[index]["nomDepartamento"] ] = [{"nombreDepto":data[index]["nomDepartamento"],"descripcion":data[index]["descripcionPerfil"]+"","url":"ninguna","idDepartamento":data[index]["idDepartamento"]}];
        
      }
   
      
        
      
    });
  }
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
    } catch (e) { }
  }
  ngAfterViewInit() {
    // Chart code goes in here
    this.browserOnly(() => {
      
   
    });
  }

  ngOnDestroy() {
    // Clean up chart when the component is removed
    this.browserOnly(() => {
      if (this.root) {
        this.root.dispose();
      }
    });
  }
public infoDepartamento(event?: any){
  //document.getElementById("infoDepto2").style.visibility='hidden' ;
  this.infoDeptoPanel=true;
	var departamento: string = (event.target as Element).id;
  this.limpiaValores();
  this.buscarMunicipios(this.datosDeptos[departamento][0].idDepartamento);
  this.buscarGraficaPoblacionAnio(this.datosDeptos[departamento][0].idDepartamento);
	this.buscarUniversidades(this.datosDeptos[departamento][0].idDepartamento); 
  this.buscarDeptoEmpresas(this.datosDeptos[departamento][0].idDepartamento);
  this.buscarIndicadores(this.datosDeptos[departamento][0].idDepartamento); 
  this.buscarDeptoIndicadores(this.datosDeptos[departamento][0].idDepartamento);
  //console.log(departamento);
}
public limpiaValores (  ) {
	this.infoDeptoh2='';
  this.infoDeptop='';
}

public buscarMunicipios(depto: string){
	
	var tempMunis = "";
	
      this.http.get<Munis>("http://localhost:8082/vui-api/municipios/?idDepartamento="+depto).subscribe(data => {
      //console.log(data.idDepartamento);
      
        var cantidad=data['length'];
						if(cantidad%2==0){
        
							cantidad=cantidad/2;
						
						}else{
							var temp=(cantidad/2);
							cantidad=Math.floor(temp)+1;
							
						}
						tempMunis='<div class="row">  <div class="col-lg-6 col-md-6 col-sm-12 mt-3" >'
					
            for (let index = 0; index < data['length']; index++) {
              const element = data[index];              
              //console.log(element.nomMunicipio); 
              
							if(index==cantidad){
								tempMunis+='</div><div class="col-lg-6 col-md-6 col-sm-12 mt-3" >';
							}
              
							tempMunis+=' <button class="btn btn-outline-degree btn-block btn-radius">'+(index+1)+') '+data[index]["nomMunicipio"]+'</button>'
							
            }
						tempMunis+='</div></div>';            
            const el =<HTMLElement>document.querySelector( ".tabla" );
            el.innerHTML = tempMunis;
      
		
      });
}  
public buscarGraficaPoblacionAnio(depto: string){
  this.http.get<PoblacionAnio>("http://localhost:8082/vui-api/indicadoresPoblacionAnio?idDepartamento="+depto).subscribe(datos => {
    //console.log(data.idDepartamento);
    
    let root = am5.Root.new("chartdiv");
    root.setThemes([
      am5themes_Animated.new(root)
  ]);
  var chart = root.container.children.push( 
    am5xy.XYChart.new(root, {
      panX: false,
      panY: false,
      wheelX: "panX",
      wheelY: "zoomX",
      layout: root.verticalLayout
    }) 
  );
  var legend = chart.children.push(
    am5.Legend.new(root, {
      centerX: am5.p50,
      x: am5.p50
    })
  );
  

// Define data
console.log(datos);
let data = [];
for ( var i = 0; i < datos['length']; i++ ) {
  
  for ( var j = i+1; j < datos['length']; j++ ) {
    if(datos[i].idAnio==datos[j].idAnio){      
      var suma=Number(datos[i].cantidad.replace(",",""))+Number(datos[j].cantidad.replace(",",""))
      
      data.push({year: datos[j].idAnio,
      value1: Number(datos[i].cantidad.replace(",","")),
      value2: Number(datos[j].cantidad.replace(",",""))});
    }
    
    
    }
  
  }

  var xAxis = chart.xAxes.push(am5xy.CategoryAxis.new(root, {
    categoryField: "year",
    renderer: am5xy.AxisRendererX.new(root, {
      cellStartLocation: 0.1,
      cellEndLocation: 0.9
    }),
    tooltip: am5.Tooltip.new(root, {})
  }));
  
  xAxis.data.setAll(data);
  
  var yAxis = chart.yAxes.push(am5xy.ValueAxis.new(root, {
    renderer: am5xy.AxisRendererY.new(root, {})
  }));
  
// Create series
var series1 = chart.series.push( 
  am5xy.ColumnSeries.new(root, { 
    name: "Masculino", 
    xAxis: xAxis, 
    yAxis: yAxis, 
    valueYField: "value1", 
    categoryXField: "year",
    tooltip: am5.Tooltip.new(root, {labelText: "{valueY}"})
  }) 
);
series1.data.setAll(data);

var series2 = chart.series.push( 
  am5xy.ColumnSeries.new(root, { 
    name: "Femenino", 
    xAxis: xAxis, 
    yAxis: yAxis, 
    valueYField: "value2", 
    categoryXField: "year" ,
    tooltip: am5.Tooltip.new(root, { labelText: "{valueY}"})
  }) 
);
series2.data.setAll(data);

// Add legend
var legend = chart.children.push(am5.Legend.new(root, {})); 
legend.data.setAll(chart.series.values);
  
console.log(data);


chart.set("cursor", am5xy.XYCursor.new(root, {
  behavior: "zoomX"
}));
    });

 }
 
public buscarUniversidades(depto: string){

  this.http.get<Universidad>("http://localhost:8082/vui-api/indicadoresUniversidad?idDepartamento="+depto).subscribe(data => {  
  					var universidades='<ul class="list-group list-group-flush">';
						universidades+='<li class = "list-group-item  justify-content-between align-items-center">';
						universidades+='<h3 class = "list-group-item-heading">PÚBLICA</h3>';
						universidades+='<p class = "list-group-item-text text-uppercase">'+data[0].nomUniversidad+'</p>';						
						universidades+='</li>';
						universidades+='<li class = "list-group-item  justify-content-between align-items-center">';
						universidades+='<h3 class = "list-group-item-heading">PRIVADAS</h3>';
						for ( var i = 1; i < data['length']; i++ ) {
							universidades+='<p class = "list-group-item-text text-uppercase">'+data[ i ].nomUniversidad+'</p>';
							}
						universidades+='</li>';
						universidades+='</ul>';
    const el =<HTMLElement>document.querySelector( ".datoUniversidades" );
    el.innerHTML = universidades ;		
      });
}
public buscarDeptoEmpresas(depto: string)  
{
  this.http.get<Empresa>("http://localhost:8082/vui-api/indicadorDeptoEmpresa?idDepartamento="+depto).subscribe(data => {  
  					
  ////console.log;
  var empresas='<div class="row d-flex justify-content-center ml-3">';
          empresas += '<div class="col-lg-4 col-md-4 col-sm-12 ">';
          empresas += '<div class="box">';
          empresas += '<div class="body">';
          empresas += '<div class= " imgContainer text-uppercase bg-secondary text-white d-flex flex-column align-items-center justify-content-center">';
          empresas += '<h2 class="fs-3">MICRO</h2>';
          empresas += '</div>';
          empresas += '<div class="content text-uppercase text-white d-flex flex-column align-items-center justify-content-center">';
          empresas += '<div>';
          empresas += '<h2>'+this.formatoMiles(data[0].porcMicro,"porcentaje");+'</h2>';
          empresas += '</div>';
          empresas += '</div>';
          empresas += '</div>';
          empresas += '</div>';
          empresas += '</div>';
          empresas += '<div class="col-lg-4 col-md-4 col-sm-12 ">';
          empresas += '<div class="box">';
          empresas += '<div class="body">';
          empresas += '<div class= " imgContainer text-uppercase bg-secondary text-white d-flex flex-column align-items-center justify-content-center">';
          empresas += '<h2 class="fs-3">PEQUEÑA</h2>';
          empresas += '</div>';
          empresas += '<div class="content text-uppercase text-white d-flex flex-column align-items-center justify-content-center">';
          empresas += '<div>';
          empresas += '<h2>'+this.formatoMiles(data[0].porcPequena,"porcentaje");+'</h2>';
          empresas += '</div>';
          empresas += '</div>';
          empresas += '</div>';
          empresas += '</div>';
          empresas += '</div>';
          empresas += '<div class="col-lg-4 col-md-4 col-sm-12 ">';
          empresas += '<div class="box">';
          empresas += '<div class="body">';
          empresas += '<div class= " imgContainer text-uppercase bg-secondary text-white d-flex flex-column align-items-center justify-content-center">';
          empresas += '<h2 class="fs-3">MEDIANA</h2>';
          empresas += '</div>';
          empresas += '<div class="content text-uppercase text-white d-flex flex-column align-items-center justify-content-center">';
          empresas += '<div>';
          empresas += '<h2>'+this.formatoMiles(data[0].porcMediana,"porcentaje");+'</h2>';
          empresas += '</div>';
          empresas += '</div>';
          empresas += '</div>';
          empresas += '</div>';
          empresas += '</div>';		
          empresas += '<div class="col-lg-4 col-md-4 col-sm-12 ">';
          empresas += '<div class="box">';
          empresas += '<div class="body">';
          empresas += '<div class= " imgContainer text-uppercase bg-secondary text-white d-flex flex-column align-items-center justify-content-center">';
          empresas += '<h2 class="fs-3">GRANDE</h2>';
          empresas += '</div>';
          empresas += '<div class="content text-uppercase text-white d-flex flex-column align-items-center justify-content-center">';
          empresas += '<div>';
          empresas += '<h2>'+this.formatoMiles(data[0].porcGrande,"porcentaje");+'</h2>';
          empresas += '</div>';
          empresas += '</div>';
          empresas += '</div>';
          empresas += '</div>';
          empresas += '</div>';					
          empresas += '</div>';
          
    const el =<HTMLElement>document.querySelector( ".datoEmpresas" );
    el.innerHTML = empresas ;		
      });
}
public buscarIndicadores(depto: string){
  
  this.http.get<Estimacion>("http://localhost:8082/vui-api/indicadores?idDepartamento="+depto).subscribe(data => {  
    var poblacionTotal  : number;
    var porcentajeHombre: number;
    var porcentajeMujer: number;
    poblacionTotal =Number(data[0]['cantidad'].replace(",",""))+Number(data[1]['cantidad'].replace(",",""));
						porcentajeHombre = (Number(data[0]['cantidad'].replace(",",""))*100) / (poblacionTotal);
						porcentajeMujer = (Number(data[1]['cantidad'].replace(",",""))*100) / (poblacionTotal);
            //console.log('poblacionTotal: ');
            //console.log(data[0].nomGenero);
            //console.log('porcentajeMujer: '+porcentajeMujer);
						var estimacion='<div class="row d-flex justify-content-center ml-3">';
						estimacion += '<div class="col-lg-4 col-md-4 col-sm-12">';
						estimacion+='<div class="card  mr-4  d-flex justify-content-center align-items-center border shadow card-rounded">';
						estimacion+='<div class="row d-flex justify-content-center align-items-center">';
						estimacion+='<p style="text-align: center;">';
						estimacion+='<span class="text-light-blue">';
						estimacion+='<strong>Estimación población <br>'+data[0]['idAnio'];
						estimacion+='</strong>';
						estimacion+='</span>';
						estimacion+='</p>';
						estimacion+='<div class="col-md-12 d-flex justify-content-center">';
						estimacion+='<h1 class="blue-counter">';
						estimacion+=this.formatoMiles(Number(poblacionTotal).toFixed(2),data[0].nomTipoFormato);
						estimacion+='</h1>'; 
						estimacion+='</div>';
						estimacion+='</div>';
						estimacion+='</div>';
						estimacion+='</div>';
						estimacion += '<div class="col-lg-4 col-md-4 col-sm-12">';
						estimacion+='<div class="card  mr-4  d-flex justify-content-center align-items-center border shadow card-rounded">';
						estimacion+='<div class="row d-flex justify-content-center align-items-center">';
						estimacion+='<p style="text-align: center;">';
						estimacion+='<span class="text-light-blue">';
						estimacion+='<strong>'+data[0].nomGenero;
						estimacion+='</strong>';
						estimacion+='</span>';
						estimacion+='</p>';
						estimacion+='<div class="col-md-12 d-flex justify-content-center">';
						estimacion+='<h1 class="blue-counter">';
						estimacion+=this.formatoMiles(Number(data[0]['cantidad'].replace(",","")).toFixed(2),"dato")+" <br> "+Number(porcentajeHombre).toFixed(2)+"%";
						estimacion+='</h1>';
						estimacion+='</div>';
						estimacion+='</div>';
						estimacion+='</div>';
						estimacion+='</div>';
						estimacion += '<div class="col-lg-4 col-md-4 col-sm-12">';
						estimacion+='<div class="card  mr-4  d-flex justify-content-center align-items-center border shadow card-rounded">';
						estimacion+='<div class="row d-flex justify-content-center align-items-center">';
						estimacion+='<p style="text-align: center;">';
						estimacion+='<span class="text-light-blue">';
						estimacion+='<strong>'+data[1].nomGenero;
						estimacion+='</strong>';
						estimacion+='</span>';
						estimacion+='</p>';
						estimacion+='<div class="col-md-12 d-flex justify-content-center">';
						estimacion+='<h1 class="blue-counter">';
						estimacion+=this.formatoMiles(Number(data[1]['cantidad'].replace(",","")).toFixed(2),"dato") +" <br> "+Number(porcentajeMujer).toFixed(2)+"%";
						estimacion+='</h1>';
						estimacion+='</div>';
						estimacion+='</div>';
						estimacion+='</div>';
						estimacion+='</div>';
						estimacion+='</div>';
						
						        
      const el =<HTMLElement>document.querySelector( ".datoSocioPrimero" );
      el.innerHTML = estimacion ;		
        });
}
public buscarDeptoIndicadores(depto: string){
  this.http.get<Indicadores>("http://localhost:8082/vui-api/indicadoresDepto?idDepartamento="+depto).subscribe(data => {  
    var educacion='<div class="row d-flex justify-content-center ml-3">';
    var igss='<div class="row d-flex justify-content-center ml-3">';
    var dinamismo2='<div class="row d-flex justify-content-center ml-3">';
    var infraestructura='<div class="row d-flex justify-content-center ml-3">';
    var tics='<div class="row d-flex justify-content-center ml-3">';
    var costos='<div class="row d-flex justify-content-center ml-3">';
    var dCh='<div class="row d-flex justify-content-center ml-3">';
    
    for (let index = 0; index < data['length']; index++) 
    {
     
      if(data[index].idIndicador==21 || data[index].idIndicador==22 ||data[index].idIndicador==23)
      {  
        dCh += '<div class="col-lg-4 col-md-4 col-sm-12">';
						dCh+='<div class="card  mr-4  d-flex justify-content-center align-items-center border shadow card-rounded">';
						dCh+='<div class="row d-flex justify-content-center align-items-center">';
						dCh+='<p style="text-align: center;">';
						dCh+='<span class="text-light-blue" justify-content-center>';
						dCh+='<strong>'+data[index].nomCorto;
						dCh+='</strong>';
						dCh+='</span>';
						dCh+='</p>';
						dCh+='<div class="col-md-12 d-flex justify-content-center">';
						dCh+='<h1 class="blue-counter">';
						dCh+=data[index].valor+"%"
            
						dCh+='</h1>';
						dCh+='</div>';
						dCh+='</div>';
						dCh+='</div>';
						dCh+='</div>';
      }
      else if(data[index].idIndicador==8 || data[index].idIndicador==9 ||data[index].idIndicador==10)
      {        
        educacion += '<div class="col-lg-4 col-md-4 col-sm-12">';
        educacion+='<div class="card  mr-4  d-flex justify-content-center align-items-center border shadow card-rounded">';
        educacion+='<div class="row d-flex justify-content-center align-items-center">';
        educacion+='<p style="text-align: center;">';
        educacion+='<span class="text-light-blue" justify-content-center>';
        educacion+='<strong>'+data[index].nomCorto;
        educacion+='</strong>';
        educacion+='</span>';
        educacion+='</p>';
        educacion+='<div class="col-md-12 d-flex justify-content-center">';
        educacion+='<h1 class="blue-counter">';
        educacion+=data[index].valor+"%"
        educacion+='</h1>';
        educacion+='</div>';
        educacion+='</div>';
        educacion+='</div>';
        educacion+='</div>'; 
      }
      else  if(data[index].idIndicador==13 || data[index].idIndicador==14)
      {
            igss += '<div class="col-lg-4 col-md-4 col-sm-12">';
						igss+='<div class="card  mr-4  d-flex justify-content-center align-items-center border shadow card-rounded">';
						igss+='<div class="row d-flex justify-content-center align-items-center">';
						igss+='<p style="text-align: center;">';
						igss+='<span class="text-light-blue" justify-content-center>';
						igss+='<strong>'+data[index].nomCorto+" "+data[index].anio;
						igss+='</strong>';
						igss+='</span>';
						igss+='</p>';
						igss+='<div class="col-md-12 d-flex justify-content-center">';
						igss+='<h2 class="blue-counter">';      
						igss+=this.formatoMiles(Number(data[index].valor).toFixed(2),data[index].nomTipoFormato);            
            
						igss+='</h2>';
						igss+='</div>';
						igss+='</div>';
						igss+='</div>';
						igss+='</div>';
						
      }    
      else  if(data[index].idIndicador==27 || data[index].idIndicador==6 || data[index].idIndicador==7
        || data[index].idIndicador==11 || data[index].idIndicador==12 || data[index].idIndicador==15
        || data[index].idIndicador==16 || data[index].idIndicador==17)
      {        
						dinamismo2 += '<div class="col-lg-4 col-md-4 col-sm-12 ">';
						dinamismo2 += '<div class="box">';
						dinamismo2 += '<div class="body">';
						dinamismo2 += '<div class= " imgContainer text-uppercase bg-secondary text-white d-flex flex-column align-items-center justify-content-center">';
						dinamismo2 += '<h2 class="fs-3 bg-primary">'+data[index].nomCorto+'</h2>';
						dinamismo2 += '</div>';
						dinamismo2 += '<div class="content text-uppercase text-white d-flex flex-column align-items-center justify-content-center">';
						dinamismo2 += '<div>';
						dinamismo2 += '<h2>'+this.formatoMiles(Number(data[index].valor).toFixed(2),data[index].nomTipoFormato);+'</h2>';
            dinamismo2 += '<h5 class="fs-6 ">'+data[index].nomIndicador+'</h5>';
						dinamismo2 += '</div>';
						dinamismo2 += '</div>';
						dinamismo2 += '</div>';
						dinamismo2 += '</div>';
						dinamismo2 += '</div>';

      }
      else if(data[index].idIndicador==1 || data[index].idIndicador==2 || data[index].idIndicador==3
              || data[index].idIndicador==4 || data[index].idIndicador==5)
              { 
            infraestructura += '<div class="col-lg-4 col-md-4 col-sm-12 ">';
						infraestructura += '<div class="box">';
						infraestructura += '<div class="body">';
						infraestructura += '<div class= " imgContainer text-uppercase bg-secondary text-white d-flex flex-column align-items-center justify-content-center">';
						infraestructura += '<h2 class="bg-primary fs-3">'+data[index].nomCorto+'</h2>';
						infraestructura += '</div>';
						infraestructura += '<div class="content text-uppercase text-white d-flex flex-column align-items-center justify-content-center">';
						infraestructura += '<div>';
						infraestructura += '<h2>'+this.formatoMiles(Number(data[index].valor).toFixed(2),data[index].nomTipoFormato);+'</h2>';
            infraestructura += '<h5 class="fs-6 ">'+data[index].nomIndicador+'</h5>';
						infraestructura += '</div>';
						infraestructura += '</div>';
						infraestructura += '</div>';
						infraestructura += '</div>';
						infraestructura += '</div>';	
                
              }
            else if(data[index].idIndicador==18 || data[index].idIndicador==19 || data[index].idIndicador==20)
              { 
                tics += '<div class="col-lg-4 col-md-4 col-sm-12 ">';
              tics += '<div class="box">';
              tics += '<div class="body">';
              if(data[index].idIndicador==18){
                tics += '<div class= " imgTICcelular imgContainer text-uppercase bg-secondary text-white d-flex flex-column align-items-center justify-content-center">';
              }else if(data[index].idIndicador==19){
                tics += '<div class= "imgTICcomputadora imgContainer text-uppercase bg-secondary text-white d-flex flex-column align-items-center justify-content-center">';
              }else if(data[index].idIndicador==20){
                tics += '<div class= "imgTICinternet imgContainer text-uppercase bg-secondary text-white d-flex flex-column align-items-center justify-content-center">';
              }
              tics += '<h2 class="fs-3 bg-primary">'+data[index].nomCorto+'</h2>';
              tics += '</div>';
              tics += '<div class="content text-uppercase text-white d-flex flex-column align-items-center justify-content-center">';
              tics += '<div>';
              tics += '<h2>'+this.formatoMiles(Number(data[index].valor).toFixed(2),data[index].nomTipoFormato);+'</h2>';
              tics += '<h5 class="fs-6 ">'+data[index].nomIndicador+'</h5>';
              tics += '</div>';
              tics += '</div>';
              tics += '</div>';
              tics += '</div>';
              tics += '</div>';	

              }
      
            else if(data[index].idIndicador==24 || data[index].idIndicador==25 || data[index].idIndicador==26)
              { 
                costos += '<div class="col-lg-4 col-md-4 col-sm-12 ">';
						costos += '<div class="box">';
						costos += '<div class="body">';
						costos += '<div class= " imgContainer text-uppercase bg-secondary text-white d-flex flex-column align-items-center justify-content-center">';
						costos += '<h2 class="fs-3 bg-primary">'+data[index].nomCorto+'</h2>';
						costos += '</div>';
						costos += '<div class="content text-uppercase text-white d-flex flex-column align-items-center justify-content-center">';
						costos += '<div>';
						costos += '<h2>'+this.formatoMiles(Number(data[index].valor).toFixed(2),data[index].nomTipoFormato);+'</h2>';
            costos += '<h5 class="fs-6 ">'+data[index].nomIndicador+'</h5>';
						costos += '</div>';
						costos += '</div>';
						costos += '</div>';
						costos += '</div>';
						costos += '</div>';	
              }
    }
    educacion+='</div>';
    igss+='</div>';
    dinamismo2 += '</div>';
    infraestructura += '</div>';
    tics += '</div>';	
    costos += '</div>';	
    dCh+='</div>';
    
    const el0 =<HTMLElement>document.querySelector( ".datodCh" );
      el0.innerHTML = dCh;    
      const el =<HTMLElement>document.querySelector( ".datoEducacion" );
      el.innerHTML = educacion;      
      const el1 =<HTMLElement>document.querySelector( ".datoIgss" );
      el1.innerHTML = igss ;
      const el2 =<HTMLElement>document.querySelector( ".datoDinamismo2" );
      el2.innerHTML = dinamismo2 ;
      const el3 =<HTMLElement>document.querySelector( ".datoInfraestructura" );
      el3.innerHTML = infraestructura ;
      const el4 =<HTMLElement>document.querySelector( ".datoTics" );
      el4.innerHTML = tics ;
      const el5 =<HTMLElement>document.querySelector( ".datoCostos" );
      el5.innerHTML = costos ;
        });
}
formatoMiles = (numero:string,tipoDato: string) => {
  //console.log("FORMATO MILES");
  //console.log("NUMERO: "+numero);
  //console.log("TIPO DATO: "+tipoDato);
	const exp = /(\d)(?=(\d{3})+(?!\d))/g;
	const rep = '$1,';
	let arr = numero.split('.');
	arr[0] = arr[0].replace(exp,rep);
	let numeroConMiles=arr[1] ? arr.join('.'): arr[0];
	if(tipoDato=="quetzales"){
		numeroConMiles="Q. "+numeroConMiles;
	}else if(tipoDato=="dolares"){		
		numeroConMiles="US$ "+numeroConMiles;
	}else if(tipoDato=="porcentaje"){
		numeroConMiles=numeroConMiles+"%";
	}else if(tipoDato=="dato"){
		numeroConMiles=numeroConMiles;
	}
	
	return numeroConMiles;
  }
}
