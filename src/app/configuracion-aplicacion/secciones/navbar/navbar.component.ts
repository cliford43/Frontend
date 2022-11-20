import { Component, ElementRef, HostListener, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { BlockUiService } from '../../servicios/block-ui.service';
import { Utilidades } from '../../utilidades/utilidades';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: []
})

export class NavbarComponent implements OnInit {
  anchoVentana:any;
  tamLogo!:number;

  @ViewChild('mainNav') navbar!: ElementRef;
  @ViewChild('logoNav') logo!: ElementRef;

  @HostListener('window:resize', ['$event']) onResize(event:any) {
    this.anchoVentana = window.innerWidth;
    this.configurarNav();
  }

  @HostListener('window:scroll', ['$event']) onScrollEvent($event: any) {
    if(window.pageYOffset || Utilidades.esMovil() || this.anchoVentana <= 991){
      this.navbar.nativeElement.classList.remove("bg-transparent");
      this.navbar.nativeElement.classList.add("bg-degree");
    }
    else{
      this.navbar.nativeElement.classList.add("bg-transparent");
      this.navbar.nativeElement.classList.remove("bg-degree");
    }
  }

  constructor(public bloqueo: BlockUiService, private router: Router) { }

  ngOnInit(): void { }
  ngAfterViewInit(){
    this.anchoVentana = window.innerWidth;
    this.configurarNav();
  }
  ngAfterViewChecked(){
    if(this.anchoVentana <= 991){
      document.getElementsByTagName("div")[5].style.marginTop = "74px";
      document.getElementsByClassName("page-title")[0]?.classList.add("page-title-movil");
      document.getElementsByClassName("page-title-single")[0]?.classList.add("page-title-none");
      document.getElementsByClassName("page-title-single")[0]?.classList.remove("page-title-single");
    }
    else{
      document.getElementsByClassName("page-title")[0]?.classList.add("page-title-desktop");
      document.getElementsByClassName("page-title-none")[0]?.classList.add("page-title-single");
      document.getElementsByClassName("page-title-none")[0]?.classList.remove("page-title-none");
    }
  }
  cargando(ruta?:any) {
    this.bloqueo.lock();
    setTimeout(() => {
      this.bloqueo.unlock();
      this.router.navigate([ruta]);
    }, 2000)
  }
  configurarNav(){
    if(this.anchoVentana <= 991){
      this.logo.nativeElement.classList.remove("logo-desktop");
      this.logo.nativeElement.classList.add("logo-movil");
      this.navbar.nativeElement.classList.remove("bg-transparent");
      this.navbar.nativeElement.classList.add("bg-degree");
      document.getElementsByClassName("page-title")[0]?.classList.remove("page-title-desktop");
      document.getElementsByClassName("page-title")[0]?.classList.add("page-title-movil");
      document.getElementsByClassName("page-title-single")[0]?.classList.add("page-title-none");
      document.getElementsByClassName("page-title-single")[0]?.classList.remove("page-title-single");
      
    }
    else{
      this.navbar.nativeElement.classList.add("bg-transparent");
      this.navbar.nativeElement.classList.remove("bg-degree");
      this.logo.nativeElement.classList.add("logo-desktop");
      this.logo.nativeElement.classList.remove("logo-movil");
      document.getElementsByTagName("div")[5].style.marginTop = "0px";
      document.getElementsByClassName("page-title")[0]?.classList.add("page-title-desktop");
      document.getElementsByClassName("page-title")[0]?.classList.remove("page-title-movil");
      document.getElementsByClassName("page-title-none")[0]?.classList.add("page-title-single");
      document.getElementsByClassName("page-title-none")[0]?.classList.remove("page-title-none");
      
    }
  }
}
