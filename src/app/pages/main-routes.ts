import { MainPageComponent } from './main-page.component';
import { AuthGuard } from '../guards/auth.guard';
import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';


const routes: Routes = [
    {
      path: '',
      component: MainPageComponent,
      canActivate: [ AuthGuard ],
      canLoad: [ AuthGuard ],
      loadChildren: () => import('./pages-routes.module').then( m => m.PagesRoutesModule )
    },
  ]

  
@NgModule({
    declarations: [],
    imports: [ RouterModule.forChild(routes) ],
    exports: [ RouterModule ]
})
export class MainRoutesModule { }