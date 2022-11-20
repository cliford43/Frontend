import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-modal-header',
  templateUrl: './modal-header.component.html',
  styleUrls: []
})
export class ModalHeaderComponent implements OnInit {

  @Input() cerrarModal!: () => void;             //Funcion para cerrar el modal  
  @Input('titulo') titulo!:string; //titulo del modal

  constructor() { }

  ngOnInit(): void {
  }

}
