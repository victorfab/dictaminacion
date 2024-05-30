export interface Beneficiarios {
    id?: any;
    idDictTab?: any;
    idArchivo?: string;
    idSolicitud?: string;
    idPlanDevBenePk?: string;
    poliza?: string;
    numpoliza?: string;
    numpolizab?: string;
    nombre?:    string;
    priApellido?: string;
    segApellido?: string;
    titular?: string;
    rfc?: string;
    rfcb?: string;
    cargoSociedad?: string;
    formaValor?: any;
    entrega?: string;
    formpago?: any;
    noCuenta?: any;
    nomArchivo?: string;
    formpagonom?: string;
    nombreCompleto?: string;
    designado?: any;
    designadoComo?: any;
    formaPagoDesc?: string;
    porcentajeDesignado?: string;
    formaPago?: string;
    idAux?: number;
}

export interface Intervinientes {
    idAux?: number;
    idArchivo?: string;
    idSolicitud?: string;
    idDictIntervPk?: string;
    numpoliza?: string;
    poliza?: string;
    nombre?:    string;
    apPaterno?:    string;
    apMaterno?:    string;
    nombrebenb?: string;
    apepatbenb?: string;
    apematabenb?: string;
    numpolizab?:    string;
    cargoFide?: string;
    nombreCompletob?:  string;
    finesDesc?: any[];
    rfc?: string;
    cargofid?: string;
    fines?: any;
}