import { APP_INITIALIZER, NgModule } from '@angular/core';
import { AppRoutesModule } from './app-routes';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';

import { LoaderComponent } from './components/loader/loader.component';

// Modules
import { MainPageModule } from './pages/main-page.module';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';

// Servicios
import { LoaderService } from './servicios/loader.service';
import { AuthInterceptor } from './interceptors/auth-interceptor.service';
import { LoaderInterceptor } from './interceptors/loader-interceptor.service';
import { ErrorInterceptor } from './interceptors/error-interceptor.service';
import { ConfigService } from './servicios/config.service';
import { BearerTokenService } from './servicios/bearer-token.service';

// Componentes
import { LoginComponent } from './auth/login/login.component';
import { MainPageComponent } from './pages/main-page.component';
import { HeaderComponent } from './shared/header/header.component';
import { HeaderSecundarioComponent } from './shared/headersecundario/header-secundario.component';
import { SidebarComponent } from './shared/sidebar/sidebar.component';
import { CookieService } from 'ngx-cookie-service';


export function initConfigService(configService: ConfigService): Function {

  if (window.location.hostname === 'localhost') {
    
    const url = 'https://dictaminacion-web-mx-dictaminacion-dev.apps.str01.mex.dev.mx1.paas.cloudcenter.corp/';

    return () => configService.loadConfig(url);
    
  } else {

    return () => configService.loadConfig();
    
  }
  
}

@NgModule({
  declarations: [
    AppComponent,
    LoaderComponent,
    LoginComponent,
    MainPageComponent,
    HeaderComponent,
    HeaderSecundarioComponent,
    SidebarComponent
  ],
  imports: [
    BrowserModule,
    AppRoutesModule,
    HttpClientModule,
    MainPageModule,
    FormsModule,
    DialogModule,
    ButtonModule
  ],
  providers: [
    LoaderService,
    { provide: APP_INITIALIZER, useFactory: initConfigService, multi: true, deps: [ConfigService] },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: LoaderInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true, deps: [ConfigService, BearerTokenService, CookieService] },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
