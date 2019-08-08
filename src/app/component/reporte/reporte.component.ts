import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

//Funciones Globales..
import { DataTables,GLOBAL,DataTablesExcel } from '../../servicios/global';
import { globalFunciones }from '../../servicios/globalFunciones';

// llamo a los servicios
import { ServicioService } from '../../servicios/servicio.service';
import { InterfaceServicioModel } from '../../models/servicio.model';

// Import BlockUI decorator & optional NgBlockUI type
import { BlockUI, NgBlockUI } from 'ng-block-ui';


import * as jsPDF from 'jspdf';
import 'jspdf-autotable';

//codigo de encriptacion 
import * as CryptoJS from 'crypto-js';
 
// llamo a los servicios de Usuario
import { UsuarioService } from '../../servicios/usuario.service';
import { Usuario } from '../../models/usuario.model';
import { Usuario2 } from '../../models/usuario.model'; 

import * as moment_ from 'moment';
import { AccionModel } from '../../models/accion.model';
import { isNull } from 'util';
export const moment =  moment_["default"];
 

declare var $:any;

@Component({
  selector: 'app-reporte',
  templateUrl: './reporte.component.html',
  providers: [ServicioService, UsuarioService,globalFunciones] 
})
export class ReporteComponent implements OnInit {
  @BlockUI() blockUI: NgBlockUI;
  public titulo: string;
  public FechaInicio: string;
  public FechaFin: string;
  public mensaje: string;
  public pin: string;
  public session: Usuario2;
  public Opcion: string;
  public IdFuncionario: string;
  public IdOperador: string;

  public servicio: InterfaceServicioModel;
  public servicios : InterfaceServicioModel[];

  
  // variable para usuarios operadores
  public usuarios: Usuario[]; 

  //variable para usuarios funcionarios
  public usuario_funcionarios: Usuario[];

  public swVer:boolean=false;

  constructor(
    private _router: Router,
    private _servicioService: ServicioService,    
    private _usuarioService: UsuarioService,
    private _globalFuncion:globalFunciones
  ) { 

        //GLOBAL.session=sjcl.decrypt("encryptDatosUser", JSON.parse(sessionStorage.getItem("datosUser")));
         if(  sessionStorage.getItem("datosUser")==null){
          _router.navigate(['/']);
      } else{
     
      GLOBAL.session=JSON.parse(this.decryptData(sessionStorage.getItem("datosUser"),"encryptDatosuser"));
    this.IdOperador='Todos';
    this.IdFuncionario='Todos';
    this.titulo = 'Reporte';        
    this.pin= GLOBAL.pin;
    this.session=GLOBAL.session;

    //adicionamos los valores de a sessionStorage de inicio de sesion en las variables locales
 
 
    this.servicio= {
      id:null,
      FechaSolicitud:'',
      FechaAceptado:'',
      FechaCancelado:'',
      FechaCompletado:'',
      FechaCalificacion:'',
      Detalle:'',
      DetalleCancelo:'',
      DetalleCalificacionFuncionario:'',
      Calificacion:'',
      TipoProblema:'',
      Estado:'',
      IdTbUsuario:'',
      IdTbUsuarioOperador:'',
      IdTbTipoProblema:'',
      Funcionario:'',
      Operador:'',
      Problema:'',
      Accion:null
    };
    
    this.servicios=[];  

    let fecha=new Date();
    let fecha_2= new Date();
    fecha_2.setDate(fecha_2.getDate() -7);
    const dateStringFin = moment(fecha).format('YYYY-MM-DD');
    const dateStringInicio = moment(fecha_2).format('YYYY-MM-DD');
    this.FechaInicio=dateStringInicio;
    this.FechaFin=dateStringFin;
    this.swVer=false;
    
    moment.locale('es');
  } 
  }

  ngOnInit() {
    this.listarOperador();
        this.listarUsuario();
  }

  generarPDFporServicio(index){

    this.servicio=this.servicios[index];  
  console.log(JSON.stringify(this.servicio));
    // ------------------------------------------------------------------------------:.REPORTE TRAMITES ENTREGA SUPERVISOR

    const pdf: any = new jsPDF({ orientation: 'p', unit: 'cm', format: 'letter', lineHeight: 1.2 });
  //  let pdft= new jsPDFt();

    // ----------------------------------------------------------------FOOTER PAGINADO
    const totalPagesExp  = "{total_pages_count_string}";
    let pageContent = function (data) {
        let str = "Página " + data.pageCount;
        if (typeof pdf.putTotalPages === 'function') {
            str = str + " de " + totalPagesExp;
        }
        pdf.setFontType("normal");
        pdf.setFontSize(9);
        let pageHeight = pdf.internal.pageSize.height || pdf.internal.pageSize.getHeight();

        pdf.text(str, (pdf.internal.pageSize.width / 2) - 1, pageHeight - 0.6);
    };
    //------------------------------------------------------------------------------

    pdf.setFontType("bold");
    pdf.setFontSize(15);

    pdf.text(2, 1, 'GOBIERNO AUTÓNOMO MUNICIPAL DE SANTA CRUZ DE LA SIERRA');


    pdf.setFontSize(12);
    pdf.text(6.5, 1.5, 'Reportes de Servicios Realizados al Funcionario');

    pdf.setFontType("normal");
    pdf.setFontSize(10);

    let fechaIni = moment(this.servicio.FechaSolicitud, 'YYYY-MM-DD h:mm').format('DD/MM/YYYY h:mm');
    pdf.text(7, 2, 'Fecha:   ' + fechaIni );

    pdf.text(7, 2.5, 'Funcionario:   ' + this.servicio.Funcionario);
    pdf.text(7, 2.9,'Operador:   ' +  this.servicio.Operador);

    pdf.setLineWidth(0.04);
    pdf.line(2,3,19.5, 3);
  
    pdf.text(0.5, 3.5, 'Nombre Supervisor:');
    pdf.text(4, 3.5, this.session.Nombre);
    pdf.text(0.5, 3.9, 'Fecha Impresión:');
    pdf.text(4, 3.9, moment().format('LLLL'));

    pdf.setLineWidth(0.04);
    pdf.line(0.3, 4, 21, 4);



    let dataTipo = [];

    let fAceptado="";
    let fCancelo="";
    let fDetalleCancelo="";
    let fCalificacion="";
    let fDetalleCalificacionFuncionario="";
    
    if(this.servicio.FechaAceptado!=null)
    {
      fAceptado=moment(this.servicio.FechaAceptado, 'YYYY-MM-DD h:mm').format('DD/MM/YYYY h:mm');
    } 

    if(this.servicio.FechaCancelado!=null)
    {
      fCancelo=moment(this.servicio.FechaCancelado, 'YYYY-MM-DD h:mm').format('DD/MM/YYYY h:mm');
    } 

    if(this.servicio.DetalleCancelo!=null)
    {
      fDetalleCancelo=this.servicio.DetalleCancelo;
    } 
    if(this.servicio.Calificacion!=null)
    {
      fCalificacion=this.servicio.Calificacion;
    } 
    if(this.servicio.DetalleCalificacionFuncionario!=null)
    {
      fDetalleCalificacionFuncionario=this.servicio.DetalleCalificacionFuncionario;
    } 


    //-------------------------------------------------------------------------------------:.TABLAS
    

    pdf.text(0.5, 4.4, 'Fecha Aceptada:');
    pdf.text(4, 4.4, fAceptado);
 
    pdf.text(0.5, 4.8, 'Problemas:');
    pdf.text(4, 4.8,this.servicio.Detalle);
    if(this.servicio.Estado=='COMPLETADO'){
      pdf.text(0.5, 5.3, 'Detalle calif.:');
      pdf.text(4, 5.3,  fDetalleCalificacionFuncionario);
      pdf.text(0.5, 5.8, 'Calificación:');
      pdf.text(4, 5.8, fCalificacion);
    
    }else{
      pdf.text(0.5, 5.3, 'Motiv. de Cancel.:');
      pdf.text(4, 5.3, fCancelo+"\n"+ fDetalleCancelo);
    }
    
    
   
    pdf.text(0.5, 6.3, 'Estado:');
    pdf.text(4, 6.3, this.servicio.Estado);

  
    pdf.setLineWidth(0.04);
    pdf.line(0.3, 6.7, 21, 6.7);
    pdf.text(0.5, 7.1, 'Tipos de Problemas:');
    pdf.text(4, 7.1, this.servicio.TipoProblema);

    pdf.text(0.5, 7.5, 'Problemas:');
    pdf.text(4, 7.5, this.servicio.Problema);
    
    pdf.setFontType("bold");
    pdf.text(0.5, 8.1, 'Soluciones Aplicadas:');
    pdf.setFontType("normal");

    let columnsTipo = [
      { title: "Fecha", dataKey: "fecha" },
      { title: "Descripción", dataKey: "descripcion" }
  ];


      
                  

 
 
 
            let pro=this.servicio.Accion;
            let pp:AccionModel;
           // pro=JSON.parse(pro);
          //console.log("Accion:"+JSON.stringify(pro));
          if(!isNull(pro)){
           pp=JSON.parse(pro);
             pp.length=JSON.parse(pro).length;
                   for (let k = 0; k < pp.length; k++) {  
                   
                      dataTipo.push({
                          "fecha":  moment(pp[k].Fecha, 'YYYY-MM-DD h:mm').format('DD/MM/YYYY h:mm'),
                          "descripcion": pp[k].Detalle
                      })
                  }
       
                    pdf.autoTable(columnsTipo, dataTipo,
                          {
                            columnStyles: {
                              0: {columnWidth: 250},
                              1: {columnWidth: 250}
                              // etc
                            },
                             // addPageContent: pageContent,
                             // startY: pdf.autoTable.previous.finalY + 0.6,
                              margin: { left: 0.5, right: 1, bottom: 2.7 ,top:8.3},
                              theme: 'plain', 
                              styles: {
                                  fontSize: 10, fontStyle: 'normal', cellPadding: 0.1,columnWidth: 'wrap'
                              },
                              headerStyles: {
                                  fontStyle: 'bold',
                                  fontSize: 8.7
                              }
                          }
                    );
            }
    
    if (typeof pdf.putTotalPages === 'function') {
        pdf.putTotalPages(totalPagesExp);
    }


    
    //-----------------------------------------------------------------------------:.MOSTRAR

    window.open(pdf.output('bloburl'), '_blank');




}

  generarPDF(){


        // ------------------------------------------------------------------------------:.REPORTE TRAMITES ENTREGA SUPERVISOR

        const pdf: any = new jsPDF({ orientation: 'l', unit: 'cm', format: 'letter', lineHeight: 1.2 });
      //  let pdft= new jsPDFt();

        // ----------------------------------------------------------------FOOTER PAGINADO
        const totalPagesExp  = "{total_pages_count_string}";
        let pageContent = function (data) {
            let str = "Página " + data.pageCount;
            if (typeof pdf.putTotalPages === 'function') {
                str = str + " de " + totalPagesExp;
            }
            pdf.setFontType("normal");
            pdf.setFontSize(9);
            let pageHeight = pdf.internal.pageSize.height || pdf.internal.pageSize.getHeight();
    
            pdf.text(str, (pdf.internal.pageSize.width / 2) - 1, pageHeight - 0.6);
        };
        //------------------------------------------------------------------------------
    
        pdf.setFontType("bold");
        pdf.setFontSize(15);
    
        pdf.text(5, 1, 'GOBIERNO AUTÓNOMO MUNICIPAL DE SANTA CRUZ DE LA SIERRA');
    
    
        pdf.setFontSize(12);
        pdf.text(9, 1.5, 'Reportes de Servicios Realizados al Funcionario');
    
        pdf.setFontType("normal");
        pdf.setFontSize(10);
    
        let fechaIni = moment(this.FechaInicio, 'YYYY-MM-DD').format('DD/MM/YYYY');
        let fechaFin = moment(this.FechaFin, 'YYYY-MM-DD').format('DD/MM/YYYY');
        pdf.text(10, 2, 'Desde Fecha:   ' + fechaIni + '     Hasta:   ' + fechaFin);

        pdf.text(10, 2.5, 'Funcionario:   ' +  $("#IdFuncionario option:selected").text());
        pdf.text(10, 2.9,'Operador:   ' +  $("#IdOperador option:selected").text());
    
        pdf.setLineWidth(0.04);
        pdf.line(5,3, 23, 3);
    
        pdf.text(0.5, 3.5, 'Nombre Supervisor:');
        pdf.text(4, 3.5, this.session.Nombre);
        pdf.text(0.5, 3.9, 'Fecha Impresión:');
        pdf.text(4, 3.9, moment().format('LLLL'));
    
        pdf.setLineWidth(0.04);
        pdf.line(0.3, 4.2, 27.5, 4.2);
    
        //-------------------------------------------------------------------------------------:.TABLAS
    
        let columns = [
            { title: "Nro", dataKey: "nro" },
            { title: "Fecha", dataKey: "fecha" },
            { title: "Fecha Aceptado", dataKey: "fechaAceptado" },
            { title: "Problema", dataKey: "problema" },
            { title: "Motivo de Canc.", dataKey: "motivoCancelacion" },
            { title: "Calificación", dataKey: "calificacion" },
            { title: "Estado", dataKey: "estado" },
            { title: "Funcionario", dataKey: "funcionario" },
            { title: "Operador", dataKey: "operador" }
        ];
        
   
    
     
                    let data = [];
    
                    for (let j = 0; j <this.servicios.length; j++) {  
                      let fAceptado="-";
                      let fCancelo="-";
                      let fDetalleCancelo="-";
                      let fCalificacion="-";
                      let fOperador="-";
                      
                      if(this.servicios[j].FechaAceptado!=null)
                      {
                        fAceptado=moment(this.servicios[j].FechaAceptado, 'YYYY-MM-DD h:mm').format('DD/MM/YYYY h:mm');
                      } 

                      if(this.servicios[j].FechaCancelado!=null)
                      {
                        fCancelo=moment(this.servicios[j].FechaCancelado, 'YYYY-MM-DD h:mm').format('DD/MM/YYYY h:mm');
                      } 

                      if(this.servicios[j].DetalleCancelo!=null)
                      {
                        fDetalleCancelo=this.servicios[j].DetalleCancelo;
                      } 

                      if(this.servicios[j].Calificacion!=null)
                      {
                        fCalificacion=this.servicios[j].Calificacion;
                      } 
                      if(this.servicios[j].Operador!=null)
                      {
                        fOperador=this.servicios[j].Operador;
                      }                       
                      
                      

                        data.push({
                            "nro": j + 1,
                            "fecha": moment(this.servicios[j].FechaSolicitud, 'YYYY-MM-DD h:mm').format('DD/MM/YYYY h:mm'),
                            "fechaAceptado": fAceptado,
                            "problema": this.servicios[j].Detalle,
                            "motivoCancelacion": fCancelo+"\n"+ fDetalleCancelo,
                            "calificacion": fCalificacion,
                            "estado": this.servicios[j].Estado,
                            "funcionario": this.servicios[j].Funcionario,
                            "operador": fOperador
                        })
                         
                    }

                        pdf.autoTable(columns, data,
                              {
                                  columnStyles: {
                                      entregado: { columnWidth: 6 }
                                  },
                                 // addPageContent: pageContent,
                                 // startY: pdf.autoTable.previous.finalY + 0.6,
                                  margin: { left: 0.5, right: 0.5, bottom: 2.7 ,top:4.5},
                                  theme: 'plain',
                                  styles: {
                                      fontSize: 8, fontStyle: 'normal', cellPadding: 0.05
                                  },
                                  headerStyles: {
                                      fontStyle: 'bold',
                                      fontSize: 8.7
                                  }
                              }
                        );
  
                    

        
        if (typeof pdf.putTotalPages === 'function') {
            pdf.putTotalPages(totalPagesExp);
        }
        
        //-----------------------------------------------------------------------------:.MOSTRAR
    
        window.open(pdf.output('bloburl'), '_blank');




  }

      // metodo para cargar la lista de Servicios sin atender
listarServicios(){

  this.FechaFin= moment(this.FechaFin).format('YYYY-MM-DD');
  this.FechaInicio = moment(this.FechaInicio).format('YYYY-MM-DD');
 
  this.blockUI.start('Cargando...');

  //console.log(this.FechaInicio);
  //console.log(this.FechaFin);
 
  let jsonData={
    "opcion":"Resumen",
    "IdTbUsuarioOperador":this.IdOperador,
    "FechaInicio":this.FechaInicio,
    "FechaFin":this.FechaFin,
    "IdTbUsuario":this.IdFuncionario
  };

  //console.log("IdOperador:"+$("#IdOperador option:selected").text());
  //console.log("IdFuncionario:"+$("#IdFuncionario option:selected").text());

  //console.log("Json:"+JSON.stringify(jsonData));
  this._servicioService.listarServicio(this.pin,jsonData).subscribe(            
    result => {  
      
      if (result.Exito != 1) {
        this.mensaje = result.Dato;          
      }else{
      //   console.log(result.Dato);
        this.servicios=result.Dato; 
                               
      }
      if(this.swVer==true){
        $('#datatables').dataTable().fnDestroy();
      }  else{
      this.swVer=true;
      }
     
      setTimeout(function(){
        $('#example').DataTable( {
          dom: 'Bfrtip',
          buttons: [
              'copyHtml5',
              'excelHtml5',
              'csvHtml5',
              'pdfHtml5'
          ]
      } );
        $('#datatables').dataTable(DataTablesExcel);
        $('[rel="tooltip"]').tooltip();
      },500); 
      this.blockUI.stop(); 
    },
    error => {
      this.blockUI.stop();
      this._globalFuncion.alertError(error);
      
    }
  )
}




//metodo para obtener lista de Usuario Funcionario
listarUsuario(){
  let jsonData={
    "opcion":"Tipo",
  "tipo_usuario":"FUNCIONARIO"
};
this.blockUI.start('Cargando...');
  this._usuarioService.listarUsuario(this.pin,jsonData).subscribe(            
    result => {        
      if (result.Exito != 1) {
        this.mensaje = result.Dato;          
      }else{
        //console.log(result.Dato);
        
        this.usuario_funcionarios=result.Dato;           
        
      }  
      this.blockUI.stop();     
    },
    error => {
      this._globalFuncion.alertError(error);
      this.blockUI.stop();
    }
  )
}


//metodo para obtener lista de Operadores
listarOperador(){
  let jsonData={
    "opcion":"Tipo",
  "tipo_usuario":"OPERADOR"
};

this.blockUI.start('Cargando...');

  this._usuarioService.listarUsuario(this.pin,jsonData).subscribe(            
    result => {        
      if (result.Exito != 1) {
        this.mensaje = result.Dato;          
      }else{
        //console.log(result.Dato);
        
        this.usuarios=result.Dato;                    
      }    
      this.blockUI.stop();   
    },
    error => {
      this._globalFuncion.alertError(error);
      this.blockUI.stop();
    }
  )
}

ngAfterViewInit(){

  
}

encryptData(data,key) {
  try {
    return CryptoJS.AES.encrypt(JSON.stringify(data), key).toString();
  } catch (e) {
    //console.log(e);
  }
}

decryptData(data,key) {
  try {
    const bytes = CryptoJS.AES.decrypt(data, key);
    if (bytes.toString()) {
      return JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
    }
    return data;
  } catch (e) {
    //console.log(e);
  }
}


 
}
