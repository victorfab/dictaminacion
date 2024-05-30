// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

/*export const environment = {
  production: false,
   localsession: 'https://admin-usuario-service-mx-dictaminacion-dev.appls.mex01.mex.dev.mx1.paas.cloudcenter.corp/v1',
  solicitudes: 'https://api-folio-service-mx-dictaminacion-dev.appls.mex01.mex.dev.mx1.paas.cloudcenter.corp/missolicitudes/v1',
  gestiondiaria: 'https://api-folio-service-mx-dictaminacion-dev.appls.mex01.mex.dev.mx1.paas.cloudcenter.corp/administrador/v1',
  reasignar: 'https://api-folio-service-mx-dictaminacion-dev.appls.mex01.mex.dev.mx1.paas.cloudcenter.corp/reasignar/v1',
  catalogos: 'https://api-catalogo-service-mx-dictaminacion-dev.appls.mex01.mex.dev.mx1.paas.cloudcenter.corp/catalogo/v1',
  documentos: 'https://api-catalogo-service-mx-dictaminacion-dev.appls.mex01.mex.dev.mx1.paas.cloudcenter.corp/documento/v1',
  tipodictamen: 'https://api-filenet-service-mx-dictaminacion-dev.appls.mex01.mex.dev.mx1.paas.cloudcenter.corp/catalogo/v1',
  usuarios: 'https://admin-usuario-service-mx-dictaminacion-dev.appls.mex01.mex.dev.mx1.paas.cloudcenter.corp/user_management/v1',
  folios: 'https://api-folio-service-mx-dictaminacion-dev.appls.mex01.mex.dev.mx1.paas.cloudcenter.corp/folio/v1',
  apiconnect: 'https://api-folio-service-mx-dictaminacion-dev.appls.mex01.mex.dev.mx1.paas.cloudcenter.corp/apiconnect/v1',
  dictamenes: 'https://api-filenet-service-mx-dictaminacion-dev.appls.mex01.mex.dev.mx1.paas.cloudcenter.corp/dictamen/v1',
  dictaminacion: 'https://api-folio-service-mx-dictaminacion-dev.appls.mex01.mex.dev.mx1.paas.cloudcenter.corp/estatussolicitudes/v1',
  cliente: 'https://api-folio-service-mx-dictaminacion-dev.appls.mex01.mex.dev.mx1.paas.cloudcenter.corp/cliente/v1'
   
};*/
 

export const environment = {
  production: false,

  localsession: 'http://localhost:8080/user_management/v1',
  solicitudes: 'http://localhost:8082/missolicitudes/v1',
  gestiondiaria: 'http://localhost:8082/administrador/v1',
  reasignar: 'http://localhost:8082/reasignar/v1',
  catalogos: 'http://localhost:8090/catalogo/v1',
  documentos: 'http://localhost:8090/documento/v1',
  tipodictamen: 'http://localhost:8083/catalogo/v1',
  usuarios: 'http://localhost:8080/user_management/v1',
  folios: 'http://localhost:8082/folio/v1',
  apiconnect: 'http://localhost:8082/apiconnect/v1',
  dictamenes: 'http://localhost:8083/dictamen/v1',
  dictaminacion: 'http://localhost:8082/estatussolicitudes/v1',
  cliente: 'http://localhost:8082/cliente/v1'

};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
