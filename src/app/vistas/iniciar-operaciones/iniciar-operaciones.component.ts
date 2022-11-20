import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-iniciar-operaciones',
  templateUrl: './iniciar-operaciones.component.html',
  styleUrls: []
})
export class IniciarOperacionesComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    try {
      document.querySelector('#titulo')?.scrollIntoView();
    } catch (e) { }
  }
}
