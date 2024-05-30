export interface Profile {
    name:       string;
    lastNameDad: string;
    lastNameMom: string;
    userId:      string;
    rolUser:     string;
    costCenter: CostCenter[];
    zone: Zone[];
    region: Region[];
    errorCode: string,
    userPosition: UserPosition[];

}

export interface CostCenter {
    cveCostCenter: string;
    nameCostCenter: string;
}

export interface Zone {
    idZone:     string;
    nameZone:   string;
}

export interface Region {
    idRegion:    string;
    nameRegion:  string;
}

export interface UserPosition {
    idPosition: string,
    codePosition: string,
    descPosition: string
}