 

import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs';
import {map} from 'rxjs/operators';
import { GLOBAL } from './global';
import { JsonPipe } from '@angular/common';

@Injectable()
export class UsuarioService {
    public url: string;
    public url_server: string;
    public nombre: string;
    public Usuario: string;
    public Password: string;

    constructor(
        public _http: Http
    ) {
        this.url = GLOBAL.url;
        this.url_server = GLOBAL.url_server;
        this.nombre = 'frmUsuario.php?opcion=';
        this.Usuario = '';
        this.Password = '';
    }

    /**
     * Esta función lista los servicios.     
     */
    listarUsuario(pin,jsonData) {
        let body = jsonData;
        let headers = new Headers({ 'Content-Type': 'application/json' });
        headers.append('Authorization', pin);
        let options = new RequestOptions({ headers: headers });
        return this._http.post(
                                this.url+'/'+this.nombre + '/mostrar', 
                                body, 
                                options
                            ).pipe(map(res => res.json())); 
    }

    listarUsuariosDeMigracion(pin,jsonData) {
        let body = jsonData;
        let headers = new Headers({ 'Content-Type': 'application/json' });
        headers.append('Authorization', pin);
        let options = new RequestOptions({ headers: headers });
        return this._http.post(
                                this.url_server+this.nombre + 'iniciar_sesion_administrador', 
                                body, 
                                options
                            ).pipe(map(res => res.json())); 
    }

        /**
     * Esta función Autentica el usuario     
     */
    
    iniciar_sesion(pin,jsonData) {
        let body = jsonData;
        let headers = new Headers({ 'Content-Type': 'application/json' });
    //    headers.append('Authorization', pin);
        let options = new RequestOptions({ headers: headers });
        return this._http.post(
                                this.url+this.nombre + 'iniciar_sesion_administrador', 
                                body, 
                                options
                            ).pipe(map(res => res.json())); 
    }

   
    
    subirImagen(datos:any):Observable<any>{
        return this._http.post('http://localhost:8081/subir_imagen.php', datos);
      }
  
}