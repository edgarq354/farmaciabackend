import { BrowserModule } from '@angular/platform-browser';
import {  LOCALE_ID,NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { JwBootstrapSwitchNg2Module } from 'jw-bootstrap-switch-ng2';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { SidebarModule } from './component/sidebar/sidebar.module';
import { NavbarModule } from './component/navbar/navbar.module';
import { FooterModule } from './component/footer/footer.module';
import { PagesnavbarModule } from './component/pagesnavbar/pagesnavbar.module';
import { IndexComponent } from './layouts/index/index.component';
import { LoginComponent } from './component/login/login.component';
 //registrar la localizacion
import { registerLocaleData } from '@angular/common';



    // importar locales
    import localePy from '@angular/common/locales/es-PY';
import { MapaComponent } from './component/mapa/mapa.component';

    // registrar los locales con el nombre que quieras utilizar a la hora de proveer
    registerLocaleData(localePy, 'es');


@NgModule({
  declarations: [
    AppComponent,
    IndexComponent,
    LoginComponent,
    MapaComponent 
  ],
  imports: [
    BrowserModule,
    HttpModule,
    HttpClientModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    SidebarModule,
    NavbarModule,
    FooterModule,
    PagesnavbarModule,
    JwBootstrapSwitchNg2Module,
  ],
  providers: [{ provide: LOCALE_ID, useValue: 'es-Ar' }],
  bootstrap: [AppComponent]
})
export class AppModule { }
