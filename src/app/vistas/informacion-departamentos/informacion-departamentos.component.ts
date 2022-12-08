import { Component, Inject, NgZone, OnInit, PLATFORM_ID } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import * as am5 from '@amcharts/amcharts5';
import * as am5xy from '@amcharts/amcharts5/xy';
import am5themes_Animated from '@amcharts/amcharts5/themes/Animated';
import { isPlatformBrowser } from '@angular/common';
import * as am5percent from "@amcharts/amcharts5/percent";
import { HttpClient } from "@angular/common/http";
import { DeptoIntecap, Deptos, Empresa, Estimacion, Indicadores, PoblacionAnio, Universidad } from "./depto";
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
  conteo=0;
  conteo2=0;
  conteo3=0;
  poblacionInicio=0;
  hombresTotal=0;
  hombresInicio=0;
  porcentajeHombres=0;
  mujeresTotal=0;
  mujeresInicio=0;
  porcentajeMujeres=0;
  private raiz= am5.Root;
  root!:am5.Root;
  root1!:am5.Root;
  root2!:am5.Root;
//  private root!: am5.Root;
  departamentos: Deptos[] = [];
  municipios: Munis[] = [];
  infoDeptoPanel=false;
  infoDeptoh2='';
  nomDeptoh1='';
  infoDeptop='';
  imgDepto='';
  datosDeptos = <Deptos> <unknown>[];
  tablaMunicipios = '';
  
  constructor(@Inject(PLATFORM_ID) private platformId: Object, private zone: NgZone ,private activatedRoute: ActivatedRoute, private http: HttpClient ) { 
    this.activatedRoute.params.subscribe(params => {
     
     
        this.element = false;
      
        this.element = true;
     
        this.getDeptos();
        
        
      });
  }
  asignar(idBusca: number,idIter: number,nombreDepto: string){

    if(idBusca==idIter){
      this.nombreDepartamento=nombreDepto;
    }
  }

  getDeptos() {
    this.http.get<Deptos>("http://localhost:8082/vui-api/departamentos").subscribe(data => {      
      for (let index = 0; index < data['length']; index++) {
        const element = data[index];        
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
      if (this.raiz) {
        
      }
    });
  }
public infoDepartamento(event?: any){
  //document.getElementById("infoDepto2").style.visibility='hidden' ;
  this.infoDeptoPanel=true;
	var departamento: string = (event.target as Element).id;
  var imagen='<img src="http://localhost:4200/assets/images/departamentos/'+this.datosDeptos[departamento][0].nombreDepto+'.jpg" class="img-fluid mx-auto d-block mb-5" style="width: 300px;" alt="" />';
  this.limpiaValores();
  this.nomDeptoh1 = "PERFIL DEPARTAMENTO DE " + this.datosDeptos[departamento][0].nombreDepto;
  
  const imgD =<HTMLElement>document.querySelector( ".imgDepto" );
  imgD.innerHTML = imagen; 
  this.infoDeptoh2=this.datosDeptos[departamento][0].descripcion;
  this.buscarMunicipios(this.datosDeptos[departamento][0].idDepartamento);
  this.buscarGraficaPoblacionAnio(this.datosDeptos[departamento][0].idDepartamento);
  this.buscarGraficaPoblacionRango(this.datosDeptos[departamento][0].idDepartamento);
  this.buscarGraficaDeptoIntecap(this.datosDeptos[departamento][0].idDepartamento);
	this.buscarUniversidades(this.datosDeptos[departamento][0].idDepartamento); 
  this.buscarDeptoEmpresas(this.datosDeptos[departamento][0].idDepartamento);
  this.buscarIndicadores(this.datosDeptos[departamento][0].idDepartamento); 
  this.buscarDeptoIndicadores(this.datosDeptos[departamento][0].idDepartamento);
  //console.log(departamento);
}
public limpiaValores (  ) {
	this.infoDeptoh2='';
  this.infoDeptop='';
  this.nomDeptoh1='';
  this.imgDepto='';
  
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
     
    
    if(this.conteo==0){
      this.root= this.raiz.new("chartdiv");
      this.conteo++;      
    }else{
      
    }   
    this.root.setThemes([
      am5themes_Animated.new( this.root)
  ]);
  this.root.container.children.clear();
  
 
  var chart =  this.root.container.children.push( 
    am5xy.XYChart.new( this.root, {
      panY: false,
      wheelY: "zoomX",
      layout: this.root.verticalLayout,
      maxTooltipDistance: 0
    }) 
  );
  /*var legend = chart.children.push(
    am5.Legend.new( this.root, {
      centerX: am5.p50,
      x: am5.p50
    })
  );*/
  

// Define data

let data: unknown[] = [];
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


  var yAxis = chart.yAxes.push(
    am5xy.ValueAxis.new(this.root, {    
      extraTooltipPrecision: 1,  
      renderer: am5xy.AxisRendererY.new(this.root, {
        minGridDistance: 20
      })
    })
  );

  var xAxis = chart.xAxes.push(
    am5xy.CategoryAxis.new(this.root, {   
      categoryField: "year",   
      renderer: am5xy.AxisRendererX.new(this.root, {
        minGridDistance: 20
      }),
    })
  );

  xAxis.data.setAll(data);
  
// Create series
// Create series
    const createSeries = (name: string, field: string) => {
      console.log("Crear serie: "+ name +"  "+field );
  var series = chart.series.push( 
    am5xy.ColumnSeries.new(this.root, { 
      name: name,
      xAxis: xAxis, 
      yAxis: yAxis, 
      valueYField: field, 
      categoryXField: "year",
      //tooltip: am5.Tooltip.new(this.root, {}),
      
      maskBullets: true
    }) 
  );

  series.bullets.push(() => {
    return am5.Bullet.new(this.root, {
      locationX: 0.5,
      locationY: 0.5,
      sprite: am5.Circle.new(this.root, {
        radius: 25,
        fill: am5.color(0xffffff)
      })
    });
  });

  series.bullets.push(() => {
    return am5.Bullet.new(this.root, {
      locationX: 0.5,
      locationY: 0.5,
      sprite: am5.Label.new(this.root, {
        text: "{valueY}",
        centerX: am5.percent(50),
        centerY: am5.percent(50),
        textAlign: "center",
        populateText: true
      })
    });
  });
  series.columns.template.setAll({
    cornerRadiusTL: 5,
    cornerRadiusTR: 5
  });
  //series.get("tooltip")?.label.set("text", "[bold]{name}[/]\n{valueX.formatDate()}: {valueY}")
  series.data.setAll(data);
 
}
createSeries("Masculino", "value1");
createSeries("Femenino", "value2");
this.root._logo?.dispose();

// Add legend
var legend = chart.children.push(am5.Legend.new(this.root, {})); 
legend.data.setAll(chart.series.values);
  



chart.set("cursor", am5xy.XYCursor.new(this.root, {
  behavior: "zoomXY",
  xAxis: xAxis
}));
xAxis.set("tooltip", am5.Tooltip.new(this.root, {
  themeTags: ["axis"]
}));

yAxis.set("tooltip", am5.Tooltip.new(this.root, {
  themeTags: ["axis"]
}));
    });

 }
 public buscarGraficaPoblacionRango(depto: string) {
  this.http.get<PoblacionAnio>("http://localhost:8082/vui-api/indicadoresPoblacionRango?idDepartamento=" + depto).subscribe(datos => {
    //console.log(datos);
        if(this.conteo2==0){
      this.root1= this.raiz.new("chartRango");
      this.conteo2++;      
    }else{
      
    } 
    
    this.root1.setThemes([
      am5themes_Animated.new(this.root1)
    ]);
    this.root1.container.children.clear();
    let chart = this.root1.container.children.push(
      am5xy.XYChart.new(this.root1, {
        panX: false,
        panY: false,
        wheelX: "panX",
        wheelY: "zoomX",
        layout: this.root1.verticalLayout,
        arrangeTooltips: false
      })
    );

    chart.getNumberFormatter().set("numberFormat", "#.#s");

    let legend = chart.children.push(
      am5.Legend.new(this.root1, {
        centerX: am5.p50,
        x: am5.p50
      })
    );
    var data: unknown[] = [];
    var tempMasculino=0;
    var tempFemenino=0; 
    var contador=0;
    
  
 
    for (var i = 0; i < datos['length']; i++) {

      for (var j = i; j < datos['length']; j++) {         
        if (datos[i].idRango == datos[j].idRango) {
          console.log(+' == '+datos[j].idRango);
          contador++;
          if(contador==1)
          {
            if(datos[j].idGenero==1){
              tempMasculino=Number(datos[j].cantidad.replace(",", ""));
            }else{
              tempFemenino=Number(datos[j].cantidad.replace(",", ""));
            }             
            
          }
          else if(contador==2)
          {
            if(datos[j].idGenero==1){
              tempMasculino=Number(datos[j].cantidad.replace(",", ""));
            }else{
              tempFemenino=Number(datos[j].cantidad.replace(",", ""));
            }
            data.push({
              age: datos[j].nomRango,
              Hombres: tempMasculino,
              Mujeres: -tempFemenino
            });
          }else if(contador==3){
            contador=0;
          }
          
        }//tERMINA IF
      }//Termina for.
    }//Termina for

  
    let yAxis = chart.yAxes.push(
      am5xy.CategoryAxis.new(this.root1, {
        categoryField: "age",
        renderer: am5xy.AxisRendererY.new(this.root1, {
          inversed: true,
          cellStartLocation: 0.1,
          cellEndLocation: 0.9
        })
      })
    );
    
    yAxis.data.setAll(data);
    
    let xAxis = chart.xAxes.push(
      am5xy.ValueAxis.new(this.root1, {
        renderer: am5xy.AxisRendererX.new(this.root1, {})
      })
    );
    const createSeries = ( field: string, labelCenterX: number | am5.Percent, pointerOrientation: any, rangeValue: number) => {
      let series = chart.series.push(
        am5xy.ColumnSeries.new(this.root1, {
          xAxis: xAxis,
          yAxis: yAxis,
          valueXField: field,
          categoryYField: "age",
          sequencedInterpolation: true,
          clustered: false,
          /*tooltip: am5.Tooltip.new(this.root1, {
            pointerOrientation: pointerOrientation,
            labelText: "{categoryY}: {valueX}"
          })*/
        })
      );
    
      series.columns.template.setAll({
        height: am5.p100
      });
        
      series.bullets.push(() => {
        return am5.Bullet.new(this.root1, {
          locationX: 0.5,
          locationY: 0.5,
          sprite: am5.Label.new(this.root1, {
            text: "{categoryY}: {valueX}",
            centerX: am5.percent(50),
            centerY: am5.percent(50),
            textAlign: "center",
            populateText: true
          })
        });
      });
      series.columns.template.setAll({
        cornerRadiusTL: 5,
        cornerRadiusTR: 5
      });
    
      series.data.setAll(data);
      series.appear();
    
      var rangeDataItem = xAxis.makeDataItem({
        value: rangeValue
      });
      xAxis.createAxisRange(rangeDataItem);
      rangeDataItem.get("grid")?.setAll({
        strokeOpacity: 1,
        stroke: series.get("stroke")
      });
    
      let label = rangeDataItem.get("label") ;
      label?.setAll({
        text: field.toUpperCase(),
        fontSize: "1.1em",
        fill: series.get("stroke"),
        paddingTop: 10,
        isMeasured: false,
        centerX: labelCenterX
      });
      label?.adapters.add("dx", function() {
        return -chart.plotContainer.height();
      });
    
      return series;
    }
    createSeries("Hombres", am5.p100, "right", -3);
    createSeries("Mujeres", 0, "left", 4);
    this.root._logo?.dispose();
    let cursor = chart.set("cursor", am5xy.XYCursor.new(this.root1, {
      behavior: "zoomY"
    }));
    cursor.lineY.set("forceHidden", true);
    cursor.lineX.set("forceHidden", true);
    chart.appear(1000, 100);



  });
}

public buscarGraficaDeptoIntecap(depto: string) {
  this.http.get<DeptoIntecap>("http://localhost:8082/vui-api/indicadoresDeptoIntecap?idDepartamento=" + depto).subscribe(datos => {


    if(this.conteo3==0){
      this.root2= this.raiz.new("chartIgss");
      this.conteo3++;      
    }else{
      
    } 
    this.root2.container.children.clear();
    let chart = this.root2.container.children.push(
      am5percent.PieChart.new(this.root2, {
        layout: this.root2.verticalLayout
      })
    );
    //console.log(datos);
    var canthombres = 0;
    var cantmujeres = 0;
    for (var i = 0; i < datos['length']; i++) {
      canthombres = canthombres + Number(datos[i].hombres | 0);
      cantmujeres = cantmujeres + Number(datos[i].mujeres | 0);
    }
    //console.log(canthombres);
    //console.log(cantmujeres);
    // Define data
    let data = [{
      country: "Hombres",
      sales: canthombres
    }, {
      country: "Mujeres",
      sales: cantmujeres
    }];

    // Create series
    let series = chart.series.push(
      am5percent.PieSeries.new(this.root2, {
        name: "Series",
        valueField: "sales",
        categoryField: "country"
      })
    );
    series.data.setAll(data);

    // Add legend
    let legend = chart.children.push(am5.Legend.new(this.root2, {
      centerX: am5.percent(50),
      x: am5.percent(50),
      layout: this.root2.horizontalLayout
    }));

    legend.data.setAll(series.dataItems);
  });
}

public buscarUniversidades(depto: string){

  this.http.get<Universidad>("http://localhost:8082/vui-api/indicadoresUniversidad?idDepartamento="+depto).subscribe(data => {  
  					var universidades='<ul class="list-group list-group-flush">';
						universidades+='<li class = "list-group-item  justify-content-between align-items-center">';
						universidades+='<h3 class = "list-group-item-heading blue-title text-uppercase mt-4">PÚBLICA</h3>';
								
            universidades+='<img src="http://localhost:4200/assets/images/esp/Universidades/'+data[0].logo+'" class="img-thumbnail" alt="...">';
            universidades+='<spam class="text-uppercase ml-2">'+data[0].nomUniversidad+'</span>';	
						universidades+='</li>';
						universidades+='<li class = "list-group-item  justify-content-between align-items-center">';
						universidades+='<h3 class = "list-group-item-heading blue-title text-uppercase mt-4">PRIVADAS</h3>';
						for ( var i = 1; i < data['length']; i++ ) {
              universidades+='<img src="http://localhost:4200/assets/images/esp/Universidades/'+data[i].logo+'" class="img-thumbnail" width=75vh alt="...">';
              universidades+='<spam class="text-uppercase ml-2">'+data[i].nomUniversidad+'</span><br>';	
            
							
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
          empresas += '<div class= " imgEmpMicro imgContainer text-uppercase bg-secondary text-white d-flex flex-column align-items-center justify-content-center">';
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
          empresas += '<div class= " imgEmpPequena imgContainer text-uppercase bg-secondary text-white d-flex flex-column align-items-center justify-content-center">';
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
          empresas += '<div class= " imgEmpMediana imgContainer text-uppercase bg-secondary text-white d-flex flex-column align-items-center justify-content-center">';
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
          empresas += '<div class= " imgEmpGrande imgContainer text-uppercase bg-secondary text-white d-flex flex-column align-items-center justify-content-center">';
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
						estimacion+='<span class="text-light-blue justify-content-center fs-5 ml-2">';
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
						estimacion+='<span class="text-light-blue justify-content-center fs-5 ml-2">';
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
						estimacion+='<span class="text-light-blue justify-content-center fs-5 ml-2">';
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
						dCh+='<span class="text-light-blue justify-content-center fs-5 ml-2" >';
						dCh+='<strong>'+data[index].nomCorto;
						dCh+='</strong>';
						dCh+='</span>';
						dCh+='</p>';
						dCh+='<div class="col-md-12 d-flex justify-content-center">';
						dCh+='<h1 class="blue-counter">';
						dCh+=data[index].valor+"%";

           
            
            
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
        educacion+='<span class="text-light-blue justify-content-center fs-5 ml-2" >';
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
						igss+='<span class="text-light-blue justify-content-center fs-5 ml-2" >';
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
            if (data[index].idIndicador==27)
            {
              dinamismo2 += '<div class= " imgDinEmpresas imgContainer text-uppercase bg-secondary text-white d-flex flex-column align-items-center justify-content-center">';
            } else if (data[index].idIndicador==6) {
              dinamismo2 += '<div class= " imgDinExport imgContainer text-uppercase bg-secondary text-white d-flex flex-column align-items-center justify-content-center">';
            } else if (data[index].idIndicador==7) {
              dinamismo2 += '<div class= " imgDinCrecimientoExp imgContainer text-uppercase bg-secondary text-white d-flex flex-column align-items-center justify-content-center">';
            } else if (data[index].idIndicador==11) {
              dinamismo2 += '<div class= " imgDinPotencial2020 imgContainer text-uppercase bg-secondary text-white d-flex flex-column align-items-center justify-content-center">';
            } else if (data[index].idIndicador==12) {
              dinamismo2 += '<div class= " imgDinPotencial2021 imgContainer text-uppercase bg-secondary text-white d-flex flex-column align-items-center justify-content-center">';
            } else if (data[index].idIndicador==15) {
              dinamismo2 += '<div class= " imgDinRecaudacion imgContainer text-uppercase bg-secondary text-white d-flex flex-column align-items-center justify-content-center">';
            } else if (data[index].idIndicador==16) {
              dinamismo2 += '<div class= " imgDinParqueV imgContainer text-uppercase bg-secondary text-white d-flex flex-column align-items-center justify-content-center">';
            } else if (data[index].idIndicador==17) {
						  dinamismo2 += '<div class= " imgDinRecaudacion imgContainer text-uppercase bg-secondary text-white d-flex flex-column align-items-center justify-content-center">';
            }
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
            if (data[index].idIndicador==1) {
              infraestructura += '<div class= " imgInfraPuntosAcceso imgContainer text-uppercase bg-secondary text-white d-flex flex-column align-items-center justify-content-center">';
            } else if (data[index].idIndicador==2) {
              infraestructura += '<div class= " imgInfraCobElectrica imgContainer text-uppercase bg-secondary text-white d-flex flex-column align-items-center justify-content-center">';
            } else if (data[index].idIndicador==3) {
              infraestructura += '<div class= " imgInfraRadiobases imgContainer text-uppercase bg-secondary text-white d-flex flex-column align-items-center justify-content-center">';
            } else if (data[index].idIndicador==4) {
              infraestructura += '<div class= " imgInfraZDEEP imgContainer text-uppercase bg-secondary text-white d-flex flex-column align-items-center justify-content-center">';
            } else if (data[index].idIndicador==5) {
              infraestructura += '<div class= " imgInfraOrgJur imgContainer text-uppercase bg-secondary text-white d-flex flex-column align-items-center justify-content-center">';
            }
						
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
            if(data[index].idIndicador==24) {
						  costos += '<div class= " imgCostoInmobiliario imgContainer text-uppercase bg-secondary text-white d-flex flex-column align-items-center justify-content-center">';
            } else if (data[index].idIndicador==25) {
						  costos += '<div class= " imgCostoEnergia imgContainer text-uppercase bg-secondary text-white d-flex flex-column align-items-center justify-content-center">';
            } else if (data[index].idIndicador==26) {
						  costos += '<div class= " imgCostoAgua imgContainer text-uppercase bg-secondary text-white d-flex flex-column align-items-center justify-content-center">';
            } 
            
            costos += '<h2 class="fs-2 bg-primary">'+data[index].nomCorto+'</h2>';
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
	let arr2 = numeroConMiles.split('.');
  if(arr2[1]=="0" || arr2[1]=="00" ){
    return arr2[0];
  }
	return numeroConMiles;
  }
}
