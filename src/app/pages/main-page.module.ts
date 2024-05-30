// Modules
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; 
import { ReactiveFormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { DataTablesModule } from "angular-datatables";
import { PrimengModule } from '../components/primeng.module';
import { RouterModule } from '@angular/router';
import { PdfViewerModule } from 'ng2-pdf-viewer';

// Components
import { SolicitudesComponent } from './solicitudes/solicitudes.component';
import { AltafolioComponent } from './altafolio/altafolio.component';
import { UsuarioComponent } from './usuario/usuario.component';
import { UsuariosComponent } from './usuarios/usuarios.component';
import { AltausuarioComponent }from './altausuario/altausuario.component';
import { VistafoliosComponent } from './vistafolios/vistafolios.component';
import { AdminSlaComponent } from './admin-sla/admin-sla.component';
import { AltaclienteComponent } from './altacliente/altacliente.component';
import { DictaminacionComponent } from './dictaminacion/dictaminacion.component';
import { EspecialComponent } from '../shared/dictamenes/especial/especial.component';
import { OpbancariasComponent } from '../shared/dictamenes/opbancarias/opbancarias.component';
import { GobeinstComponent } from '../shared/dictamenes/gobeinst/gobeinst.component';
import { DevdesaldoComponent } from '../shared/dictamenes/devdesaldo/devdesaldo.component';
import { FideicomisoComponent } from '../shared/dictamenes/fideicomiso/fideicomiso.component';
import { PersonafisComponent } from '../shared/dictamenes/personafis/personafis.component';
import { FoliodetalleComponent } from './foliodetalle/foliodetalle.component';
import { FoliocomplementoComponent } from './foliocomplemento/foliocomplemento.component';
import { GestiondiariaComponent } from './gestiondiaria/gestiondiaria.component';
import { VistafoliosgestionComponent } from './vistafoliosgestion/vistafoliosgestion.component';
import { ReportesComponent } from './reportes/reportes.component';

// Services
import { IntervinienteService } from '../servicios/intervinientes.service';
import { ConfirmationService } from 'primeng/api';
import { MessageService } from 'primeng/api';


@NgModule({
    declarations: [
        SolicitudesComponent,
        VistafoliosComponent,
        AltafolioComponent,
        UsuarioComponent,
        UsuariosComponent,
        AltausuarioComponent,
        AdminSlaComponent,
        AltaclienteComponent,
        DictaminacionComponent,
        EspecialComponent,
        OpbancariasComponent,
        GobeinstComponent,
        DevdesaldoComponent,
        FideicomisoComponent,
        PersonafisComponent,
        FoliodetalleComponent,
        FoliocomplementoComponent,
        GestiondiariaComponent,
        VistafoliosgestionComponent,
        ReportesComponent
    ],
    exports: [
        SolicitudesComponent,
    ],
    imports: [
        CommonModule,
        FontAwesomeModule,
        PrimengModule,
        DataTablesModule,
        FormsModule,
        ReactiveFormsModule,
        RouterModule,
        PdfViewerModule
    ],
    providers: [IntervinienteService, MessageService, ConfirmationService],
})
export class MainPageModule { }
