import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MenuService {

  menu: any[] = [
    {
      id: 1,
      icono: 'alta-icon',
      name: 'Gestión diaria',
      url: '/gestiondiaria',
      active: false
    },
    {
      id: 2,
      icono: 'estadoc-icon',
      name: 'Reportes',
      url: '/reportes',
      active: false
    },
    {
      id: 3,
      icono: 'edit-icon',
      name: 'SLA',
      url: '/SLA',
      active: false
    },
    {
      id: 4,
      icono: 'alta-usrs',
      name: 'Alta de usuarios',
      url: '/usuarios',
      active: false
    },
    {
      id: 5,
      icono: 'consulta-icon',
      name: 'Mis solicitudes',
      url: '/solicitudes',
      active: false
    },
    {
      id: 6,
      icono: 'alta-icon',
      name: 'Nueva solicitud',
      url: '/nva-solicitud',
      active: false
    },
    {
      id: 7,
      icono: 'flechas-icon',
      name: 'Seguimiento',
      url: '/solicitudes',
      active: false
    },
    {
      id: 8,
      icono: 'ajustes-icon',
      name: 'Administrador',
      url: '/solicitudes',
      active: false
    },
    {
      id: 9,
      icono: 'alert_icon_gray',
      name: 'Buzón de ayuda',
      url: '/',
      active: false
    }
  ]

}
