import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { IndexComponent } from './layouts/index/index.component';
import { LoginComponent } from './component/login/login.component';

const routes: Routes = [
  
  {
    path: '',
    component: LoginComponent,
    pathMatch: 'full',
  },
  {
    path: '',
    component: IndexComponent,
    children: [
      {
        path: '',
        loadChildren: './component/home/home.module#HomeModule'
      },
      {
        path: 'tipoproblema',
        loadChildren: './component/tipoproblema/tipoproblema.module#TipoProblemaModule'
      },
      {
        path: 'servicio',
        loadChildren: './component/servicio/servicio.module#ServicioModule'
      },
      {
        path: 'reporte',
        loadChildren: './component/reporte/reporte.module#ReporteModule'
      },
      {
        path: 'reportemensual',
        loadChildren: './component/reporte-mensual/reporte-mensual.module#ReporteMensualModule'
      },
      {
        path: 'perfil',
        loadChildren: './component/perfil/perfil.module#PerfilModule'
      },
      {
        path: 'usuario',
        loadChildren: './component/usuario/usuario.module#UsuarioModule'
      },
      {
        path: 'puesto',
        loadChildren: './component/puesto/puesto.module#PuestoModule'
      },
      {
        path: 'equipo',
        loadChildren: './component/equipo/equipo.module#EquipoModule'
      },
      {
        path: 'configuracion',
        loadChildren: './component/configuracion/configuracion.module#ConfiguracionModule'
      } ,
      {
        path: 'farmacia',
        loadChildren: './component/farmacia/farmacia.module#FarmaciaModule'
      }  ,
      {
        path: 'farmacia-perfil/:id',
        loadChildren: './component/farmacia-perfil/farmacia-perfil.module#FarmaciaPerfilModule'
      } ,
      {
        path: 'turno',
        loadChildren: './component/turno/turno.module#TurnoModule'
      }            
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
