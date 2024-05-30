import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ProfileGuard } from '../guards/profile.guard';
import { AuthGuard } from '../guards/auth.guard';

import { AltafolioComponent } from './altafolio/altafolio.component';
import { AltausuarioComponent } from './altausuario/altausuario.component';
import { UsuarioComponent } from './usuario/usuario.component';
import { UsuariosComponent } from './usuarios/usuarios.component';
import { SolicitudesComponent } from './solicitudes/solicitudes.component';
import { VistafoliosComponent } from './vistafolios/vistafolios.component';
import { AdminSlaComponent } from './admin-sla/admin-sla.component';
import { AltaclienteComponent } from './altacliente/altacliente.component';
import { DictaminacionComponent } from './dictaminacion/dictaminacion.component';
import { FoliodetalleComponent } from './foliodetalle/foliodetalle.component';
import { FoliocomplementoComponent } from './foliocomplemento/foliocomplemento.component';
import { GestiondiariaComponent } from './gestiondiaria/gestiondiaria.component';
import { VistafoliosgestionComponent } from './vistafoliosgestion/vistafoliosgestion.component';
import { ReportesComponent } from './reportes/reportes.component';


const pagesRoutes: Routes = [

  { path: 'solicitudes', component: SolicitudesComponent, canActivate: [ProfileGuard] },
  { path: '', redirectTo: '/solicitudes', pathMatch: 'full' },
  { path: 'vistafolios/:rs/:buc', component: VistafoliosComponent },
  { path: 'nva-solicitud', component: AltafolioComponent, canActivate: [ProfileGuard] },
  { path: 'usuarios', component: UsuariosComponent, canActivate: [ProfileGuard] },
  { path: 'usuario/:id', component: UsuarioComponent, canActivate: [ProfileGuard] },
  { path: 'altausuario', component: AltausuarioComponent, canActivate: [ProfileGuard] },
  { path: 'SLA', component: AdminSlaComponent, canActivate: [ProfileGuard] },
  { path: 'clientes', component: AltaclienteComponent, canActivate: [ProfileGuard] },
  { path: 'dictaminacion/:folio', component: DictaminacionComponent, canActivate: [ProfileGuard] },
  { path: 'foliodetalle/:idfolio', component: FoliodetalleComponent, canActivate: [ProfileGuard] },
  { path: 'foliocomplemento/:idfolio', component: FoliocomplementoComponent, canActivate: [ProfileGuard] },
  { path: 'gestiondiaria', component: GestiondiariaComponent, canActivate: [ProfileGuard] },
  { path: 'foliodetgestion/:idfolio', component: VistafoliosgestionComponent, canActivate: [ProfileGuard] },
  { path: 'reportes', component: ReportesComponent, canActivate: [ProfileGuard] }

]

@NgModule({
    declarations: [],
      imports: [ RouterModule.forChild( pagesRoutes ) ],
      exports: [ RouterModule ]
  })
  export class PagesRoutesModule { }