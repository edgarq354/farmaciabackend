import { Component, OnInit } from '@angular/core';
import { Router,ActivatedRoute } from '@angular/router';

// funciones globales
import { GLOBAL,DataTables } from '../../servicios/global';
import { globalFunciones } from '../../servicios/globalFunciones';
// llamo a los servicios
import { FarmaciaService } from '../../servicios/farmacia.service';
import {  FarmaciaInterface } from '../../models/farmacia.model';
import {  HorarioInterface,Horario } from '../../models/horario.model';
// Import BlockUI decorator & optional NgBlockUI type
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { FarmaciaComponent } from '../farmacia/farmacia.component';
declare var $:any;
declare var mapboxgl:any;

@Component({
  selector: 'app-farmacia-perfil',
  templateUrl: './farmacia-perfil.component.html',
  styleUrls: ['./farmacia-perfil.component.css'],
  providers: [
    FarmaciaService,
    globalFunciones]
})


export class FarmaciaPerfilComponent implements OnInit {
  @BlockUI() blockUI: NgBlockUI;
  IdImport:any;
 
  public titulo: string;
  public url: string;
  public name: string;
  public mensaje : string;
  public pin: string;

  public farmacia: FarmaciaInterface;
  public farmaciaLista : FarmaciaInterface[]; 


  public horarioLista : Horario[]; 
  public swVer:boolean=false;

  state_default: boolean = true;

 



 
  loaderLogo:Boolean = false;
  loaderBanner:Boolean = false;
  
 

  constructor(private activeRoute:ActivatedRoute, 
    private _router: Router, 
    private _globalFuncion:globalFunciones,
    private _farmaciaService: FarmaciaService ) { 

    this.IdImport=this.activeRoute.snapshot.paramMap.get("id");
    this.url=GLOBAL.url;
    this.titulo="Actualizar la Farmacia";

    if( sessionStorage.getItem("datosUser")==null){
      _router.navigate(['/' ]);
  } else{

    this.farmacia={
      id:'',
      nombre:'',
      direccion_logo:'',
      direccion_banner:'',
      razon_social:'',
      nit:'',
      correo:'',
      telefono:'',
      celular:'',
      direccion:'',
      fecha_registro:'',
      calificacion:'',
      ranking:'',
      id_tbcomentario:'',
      latitud:'',
      longitud:'',
      indicacion:'',
      abierto_cerrado:'',
      turno:''
      }
      this.mensaje=""; 
      this.swVer=false;


    }
 
  }

  ngOnInit() {
    this.getPerfilFarmacia();
  }

  ngAfterViewInit(){
    // Init Tooltips
    $('[rel="tooltip"]').tooltip();
  }

  cargar_mapa(){
  
    
 
    mapboxgl.accessToken = 'pk.eyJ1IjoiZWRnYXJlbGlvIiwiYSI6ImNpcm5qMG05NzA4a3l0Mm5remI2dHptNmcifQ.OEmtFndm7IDHoCg_Gyt7Tw';
var map = new mapboxgl.Map({
container: 'map', // container id
style: 'mapbox://styles/mapbox/streets-v11',
center: [ this.farmacia.longitud,this.farmacia.latitud], // starting position
zoom: 15 // starting zoom
});

// Add zoom and rotation controls to the map.
map.addControl(new mapboxgl.NavigationControl());
map.on("load",()=>{
map.resize();
 
var marker = new mapboxgl.Marker({
  draggable: true
  })
  .setLngLat([this.farmacia.longitud,this.farmacia.latitud])
  .addTo(map);
   
  function onDragEnd() {
  var lngLat = marker.getLngLat();
  $("#latitud").val(lngLat.lat);
  $("#longitud").val(lngLat.lng);
  console.log(lngLat.lng + ', ' + lngLat.lat);
  }
  marker.on('dragend', onDragEnd);

  });
}

  
//SUBIR IMAGEN LOGO
  subiendoLogo(ev){
    let img:any = ev.target;
    if(img.files.length > 0){
      this.loaderLogo = true;
      console.log("id_farmacia:"+this.farmacia.id);
      let form = new FormData();
      form.append('file',img.files[0]); 
      this._farmaciaService.subirImagenLogo(form,this.farmacia.id).subscribe(
        resp => {
          this.loaderLogo = false;
          if(resp.estado){ 
            this.farmacia.direccion_logo = resp.nombre;
            alert(resp.mensaje);
          }
         // console.log(JSON.stringify(resp));
        },
        error => {
          this.loaderLogo = false;
          alert('Imagen supera el tamaño permitido');
          
        }
      );
    }
  }

  //SUBIR IMAGEN DE BANNER
  subiendoBanner(ev){
    let img:any = ev.target;
    if(img.files.length > 0){
      this.loaderBanner = true;
      console.log("id_farmacia:"+this.farmacia.id);
      let form = new FormData();
      form.append('file',img.files[0]); 
      this._farmaciaService.subirImagenBanner(form,this.farmacia.id).subscribe(
        resp => {
          this.loaderBanner = false;
          if(resp.estado){ 
            this.farmacia.direccion_banner = resp.nombre;
            alert(resp.mensaje);
          }
          //console.log(JSON.stringify(resp));
        },
        error => {
          this.loaderBanner = false;
          alert('Imagen supera el tamaño permitido');
          
        }
      );
    }
  }

  // metodo para cargar la lista de Tipos
  getPerfilFarmacia(){
    // Start blocking
  this.blockUI.start('Cargando...'); 
  
  let jsonData={
    id_farmacia:this.IdImport
   };
  this._farmaciaService.getFarmaciaPorId(this.pin,jsonData).subscribe(            
    result => {    
     // console.log(JSON.stringify(result));    
      if (result.suceso != 1) {
        this.mensaje = result.mensaje;          
      }else{
         
        this.farmacia=result.farmacia;
        this.horarioLista=result.horario;
        this.actualizarActivo();
        this.actualizarActivoFarmacia();
        this.cargar_mapa();
        if(this.swVer==true){
          $('#datatables').dataTable().fnDestroy();
        }else{
          this.swVer=true;
        }
  
        setTimeout(function(){
          $('#datatables').dataTable(DataTables);
        $('[rel="tooltip"]').tooltip();
        },0);
      }
      this.blockUI.stop(); 
    },
    error => {
      this.blockUI.stop(); 
      this._globalFuncion.alertError("Error de conexión!");
    }
  )
  }

  actualizarActivoFarmacia()
  {
      let sw:boolean=false;
      if(this.farmacia.activo==true)
      {
        sw=true;
      } 
      this.farmacia.activo=sw;
  }

  actualizarActivo()
  {
    for(let i=0;i<this.horarioLista.length;i++)
    {
      let sw:boolean=false;
      if(this.horarioLista[i].activo==true)
      {
        sw=true;
      } 
      this.horarioLista[i].activo=sw;
    }
  }

    // metodo para cargar la lista de Tipos
    ActualizarFarmacia(){
      // Start blocking
    this.blockUI.start('Cargando...'); 
    this.farmacia.latitud=$("#latitud").val();
    this.farmacia.longitud=$("#longitud").val();
    let jsonData={
      farmacia:this.farmacia,
      horario:this.horarioLista
     };
     //console.log("jsonDato:"+JSON.stringify(jsonData)); 
    this._farmaciaService.modificarFarmacia(this.pin,jsonData).subscribe(            
      result => {    
      //  console.log("result:"+JSON.stringify(result));    
        if (result.suceso != 1) {
          this.mensaje = result.mensaje; 
          this._globalFuncion.alertError(this.mensaje);         
        }else{
          this._globalFuncion.alertExito(result.mensaje); 
          this.getPerfilFarmacia();
        }
        this.blockUI.stop(); 
      },
      error => {
        this.blockUI.stop(); 
        this._globalFuncion.alertError("Error de conexión!");
        console.log("error:"+JSON.stringify(error));    
      }
    )
    }



}
