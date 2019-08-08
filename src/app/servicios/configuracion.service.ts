
import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs';
import {map} from 'rxjs/operators';
import { GLOBAL } from './global';



@Injectable()
export class ConfiguracionService {
    public url: string;
    public nombre: string;



    

    constructor(
        public _http: Http
    ) {
        this.url = GLOBAL.url;
        this.nombre = 'configuracion';
 
    }



    /**
     * Esta función lista de configuracion     
     */
    listarConfiguracion(pin,jsonData) {
        let body = jsonData;
        //console.log(JSON.stringify(body));
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
     * Esta función lista de configuracion Tabla.     
     */
    listarConfiguracionTabla(pin,jsonData) {
        let body = jsonData;
        //console.log(JSON.stringify(body));
        let headers = new Headers({ 'Content-Type': 'application/json' });
        headers.append('Authorization', pin);
        let options = new RequestOptions({ headers: headers });
        return this._http.post(
                                this.url+'/'+this.nombre + '/mostrar/tabla', 
                                body, 
                                options
                            ).pipe(map(res => res.json())); 
    }
    
    /**
     * Insertar un espacio.
     * @param {string} Descripcion - Descripcion del espacio
     * @param {string} SessionUser - null por defecto.
     */
    insertarConfiguracion(pin, Variable,Dato, SessionUser) {
        let body = {
            "Variable": Variable,
            "Dato": Dato,
            "SessionUser": SessionUser
        };
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
     * @param {string} Id - Identificador unico del espacio
     * @param {string} Descripcion - Descripcion del espacio
     * @param {string} SessionUser - null por defecto.
     */
    modificarConfiguracion(pin,Variable,Dato,Active, SessionUser) {
        let body = {
            "Variable": Variable,
            "Dato": Dato,
            "Active": Active,
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
    eliminarConfiguracion(pin, Variable, SessionUser) {
        let body = {
            "Variable": Variable,
            "SessionUser": SessionUser     
        };
        console.log("eliminar:"+JSON.stringify(body));
        let headers = new Headers({ 'Content-Type': 'application/json' });
        headers.append('Authorization', pin);
        let options = new RequestOptions({ headers: headers });
        return this._http.put(
                                this.url + '/' + this.nombre + '/eliminar', 
                                body, 
                                options).pipe(map(res => res.json())); 
    }

}