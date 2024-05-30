export interface NgTableConfig {
    title?:  string;
    colums: Colum[];
}

export interface Colum {
    label: string;
    type:  string;
}