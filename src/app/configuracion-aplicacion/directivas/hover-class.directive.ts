import { Directive, HostListener, ElementRef, Input } from '@angular/core';

@Directive({
  selector: '[hover-class]'
})
export class HoverClassDirective {

  //listas
  listaClasesRemovidas: any [] = [];
  constructor(public elementRef:ElementRef) { }
  @Input('hover-class') hoverClass:any;  

  @HostListener('mouseenter') onMouseEnter() {
    let clases = this.hoverClass.split(" ");
    if(this.elementRef.nativeElement.classList.contains("card-cifras")){
      this.elementRef.nativeElement.classList.remove("border-0");
      this.elementRef.nativeElement.classList.remove("card-cifras")
      this.listaClasesRemovidas.push("border-0");
      this.listaClasesRemovidas.push("card-cifras");
    }
    else if(this.elementRef.nativeElement.classList.contains("card-degree")){
      this.elementRef.nativeElement.children[2].children[0].classList.add(clases[0]);
      this.elementRef.nativeElement.children[2].children[0].classList.remove("btn-outline-degree");
      return;
    }
    clases.forEach((clase: any) => {
      this.elementRef.nativeElement.classList.add(clase);  
    });
 }

  @HostListener('mouseleave') onMouseLeave() {
    let clases = this.hoverClass.split(" ");
    if(this.elementRef.nativeElement.classList.contains("card-degree")){
      this.elementRef.nativeElement.children[2].children[0].classList.remove(clases[0]);
      this.elementRef.nativeElement.children[2].children[0].classList.add("btn-outline-degree");
      return;
    }
    clases.forEach((clase: any) => {
      this.elementRef.nativeElement.classList.remove(clase);  
    });
    this.listaClasesRemovidas.forEach(clase => {
      this.elementRef.nativeElement.classList.add(clase);  
    });
  }

}