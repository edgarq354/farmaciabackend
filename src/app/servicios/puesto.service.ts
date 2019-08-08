
import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs';
import {map} from 'rxjs/operators';
import { GLOBAL } from './global';



@Injectable()
export class PuestoService {
    public url: string;
    public nombre: string;



    

    constructor(
        public _http: Http
    ) {
        this.url = GLOBAL.url;
        this.nombre = 'puesto';
 
    }



    /**
     * Esta función lista los espacios.     
     */
    listarPuesto(pin,jsonData) {
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
     * Insertar un espacio.
     * @param {string} Descripcion - Descripcion del espacio
     * @param {string} SessionUser - null por defecto.
     */
    insertarPuesto(pin, jsonData) {
        let body = jsonData;
        console.log("consulta:"+JSON.stringify(jsonData));
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
    modificarPuesto(pin, jsonData) {
        let body = jsonData;
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
    eliminarPuesto(pin, jsonData) {
        let body = jsonData;
        //console.log("eliminar:"+JSON.stringify(body));
        let headers = new Headers({ 'Content-Type': 'application/json' });
        headers.append('Authorization', pin);
        let options = new RequestOptions({ headers: headers });
        return this._http.put(
                                this.url + '/' + this.nombre + '/eliminar', 
                                body, 
                                options).pipe(map(res => res.json())); 
    }

}