import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-quienes-somos',
  templateUrl: './quienes-somos.component.html',
  styleUrls: []
})
export class QuienesSomosComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    try {
      //document.querySelector('#titulo')?.scrollIntoView();
    } catch (e) { }
  }

}
