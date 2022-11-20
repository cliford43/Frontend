import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-datos-generales',
  templateUrl: './datos-generales.component.html',
  styleUrls: []
})
export class DatosGeneralesComponent implements OnInit {

  private fragment: string;

  constructor(private route: ActivatedRoute) { 
    this.fragment = "";
  }

  ngOnInit() {
    this.route.fragment.subscribe(fragment => { this.fragment = fragment as string; });
  }

  ngAfterViewInit(): void {
    try {
      document.querySelector('#' + this.fragment)?.scrollIntoView();
    } catch (e) { }
  }

}
