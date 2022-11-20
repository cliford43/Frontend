import { Component, ElementRef, HostListener, Input, OnInit } from '@angular/core';
import { Utilidades } from '../../utilidades/utilidades';
import {DecimalPipe} from '@angular/common'
import es from '@angular/common/locales/es';
import { registerLocaleData } from '@angular/common';

@Component({
  selector: 'app-contador',
  templateUrl: './contador.component.html',
  styleUrls: []
})
export class ContadorComponent implements OnInit {
  

  @Input('count-value') valor!:number;        //Valor que se mostrara en la etiqueta
  @Input('count-prefijo') prefijo?:string;     //Texto que se mostrará al lado izquierdo del valor
  @Input('count-postfijo') postfijo?:string; // Texto que se mostrará al alado derecho del valor
  @Input('count-time') tiempo!:number; // Tiempo en segundos que durará la animación
  @Input('count-start') inicio!:number; // Valor donde se iniciará el conteo
  
  //variables
  ejecutoConteo!: boolean;

  constructor(private elemento: ElementRef) { }
  
  @HostListener('window:scroll', ['$event']) onScrollEvent($event: any) {
    var posicion = this.elemento.nativeElement.getBoundingClientRect().top;
    if(window.pageYOffset >= posicion){
      if(!this.ejecutoConteo){
        this.ejecutarConteo();
        this.ejecutoConteo = true;
      }        
    }
  }
  ngOnInit(): void { registerLocaleData( es );}

  ejecutarConteo(){
    let tiempo = this.tiempo * 1000;
    let rango = this.valor - this.inicio;
    let tiempoIteracion = tiempo / rango;
    let aumento = Utilidades.esEntero(this.valor)? 1 : 1.01;
    this.inicio = Utilidades.esEntero(this.valor)? this.inicio : parseFloat(this.inicio + "");
    for(let i = 0; i < rango; i++){
      setTimeout(() => {
        if(i + 1 > rango){
          this.inicio = this.transform(this.valor);
          //this.inicio = this.valor;
          /*var temp1 =this.valor;
          var temp2 = temp1.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
          this.inicio = parseFloat(temp2);
          */
        }else{
          this.inicio = Math.round(((this.inicio + aumento) + Number.EPSILON) * 100) / 100;
        }
      }, i * tiempoIteracion)
    }
  }
  transform(nStr: any): any {
    if (nStr === '') { return ''; }
    let x, x1, x2, rgx;
    nStr += '';
    x = nStr.split('.');
    x1 = x[0];
    x2 = x[1];
    rgx = /(\d+)(\d{3})/;
    while (rgx.test(x1)) {
      x1 = x1.replace(rgx, '$1' + ',' + '$2');
    }
    return x1 + (x2 ? `.${x2}` : '');
  }

}
