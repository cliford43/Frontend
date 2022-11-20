import { Component, OnInit } from '@angular/core';
import { BlockUiService } from 'src/app/configuracion-aplicacion/servicios/block-ui.service';

@Component({
  selector: 'app-loading',
  templateUrl: './loading.component.html',
  styles: ['']
})
export class LoadingComponent implements OnInit {

  constructor(public blockUI:BlockUiService) { }

  ngOnInit(): void {
  }

}
