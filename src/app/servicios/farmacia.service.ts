
import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs';
import {map} from 'rxjs/operators';
import { GLOBAL } from './global';



@Injectable()
export class FarmaciaService {
    public url: string;
    public nombre: string;



    

    constructor(
        public _http: Http
    ) {
        this.url = GLOBAL.url;
        this.nombre = 'frmFarmacia.php?opcion=';
 
    }


    /**
     * Esta función lista los espacios.     
     */
    getFarmaciaPorId(pin,jsonData) {
        let body = jsonData;
        //console.log(JSON.stringify(body));
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });
        return this._http.post(
                                this.url+this.nombre + 'getFarmaciaPorId', 
                                body, 
                                options
                            ).pipe(map(res => res.json())); 
    }
    
    /**
     * Esta función lista los espacios.     
     */
    listarFarmacia(pin,jsonData) {
        let body = jsonData;
        //console.log(JSON.stringify(body));
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });
        return this._http.post(
                                this.url+this.nombre + 'lista_farmacia', 
                                body, 
                                options
                            ).pipe(map(res => res.json())); 
    }
    
    /**
     * Insertar un espacio.
     * @param {string} Descripcion - Descripcion del espacio
     * @param {string} SessionUser - null por defecto.
     */
    insertarFarmacia(pin, jsonData, SessionUser) {
        let body = jsonData;
        let headers = new Headers({ 'Content-Type': 'application/json' });
  
        let options = new RequestOptions({ headers: headers });
        return this._http.post(
                                this.url   + this.nombre , 
                                body, 
                                options).pipe(map(res => res.json())); 
    }

    /**
     * Modificar un espacio.
     * @param {string} Id - Identificador unico del espacio
     * @param {string} Descripcion - Descripcion del espacio
     * @param {string} SessionUser - null por defecto.
     */
    modificarFarmacia(pin, jsonData, SessionUser) {
        let body = jsonData;
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });
        return this._http.put(
                                this.url  + this.nombre , 
                                body, 
                                options).pipe(map(res => res.json())); 
    }

    /**
     * Eliminar un espacio.
     * @param {string} Id - Identificador unico del espacio     
     * @param {string} SessionUser - null por defecto.
     */
    eliminarFarmacia(pin, Id, SessionUser) {
        let body = {
            "id": Id,
            "SessionUser": SessionUser     
        };
        //console.log("eliminar:"+JSON.stringify(body));
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });
        return this._http.put(
                                this.url   + this.nombre + 'eliminar', 
                                body, 
                                options).pipe(map(res => res.json())); 
    }

}