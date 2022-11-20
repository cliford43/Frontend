import { Component, OnInit } from '@angular/core';
import { MessageAlertService } from 'src/app/configuracion-aplicacion/servicios/message-alert.service';

@Component({
  selector: 'app-message-alert',
  templateUrl: './message-alert.component.html',
  styles: ['']
})
export class MessageAlertComponent implements OnInit {

  constructor(public  msgAlertSrv:MessageAlertService) { }

  ngOnInit(): void { }

}
