import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-acuerdos-comerciales-inversion',
  templateUrl: './acuerdos-comerciales-inversion.component.html',
  styleUrls: []
})
export class AcuerdosComercialesInversionComponent implements OnInit {


  constructor() { }

  ngOnInit() {
    try {
      document.querySelector('#titulo')?.scrollIntoView();
    } catch (e) { }
  }


}
