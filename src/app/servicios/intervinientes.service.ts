import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { throwError } from 'rxjs';
import { catchError, map, retry } from 'rxjs/operators';
// Interfaces
import { Interviniente } from '../interfaces/interviniente.interface';
// Servicios
import { BearerTokenService } from './bearer-token.service';
import { ConfigService } from './config.service';

@Injectable()
export class IntervinienteService {

    intervinienteNames: string[] = [];

    credito: boolean = false;

    constructor( private _http: HttpClient,
                 private _conf: ConfigService,
                 private _bearerToken: BearerTokenService ) {}

    /**
     *
     * Función para obtener los intervinientes
     * @return {*} 
     * @memberof IntervinienteService
     */
    getIntervinientes() {
        return this._http.get<any>('../../assets/intervinientes.json')
        .toPromise()
        .then(res => <Interviniente[]>res.data)
        .then(data => { return data; });
    }

    /**
     *
     * Función para obtener intervinientes por buc
     * @param {*} buc
     * @param {*} ured
     * @param {*} ip
     * @param {*} session
     * @return {*} 
     * @memberof IntervinienteService
     */
    getIntervinientesbuc( buc: any, ured: any, ip: any, session:any ) {

        this._bearerToken.setBearerToken().subscribe( ( resp:any ) => { return resp } );

        let url = `${ this._conf.config.folio }/findIntervinientebybuc?buc=${buc}&usrRed=${ured}&ipClient=${ip}&conn=${session}`;
        let urlenc = encodeURI( url );

        return this._http.get( urlenc )
                .pipe(
                    map( ( resp:any ) => { return resp.data.interviniente } ),
                    catchError( (error: HttpErrorResponse) => {
                        return throwError(`${error.message}`);
                    })
                    )

    }

    /**
     *
     * Función para obtener los intervinietes 
     * @return {*}  {Interviniente}
     * @memberof IntervinienteService
     */
    generateInterviniente(): Interviniente {
        const interviniente: any =  {
            id: this.generateId(),
            nombre: this.generateName()
        };

        return interviniente;
    }

    /**
     *
     * Función para obtener documentos de un folio
     * @param {*} buc
     * @param {*} ured
     * @param {*} ip
     * @param {*} session
     * @return {*} 
     * @memberof IntervinienteService
     */
    getDocumentos( buc: any, ured: any, ip: any, session:any ) {

        this._bearerToken.setBearerToken().subscribe( ( resp:any ) => { return resp } );

        let url = `${ this._conf.config.folio }/findDocumentosbybuc?buc=${buc}&usrRed=${ured}&ipClient=${ip}&conn=${session}`;
        let urlenc = encodeURI( url );

        return this._http.get( urlenc )
        .pipe(
            retry(3),
            map( ( resp:any ) => { return resp.data.documentos } ),
            catchError( (error: HttpErrorResponse) => {
                return throwError(`${error.message}`);
            })
        )

    }

    /**
     *
     * Función para obtener documentos por folio
     * @param {*} folio
     * @param {*} foliocomp
     * @return {*} 
     * @memberof IntervinienteService
     */
    getDocumentosByFolio( data: any ) {

        this._bearerToken.setBearerToken().subscribe( ( resp:any ) => { return resp } );

        let url = `${ this._conf.config.folio }/findDocumentosbyfolioc`;
        let urlenc = encodeURI( url );

        return this._http.post( urlenc, data )
        .pipe(
            retry(3),
            map( ( resp:any ) => { return resp.data.documentos } ),
            catchError( (error: HttpErrorResponse) => {
                return throwError(`${error.message}`);
            })
        )

    }

    /**
     *
     * Función para obtener intervinientes por id
     * @param {*} idfolio
     * @param {*} usrRed
     * @param {*} ipClient
     * @param {*} session
     * @return {*} 
     * @memberof IntervinienteService
     */
    getIntervinientesById( idfolio: any, usrRed: any, ipClient: any, session: any ) {

        this._bearerToken.setBearerToken().subscribe( ( resp:any ) => { return resp } );

        let url = `${ this._conf.config.folio }/findIntevinientefoliobyid?idfolio=${idfolio}&usrRed=${usrRed}&ipClient=${ipClient}&conn=${session}`;
        let urlenc = encodeURI( url );

        return this._http.get( urlenc )
        .pipe(
            map( ( resp:any ) => { return resp.data.interviniente } ),
            catchError( (error: HttpErrorResponse) => {
                return throwError(`${error.message}`);
            })
        )

    }

    /**
     *
     * Funcion para gener id
     * @return {*} 
     * @memberof IntervinienteService
     */
    generateId() {
        let text = "";
        let possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
        
        for (let i = 0; i < 5; i++) {
            text += possible.charAt(Math.floor(Math.random() * possible.length));
        }
        
        return text;
    }

    /**
     *
     * Función para generar nombre
     * @return {*} 
     * @memberof IntervinienteService
     */
    generateName() {
        return this.intervinienteNames[Math.floor(Math.random() * Math.floor(30))];
    }

}