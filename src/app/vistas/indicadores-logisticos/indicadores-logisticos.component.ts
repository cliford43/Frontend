import { Component, Inject, NgZone, OnInit, PLATFORM_ID } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import * as am5 from '@amcharts/amcharts5';
import * as am5xy from '@amcharts/amcharts5/xy';
import am5themes_Animated from '@amcharts/amcharts5/themes/Animated';
import { isPlatformBrowser } from '@angular/common';
import * as am5percent from "@amcharts/amcharts5/percent";
import { HttpClient } from "@angular/common/http";
import { Deptos } from "./depto";
import { Munis } from "./depto"; 
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA }      from '@angular/core';

//import * as d3 from 'd3';

@Component({
  selector: 'app-indicadores-logisticos',
  templateUrl: './indicadores-logisticos.component.html',
  styleUrls: [],
  
})
export class IndicadoresLogisticosComponent implements OnInit {
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
  departamentos: Deptos[] = [];
  municipios: Munis[] = [];
  
  
  constructor(@Inject(PLATFORM_ID) private platformId: Object, private zone: NgZone ,private activatedRoute: ActivatedRoute, private http: HttpClient ) { 
    this.activatedRoute.params.subscribe(params => {
     // let deptoId = params['id'];
     
        this.element = false;
      
        this.element = true;
        
      //  this.departamentos.forEach(elemento => this.asignar(deptoId,elemento['idDepartamento'],elemento['nomDepartamento']));
        
     //   this.getMunis(deptoId).subscribe(munis => this.municipios = munis);
        console.log("MUNICIPIOS:");
        console.log(this.municipios);
        
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
    return this.http.get<Deptos[]>("http://localhost:8082/vui-api/departamentos"); 
  }
  getMunis(idDepto: number): Observable<Munis[]> {
    console.log(idDepto);
    return this.http.get<Munis[]>("http://localhost:8082/vui-api/municipios?idDepartamento="+(idDepto-1));
  }*/
/*  getDeptos() {
    this.http.get<Deptos>("http://localhost:8082/vui-api/deptosbenjamin").subscribe(data => {
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
    } catch (e) { }
  }
  ngAfterViewInit() {
    // Chart code goes in here
    this.browserOnly(() => {
      let root = am5.Root.new("chartdiv");
      let root2 = am5.Root.new("chartpertenencia");
      

      root.setThemes([am5themes_Animated.new(root)]);
      root2.setThemes([am5themes_Animated.new(root2)]);

      let chart = root.container.children.push(
        am5xy.XYChart.new(root, {
          panY: false,
          wheelY: "zoomX",
          layout: root.verticalLayout,
          maxTooltipDistance: 0
        })
      );

      let chart2 = root2.container.children.push(am5percent.PieChart.new(root2, {
        radius: am5.percent(90),
        innerRadius: am5.percent(50),
        layout: root2.horizontalLayout
      }));
      let series2 = chart2.series.push(am5percent.PieSeries.new(root2, {
        name: "Series",
        valueField: "sales",
        categoryField: "country"
      }));
      // Define data
      let data = [
        {		
          category	:	"1900",
          value1	:	123,
          },
          {			
          category	:	"1910",
          value1	:	225,
          },
          {			
          category	:	"1920",
          value1	:	234,
          },
          {			
          category	:	"1930",
          value1	:	345,
          },
          {			
          category	:	"1940",
          value1	:	421,
          },
          {			
          category	:	"1950",
          value1	:	542,
          },
          {			
          category	:	"1960",
          value1	:	521,
          },
          {			
          category	:	"1970",
          value1	:	622,
          },
          {			
          category	:	"1981",
          value1	:	632,
          },
          {			
          category	:	"1991",
          value1	:	645,
          },
          {			
          category	:	"2001",
          value1	:	687,
          }
      ];
      series2.data.setAll([{
        country: "Lithuania",
        sales: 501.9
      }, {
        country: "Czechia",
        sales: 301.9
      }, {
        country: "Ireland",
        sales: 201.1
      }, {
        country: "Germany",
        sales: 165.8
      }, {
        country: "Australia",
        sales: 139.9
      }, {
        country: "Austria",
        sales: 128.3
      }, {
        country: "UK",
        sales: 99
      }, {
        country: "Belgium",
        sales: 60
      }, {
        country: "The Netherlands",
        sales: 50
      }]);
      // Create Y-axis
      let yAxis = chart.yAxes.push(
        am5xy.ValueAxis.new(root, {
          extraTooltipPrecision: 1,
          renderer: am5xy.AxisRendererY.new(root, {})
        })
      );

      // Create X-Axis
      
      let xAxis = chart.xAxes.push(
        am5xy.CategoryAxis.new(root, {
          renderer: am5xy.AxisRendererX.new(root, { minGridDistance: 11}),
          categoryField: "category",
          
        })
      );
      xAxis.data.setAll(data);

      // Create series
      let series1 = chart.series.push(
        am5xy.ColumnSeries.new(root, {
          name: "",
          xAxis: xAxis,
          yAxis: yAxis,
          valueYField: "value1",
          categoryXField: "category",
          calculateAggregates: true,
    tooltip: am5.Tooltip.new(root, {}),
    legendLabelText: "[{stroke}]{name}[/]: [bold #888]{categoryX}[/]",
    legendRangeLabelText: "[{stroke}]{name}[/]",
    legendValueText: "[bold {stroke}]{valueY}[/]",
    legendRangeValueText: "[{stroke}]{valueYClose}[/]"
        })
      );
      series1.data.setAll(data);

     /* let series2 = chart.series.push(
        am5xy.ColumnSeries.new(root, {
          name: "Series",
          xAxis: xAxis,
          yAxis: yAxis,
          valueYField: "value2",
          categoryXField: "category"
        })
      );
      series2.data.setAll(data);
*/
      // Add legend
     // let legend = chart.children.push(am5.Legend.new(root, {}));
      //legend.data.setAll(chart.series.values);

      // Add cursor
      chart.set("cursor", am5xy.XYCursor.new(root, {}));

      this.root = root;

      series2.labels.template.set("visible", false);
      series2.ticks.template.set("visible", false);

// Adding gradients
series2.slices.template.set("strokeOpacity", 0);
series2.slices.template.set("fillGradient", am5.RadialGradient.new(root2, {
  stops: [{
    brighten: -0.8
  }, {
    brighten: -0.8
  }, {
    brighten: -0.5
  }, {
    brighten: 0
  }, {
    brighten: -0.5
  }]
}));

// Create legend
// https://www.amcharts.com/docs/v5/charts/percent-charts/legend-percent-series/
let legend = chart.children.push(am5.Legend.new(root2, {
  centerY: am5.percent(50),
  y: am5.percent(50),
  layout: root2.verticalLayout
}));
// set value labels align to right
legend.valueLabels.template.setAll({ textAlign: "right" })
// set width and max width of labels
legend.labels.template.setAll({ 
  maxWidth: 140,
  width: 140,
  oversizedBehavior: "wrap"
});

legend.data.setAll(series2.dataItems);


// Play initial series animation
// https://www.amcharts.com/docs/v5/concepts/animations/#Animation_of_series
series2.appear(1000, 100);
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


}

