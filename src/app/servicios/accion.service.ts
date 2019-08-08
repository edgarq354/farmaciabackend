 

import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs';
import {map} from 'rxjs/operators';
import { GLOBAL } from './global';
 

@Injectable()
export class AccionService {
    public url: string;
    public nombre: string;

    constructor(
        public _http: Http
    ) {
        this.url = GLOBAL.url;
        this.nombre = 'accion';
    }

    /**
     * Esta función lista los servicios.     
     */
    listarAccion(pin,jsonData) {
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
    insertarAccion(  
        pin, 
        Detalle,
        IdTbUsuarioOperador, 
        IdTbServicio,
        IdTbTipoProblema
    ) {
        let body = {
            "Detalle": Detalle, 
            "IdTbUsuarioOperador": IdTbUsuarioOperador, 
            "IdTbServicio": IdTbServicio, 
            "IdTbTipoProblema":IdTbTipoProblema,
            "SessionUser": ""
        };
        

     //   console.log("Nuevo Accion de Servicio:"+JSON.stringify(body));
         
        let headers = new Headers({ 'Content-Type': 'application/json' });
        headers.append('Authorization', pin);
        let options = new RequestOptions({ headers: headers });
        return this._http.post(
                                this.url + '/accion'  , 
                                body, 
                                options).pipe(map(res => res.json())); 
    }

    /**
     * Modificar un espacio.
     */
    modificarAccion(pin,
        id, 
        Detalle,
        IdTbUsuarioOperador,
        IdTbServicio,
        Opcion,
        SessionUser) {
        let body = {
            "Id": id,
            "Detalle": Detalle,
            "IdTbUsuarioOperador": IdTbUsuarioOperador,
            "IdTbServicio": IdTbServicio,
            "Opcion": Opcion,
            "SessionUser": SessionUser
        };
        //console.log("Update: "+JSON.stringify(body));
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
    cancelarAccion(pin, 
        Id, 
        Detalle, 
        SessionUser) {
        let body = {
            "Id": Id,
            "Detalle": Detalle,
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
     * Eliminar un espacio.
     * @param {string} Id - Identificador unico del espacio     
     * @param {string} SessionUser - null por defecto.
     */
    eliminarAccion(pin, Id, SessionUser) {
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