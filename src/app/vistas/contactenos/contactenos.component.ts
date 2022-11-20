import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-contactenos',
  templateUrl: './contactenos.component.html',
  styleUrls: []
})
export class ContactenosComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    try {
      document.querySelector('#titulo')?.scrollIntoView();
    } catch (e) { }
  }

}
