import { Component, OnInit } from '@angular/core';
// Import BlockUI decorator & optional NgBlockUI type
import { BlockUI, NgBlockUI } from 'ng-block-ui';
 
declare var $:any;

import * as moment_ from 'moment';
export const moment =  moment_["default"];

@Component({
  selector: 'app-turno',
  templateUrl: './turno.component.html',
  styleUrls: ['./turno.component.css']
})
export class TurnoComponent implements OnInit {
  public mesLista: string[];
  public anio: string;  
  public mes: string;  
  
  constructor() { 

    let fecha =Date();
    const dateAnio= moment(fecha).format('YYYY');
    const dateMes= moment(fecha).format('MM');

    //this.mesLista==["Enero","Febrero","Marzo","Abril","Mayo","Junio","Julio","Agosto","Septiembre","Octubre","Noviembre","Diciembre"];  
    this.mes=dateMes;
    this.anio=dateAnio;


  }

  ngOnInit() {
  }

}
