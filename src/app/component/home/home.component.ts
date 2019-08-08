import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-home', 
  templateUrl: './home.component.html'
})
export class HomeComponent implements OnInit {

  constructor(private _route:Router) {
    if(  sessionStorage.getItem("datosUser")==null){
      _route.navigate(['/']);
  } else{

  }
   }

  ngOnInit() {
  }

}
