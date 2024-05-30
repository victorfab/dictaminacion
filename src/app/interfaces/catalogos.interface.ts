export interface Estatus {
    nombre?: string;
}

export interface Region {
    id?: string;
    nombre?: string;
}

export interface Cattipodict {
    id?: string;
    nombre?: string;
    isselected: boolean;
    ayuda?: string;
}

export interface Catbanca {
    data?: any[];
    id?: string;
    nombre?: string;
}

export interface Catzona {
    id?: string;
    nombre?: string;
}

export interface Tipousr {
    id?: string;
    nombre?: string;
}

export interface Tipodoc {
    idTipoDictamen?: string;
    descTipoDictamen?: string,
    id?: string,
    idTipoEmpresa?: string,
    descTipoEmpresa?: string,
    idDocumento?: string,
    descDocumento?: string,
    descripcion?: string,
    obligatorio?: string,
    tipoDocumento?: string;
}

export interface Reingreso {
    id?: string;
    nombre?: string;
}

export interface Tipoempresa {
    id?: string;
    tipo?: string;
    clave?: string;
    descripcion?: string;
    informacion?: any;
    valor?: string;
}

export interface Tiporechazo {
    id?: string,
    nombre?: string,
    folios?: string,
    codigo?: string,
    pendientes?: string,
}

export interface Subrechazo {
    id?: string,
    nombre?: string,
    folios?: string,
    codigo?: string,
    pendientes?: string,
}

export interface Abogado {
    codigo?: string,
    usrExt: string,
    pendientes: string,
    id: string,
    nombre: string,
    folios: string
}

export interface DataDropdown {
    id: number;
    nombre: string;
    ayuda: string;
}