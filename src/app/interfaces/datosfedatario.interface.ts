export interface Datosfedatario {
    id?: string;
    idArchivo?: string;
    idFedatarioPk?: string;
    idDatosInscrPk?: string;
    idSolicitud?: string;
    num_escritura_fed?: string;
    idSolFk?: string;
    nomFedatario?: string;
    numFedatario?:    string;
    estado?: string;
    municipio?: string;
    entidadfe?: string;
    municipiofe?: string;
    estadoNombre?: string;
    municipioNombre?: string;
    poliza?: string;
}

export interface DatosJuzgado {
    id?: string;
    idArchivo?: string;
    nomJuez?: string;
    numJuzgado?:    string;
    estado?: string;
    municipio?: string;
}