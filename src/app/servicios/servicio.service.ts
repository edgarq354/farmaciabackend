 

import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs';
import {map} from 'rxjs/operators';
import { GLOBAL } from './global'; 

@Injectable()
export class ServicioService {
    public url: string;
    public nombre: string;

    constructor(
        public _http: Http
    ) {
        this.url = GLOBAL.url;
        this.nombre = 'servicio';
    }

    /**
     * Esta función lista los servicios.     
     */
    listarServicio(pin,jsonData) {
        let body = jsonData;
        //console.log("servicio:"+body);
        let headers = new Headers({ 'Content-Type': 'application/json' });
        headers.append('Authorization', pin);
        let options = new RequestOptions({ headers: headers });
        return this._http.post(
                                this.url+'/'+this.nombre + '/mostrar', 
                                body, 
                                options
                            ).pipe(map(res => res.json())); 
    }
    

    
    /**
     * Insertar un espacio.
     * @param {string} Descripcion - Descripcion del espacio
     * @param {string} SessionUser - null por defecto.
     */
    insertarServicio( 
        pin,  
        Detalle, 
        TipoProblema,
        IdTbUsuario, 
        IdTbUsuarioOperador, 
        IdTbTipoProblema, 
        Opcion, 
        Estado,
        SessionUser 
    ) {
        let body = {
            "Detalle": Detalle,
            "TipoProblema": TipoProblema,
            "IdTbUsuario": IdTbUsuario,
            "IdTbUsuarioOperador": IdTbUsuarioOperador,
            "Opcion": Opcion,
            "IdTbTipoProblema":IdTbTipoProblema,
            "Estado": Estado,
            "SessionUser": ""
        };

      // console.log("Nuevo Servicio:"+JSON.stringify(body));
        let headers = new Headers({ 'Content-Type': 'application/json' });
        headers.append('Authorization', pin);
        let options = new RequestOptions({ headers: headers });
        return this._http.post(
                                this.url + '/' + this.nombre , 
                                body, 
                                options).pipe(map(res => res.json())); 
    }

    /**
     * Modificar un espacio.
     */
    modificarServicio(pin, id, IdTbUsuarioOperador,Detalle,Opcion,SessionUser) {
        let body = {
            "Id": id,
            "IdTbUsuarioOperador": IdTbUsuarioOperador,
            "Detalle":Detalle,
            "Opcion": Opcion,
            "SessionUser": ""
        };
      console.log("Update: "+JSON.stringify(body));
        let headers = new Headers({ 'Content-Type': 'application/json' });
        headers.append('Authorization', pin);
        let options = new RequestOptions({ headers: headers });
        return this._http.put(
                                this.url + '/' + this.nombre , 
                                body, 
                                options).pipe(map(res => res.json())); 
    }


        /**
     * Cancelar el servicio.
     * @param {string} Id - Identificador unico del servicio
     * @param {string} Detalle - Detalle de la cancelacion
     * @param {string} Opcion - Opcion a la que ingresara la modificacion. 
     * @param {string} SessionUser - null por defecto.
     */
    cancelarServicio(pin, Id, DetalleCancelo, SessionUser) {
        let body = {
            "Id": Id,
            "DetalleCancelo": DetalleCancelo,
            "Opcion": "Cancelar",
            "SessionUser": SessionUser
        };
        let headers = new Headers({ 'Content-Type': 'application/json' });
        headers.append('Authorization', pin);
        let options = new RequestOptions({ headers: headers });
        return this._http.put(
                                this.url + '/' + this.nombre , 
                                body, 
                                options).pipe(map(res => res.json())); 
    }


            /**
     * Calificar el servicio.
     * @param {string} Id - Identificador unico del servicio
     * @param {string} DetalleCalificacionFuncionario - Detalle de la cancelacion
     * @param {string} Calificacion - Detalle de la cancelacion
     * @param {string} Opcion - Opcion a la que ingresara la modificacion. 
     * @param {string} SessionUser - null por defecto.
     */
    calificarServicio(pin, Id, DetalleCalificacionFuncionario,Calificacion, SessionUser) {
        let body = {
            "Id": Id,
            "DetalleCalificacionFuncionario": DetalleCalificacionFuncionario,
            "Calificacion": Calificacion,
            "Opcion": "Calificar",
            "SessionUser": SessionUser
        };
        let headers = new Headers({ 'Content-Type': 'application/json' });
        headers.append('Authorization', pin);
        let options = new RequestOptions({ headers: headers });
        return this._http.put(
                                this.url + '/' + this.nombre , 
                                body, 
                                options).pipe(map(res => res.json())); 
    }
    /**
     * Eliminar un espacio.
     * @param {string} Id - Identificador unico del espacio     
     * @param {string} SessionUser - null por defecto.
     */
    eliminarServicio(pin, Id, SessionUser) {
        let body = {
            "id": Id,
            "SessionUser": SessionUser     
        };
        let headers = new Headers({ 'Content-Type': 'application/json' });
        headers.append('Authorization', pin);
        let options = new RequestOptions({ headers: headers });
        return this._http.put(
                                this.url + '/' + this.nombre + '/eliminar', 
                                body, 
                                options).pipe(map(res => res.json())); 
    }

}