import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { FilesData } from 'src/app/interfaces/files.interface';
import { DomSanitizer } from '@angular/platform-browser';
import { SecurityContext } from '@angular/core';

import { faMale } from '@fortawesome/free-solid-svg-icons';
import { faHandsHolding } from '@fortawesome/free-solid-svg-icons';
import { faUniversity } from '@fortawesome/free-solid-svg-icons';
import { faFile } from '@fortawesome/free-solid-svg-icons';
import { faMoneyCheck, IconDefinition } from '@fortawesome/free-solid-svg-icons';
import { Subrechazo, Tiporechazo } from '../../interfaces/catalogos.interface';

import { DictaminacionService } from '../../servicios/dictaminacion.service';
import { DictamenesService } from '../../servicios/dictamenes.service';
import { IntervinienteService } from '../../servicios/intervinientes.service';
import { CatalogosService } from '../../servicios/catalogos.service';
import { BearerTokenService } from 'src/app/servicios/bearer-token.service';


@Component({
  selector: 'app-dictaminacion',
  templateUrl: './dictaminacion.component.html',
  styles: [
  ]
})
export class DictaminacionComponent implements OnInit {

  @Input() iconoDictamen: IconDefinition | undefined;

  faUniversity = faUniversity;

  faFile = faFile;

  faHandsHolding = faHandsHolding;

  faMale = faMale;

  displayModalP = false;

  displayModalDict = false;

  isReady = true;

  id!: string;

  idDocDict!: any;

  tipo_abog!: any;

  tipoabog!: string;

  foliodata!: any;

  validatedFolio!: any;

  buc!: string;

  idDictamen!: string;

  idSubDictamen!: string;

  tipoDictamen!: string;

  headertitulo!: string;

  razonSocial!: string;

  filePDF!: any;

  filePDFv!: any;

  filename!: string;

  dictamenName!: any;

  displayModalF = false;

  pdfSrc!: any;

  page = 1;

  totalPages = 0;

  isLoaded = false;

  arrayFiles!: any[];

  resultado!: any;

  selectedarrayFiles!: any;

  apoderados!: any[];

  selectedapoderados!: any;

  comentarios!: any[];

  selectedcomentarios!: any;

  dataFiltersb!: any;

  accion!: any;

  accionval!: any;

  docsResult!: any;

  docsresult!: any;

  aplicarechazoval!: any;

  aplica_rechazo!: any;

  tipo_rechazoval!: Tiporechazo[];

  tipo_rechazo!: any;

  comentarios_rech!: string;

  subtipo_rechazoval!: Subrechazo[];

  subtipo_rechazo!: any;

  estatus_dict!: string;

  observaciones!: any;

  doc_consideraciones!: string;

  displayModalAd = false;

  displayModalIA = false;

  messageModalM!: string;

  messageModalMdict!: string;

  priorizar!: any;

  ipClient: any;

  usrRed: any;

  isActualVal: any;

  confirmPrioritize : boolean = false;
  
  formTableArray!: FormGroup;

  tiporechazoval: Array<any> = [];

  subReasonsTypes: Array<any> = [];

  constructor( private _route: ActivatedRoute,
               private _router: Router,
               private _formBuilder: FormBuilder,
               private _dictaminacion: DictaminacionService,
               private _dictamenes: DictamenesService,
               private _interviniente: IntervinienteService,
               private _catalogos: CatalogosService,
               private _bearerToken: BearerTokenService,
               private _sanitizer: DomSanitizer ) {

                this.dataFiltersb = {};
                this.initializeForm();
              }

  ngOnInit(): void {

    this._bearerToken.setBearerToken().subscribe( ( resp:any ) => { return resp } );
    
    this.obtenerIdFolio();
    this.getRejectType("", 0);

    this.aplicarechazoval  = [
            { "id": 0,  "nombre": "SI" },
            { "id": 1, "nombre": "NO" }
        ]

    this.accionval = [
          { "id": 0, "nombre": "Publicar", },
          { "id": 1,  "nombre": "Regresar a revisión"  }
        ]

    this.docsresult = [
          { "id": 1, "nombre": "Dictaminado" },
          { "id": 2, "nombre": "Rechazado" },
          { "id": 3, "nombre": "N/A" }
        ]

    localStorage.setItem('previousUrl', 'dictaminacion');

  }

  private initializeForm(): void {
    this.formTableArray = this._formBuilder.group({
      dictamenes: this._formBuilder.array([])
    });

  }

  obtenerIdFolio() {

    const localip = localStorage.getItem("ipC");
    this.usrRed = localStorage.getItem("uId");
    this.ipClient = localip;

    const idfolio = this._route.snapshot.paramMap.get( 'folio' );
    const session = '';

    this.tipo_abog = localStorage.getItem('rol');

    this._dictaminacion.getIdxFolio( idfolio, this.usrRed, this.ipClient, session )
                       .subscribe( ( resp:any ) => {
                         this.id = resp.beanRespuestaConsulta.beanComplementoRespuesta.id;
                         this.obtenerFolioDictamen( this.id );
                         this.obtenerIntervinientes();
                         this.obtenerComentarios( this.id );
                       })

  }

  obtenerFolioDictamen( id: string ) {

    const localip = localStorage.getItem("ipC");
    const idfolio = id;
    const session = '';
    this.ipClient = localip;
    this.usrRed = localStorage.getItem("uId");
    

    this._dictaminacion.getFolioDictamen( idfolio, this.usrRed, this.ipClient, session )
                       .subscribe( ( resp: any ) => {
                          this.foliodata = resp;
                          this.idDictamen = resp.beanFolio.idTipoDictamen;
                          this.idSubDictamen = resp.beanFolio.idTipoEmpresaFk;
                          this.buc = resp.beanFolio.buc;
                          this.estatus_dict = resp.beanFolio.estatusDict;
                          this.priorizar = resp.beanFolio.prioridad;
                          this.razonSocial = resp.beanBusqueda.razonSocial;
                          this.obtenerDocumentos();
                          this.validaTipoDictamen();
                          this.validateDict();
                          this.valcomplement();
                          this.obtenerTipoRechazo();
                        })
                        
  }

  validaTipoDictamen() {

    switch ( this.idDictamen ) {
      case '1':
        this.tipoDictamen = 'OPERACIONES BANCARIAS';
        this.iconoDictamen = faMoneyCheck;
        this.headertitulo = 'Dictamen Jurídico de Operaciones Bancarias en General';
        break;
      case '2':
        this.tipoDictamen = 'GOBIERNO E INSTITUCIONES';
        this.iconoDictamen = faUniversity;
        break;
      case '3':
        this.tipoDictamen = 'ESPECIAL';
        this.iconoDictamen = faFile;
        this.headertitulo = 'Dictamen Jurídico Especial';
        break;
      case '4':
        this.tipoDictamen = 'DEVOLUCIÓN DE SALDO';
        this.iconoDictamen = faHandsHolding;
        this.headertitulo = 'Dictamen Jurídico de Devolución de Saldos por Fallecimiento';
        break;
      case '5':
        this.tipoDictamen = 'FIDEICOMISO';
        this.iconoDictamen = faHandsHolding;
        this.headertitulo = 'Dictamen Fideicomiso';
        break;
      case '6':
        this.tipoDictamen = 'PERSONA FÍSICA';
        this.iconoDictamen = faMale;
        break;
    }

  }
  
  getData( event: any, field: string ) {
    
    switch ( field ) {
      case 'aplica_rechazo':
        this.dataFiltersb.aplica_rechazo = event.value;

        if( this.dataFiltersb.aplica_rechazo === 1 ) {
          this.isActual();
        }

        break;
      case 'tipo_rechazo':
        this.dataFiltersb.tipo_rechazo = event.value;
        this.obtenerSubTipoRechazo();
        break;
      case 'subtipo_rechazo':
        this.dataFiltersb.subtipo_rechazo = event.value;
        break;
      case 'accionval':
        this.dataFiltersb.accionval = event.value;
        break;
      case 'observaciones':
        this.doc_consideraciones = event;
        break;
      default:
        break;
    }

  }

  afterLoadComplete(pdfData: any) {
    this.totalPages = pdfData.numPages;
    this.isLoaded = true;
  }

  descargarDictamen() {

    const localip = localStorage.getItem("ipC");
    this.usrRed = localStorage.getItem("uId");
    this.ipClient = localip;

    const data = {
                    "idDictamen": this.idDictamen,
                    "tipoSubDict": this.idSubDictamen === "" ? '0' : this.idSubDictamen,
                    "razonSocial": this.razonSocial,
                    "idSolicitud":this.id,
                    "folio": this.foliodata.beanFolio.folio,
                    "buc" : this.buc,
                    "ip": this.ipClient,
                    "usrRed": this.usrRed,
                    "conn": ""
    }

    switch ( this.idDictamen ) {
      case '1':

        this._dictamenes.getDictamentOPBancPDF( data )
            .subscribe( ( resp: any ) => {
                
                let filepb64 = 'data:application/pdf;base64,' + resp.base64;
                this.filePDF =  resp.base64;
                this.displayModalF = true;

                this.getbase64( filepb64 );
            
            });

        break;
      case '2':

        this._dictamenes.getDictamenGobeInstPDF( data )
        .subscribe( ( resp: any ) => {
            
            let filepb64 = 'data:application/pdf;base64,' + resp.base64;
            this.filePDF =  resp.base64;
            this.displayModalF = true;

            this.getbase64( filepb64 );
        
        });
      
        break;
      case '3':

        this._dictamenes.getDictamentEspPDF( data )
        .subscribe( ( resp: any ) => {
             
             let filepb64 = 'data:application/pdf;base64,' + resp.base64;
             this.filePDF =  resp.base64;
             this.displayModalF = true;

             this.getbase64( filepb64 );
        
         });

        break;
      case '4':

        this._dictamenes.getDictamentDevSalPDF( data )
        .subscribe( ( resp: any ) => {
            
            let filepb64 = 'data:application/pdf;base64,' + resp.base64;
            this.filePDF =  resp.base64;
            this.displayModalF = true;

            this.getbase64( filepb64 );
        
        });

        break;
      case '5':

        this._dictamenes.getDictamenFideicomisoPDF( data )
        .subscribe( ( resp: any ) => {
            
            let filepb64 = 'data:application/pdf;base64,' + resp.base64;
            this.filePDF =  resp.base64;
            this.displayModalF = true;

            this.getbase64( filepb64 );
        
        });

        break;
      case '6':

        this._dictamenes.getDictamenPerFisPDF( data )
        .subscribe( ( resp: any ) => {
            
            let filepb64 = 'data:application/pdf;base64,' + resp.base64;
            this.filePDF =  resp.base64;
            this.displayModalF = true;

            this.getbase64( filepb64 );
        
        });

        break;

    }

  }

  validateDict() {

    const localip = localStorage.getItem("ipC");
    this.ipClient = localip;
    this.usrRed = localStorage.getItem("uId");

    const data = {
          "idDictamen": this.idDictamen,
          "tipoSubDict": this.idSubDictamen === "" ? '0' : this.idSubDictamen,
          "razonSocial": this.razonSocial,
          "idSolicitud":this.id,
          "folio": this.foliodata.beanFolio.folio,
          "buc" : this.buc,
          "ip": this.ipClient,
          "usrRed": this.usrRed,
          "conn": ""
    }

    switch ( this.idDictamen ) {
      case '1':
        
        this._dictamenes.getDictamentOPBancPDF( data )
            .subscribe( resp => {
              this.filePDFv = resp.base64;
              this.dictamenName = resp.dictamen;
            }, (error) => {
               this.filePDFv = error.error.errors[0].message
            });

        break;
      case '2':
        
        this._dictamenes.getDictamenGobeInstPDF( data )
            .subscribe( resp => {
              this.filePDFv = resp.base64;
              this.dictamenName = resp.dictamen;
            }, (error) => {
               this.filePDFv = error.error.errors[0].message
            });

        break;
      case '3':
        
        this._dictamenes.getDictamentEspPDF( data )
            .subscribe( resp => {
              this.filePDFv = resp.base64;
              this.dictamenName = resp.dictamen;
            }, (error) => {
              this.filePDFv = error.error.errors[0].message
           });

        break;
      case '4':
        
        this._dictamenes.getDictamentDevSalPDF( data )
            .subscribe( resp => {
              this.filePDFv = resp.base64;
              this.dictamenName = resp.dictamen;
            }, (error) => {
              this.filePDFv = error.error.errors[0].message
           });

        break;
      case '5':
        
        this._dictamenes.getDictamenFideicomisoPDF( data )
            .subscribe( resp => {
              this.filePDFv = resp.base64;
              this.dictamenName = resp.dictamen;
            }, (error) => {
              this.filePDFv = error.error.errors[0].message
            });

        break;
      case '6':
        
        this._dictamenes.getDictamenPerFisPDF( data )
            .subscribe( resp => {
              this.filePDFv = resp.base64;
              this.dictamenName = resp.dictamen;
            }, (error) => {
              this.filePDFv = error.error.errors[0].message
           });

        break;

    }

  }

  obtenerDocumentos() {

    const localip = localStorage.getItem("ipC");
    this.ipClient = localip;
    this.usrRed = localStorage.getItem("uId");

    const data = {
                      "folio": this.foliodata.beanFolio.folio,
                      "folioComp": this.foliodata.beanFolio.complemento !== undefined ? this.foliodata.beanFolio.complemento : "",
                      "tipoDict": this.idDictamen,
                      "tipoSubDict": this.idSubDictamen,
                      "buc": this.buc,
                      "razonSocial": this.razonSocial,
                      "ipClient": this.ipClient,
                      "usrRed": this.usrRed,
                      "conn":""
                  }

    this._interviniente.getDocumentosByFolio( data )
        .subscribe( resp => {

          this.arrayFiles = resp;
          
          this.subReasonsTypes = resp.map((item: any) => ([]));
          
          const arrayForm = this.formTableArray.controls.dictamenes as FormArray;

          this.arrayFiles.forEach((item: any, index: number) => {
 
            arrayForm.push(this.getFormItemArray(item, index));
            
          });

        }, (error) => {
          return error;
        });

  }

  valcomplement() {
    if (this.foliodata.beanFolio.complemento !== "") {
        this.validatedFolio = this.foliodata.beanFolio.complemento;
    } else {
      this.validatedFolio = this.foliodata.beanFolio.folio;
    }
  }

  private getFormItemArray(item: FilesData, rowIndex: number): FormGroup {

    if (item.idTipoRechazo && item.idTipoRechazo.length > 0) {
      this.getRejectType(item.idTipoRechazo, rowIndex);
      this.getSubReasonType(item.idTipoRechazo, rowIndex);
    }
    
    return this._formBuilder.group(
      {
        resultado: item.resultado,
        comentario: item.comentario,
        descRechazo: [{ value: item.descRechazo, disabled: item.resultado !== 'Rechazado' ? true : false }],
        descSubRechazo: [{ value: item.descSubRechazo, disabled: item.resultado !== 'Rechazado' ? true : false || item.descRechazo && item.descRechazo.length > 0 ? false : true}],
        descripcionTipoDocumento: item.descripcionTipoDocumento,
        nombreDocumento: item.nombreDocumento
      }
    );
  }

  descargarArchivo( base64: any, nombre:any ) {

    this._dictamenes.getBase64FileNet( base64, nombre )
        .subscribe( resp => {

          let sanitizedBase: any = '';
          let downloadBase64 = resp.docBase64;
          const basefile = `data:application/pdf;base64,${downloadBase64}`;
          const link = document.createElement("a");
          sanitizedBase = this._sanitizer.sanitize(SecurityContext.HTML, basefile)
          link.href = sanitizedBase
          link.download = `${nombre}`
          link.click();

        }, (error) => {
          return error;
        });
  }

  previewArchivo( codeb: any, nombre: string ) {

    this._dictamenes.getBase64FileNet( codeb, nombre )
        .subscribe( resp => {
          let filenetBase64 = resp.docBase64;
          let filepb64 = 'data:application/pdf;base64,' + filenetBase64;
          this.filePDF =  filenetBase64;
          this.displayModalF = true;

          const b64toUrl = async (base64Data: any) => {
            const r = await fetch(base64Data);
            const blob = await r.blob();
            return blob
          }
          const load = async () => {
          
            const pdfvew = await b64toUrl(filepb64);
            if (typeof (FileReader) !== 'undefined') {
            
              const reader = new FileReader();
              reader.readAsDataURL(pdfvew);
              reader.onload = (e: any) => {
                this.pdfSrc = e.target.result;
                
              };

            }

          }
          load();

        }, (error) => {
          return error;
        });

  }

  obtenerIntervinientes() {

    const localip = localStorage.getItem("ipC");
    this.ipClient = localip;
    this.usrRed = localStorage.getItem("uId");

    const idfolio = this.id;
    const session = "";

    this._interviniente.getIntervinientesById( idfolio, this.usrRed, this.ipClient, session )
        .subscribe( resp=> {

          this.apoderados = resp;
          
        })

  }

  isActual() {

    const localip = localStorage.getItem("ipC");
    this.ipClient = localip;

    const dataLast = {

      "idDictamen": this.idDictamen,
      "tipoSubDict": this.idSubDictamen === "" ? '0' : this.idSubDictamen,
      "razonSocial": this.razonSocial,
      "idSolicitud": this.id,
      "folio": this.foliodata.beanFolio.folio,
      "buc": this.buc,
      "ip": this.ipClient,
      "usrRed": this.usrRed,
      "conn": ""

    }

    this._dictamenes.getLastDict( dataLast )
        .subscribe( resp => {

          this.isActualVal = resp.isInformacionActual;
          
          if( this.isActualVal !== '1' ) {
            this.displayModalIA = true;
            this.messageModalM = 'Debe guardar la información del dictamen para continuar';  
          }

        });
  }

  obtenerComentarios( id: any ) {

    const localip = localStorage.getItem("ipC");
    this.ipClient = localip;
    this.usrRed = localStorage.getItem("uId");
    
    const idfolio = id;
    const session = "";

    this._dictaminacion.getComments( idfolio, this.usrRed, this.ipClient, session )
        .subscribe( ( resp:any ) => {

          this.comentarios = resp;
          
        })
        
  }

  validateResultItem(value: string, rowIndex: number): void {

    let arrayFiles = this.formTableArray.controls.dictamenes as FormArray;

    if (value !== 'Rechazado') {
      arrayFiles.at(rowIndex).get('descRechazo')?.disable();
      arrayFiles.at(rowIndex).get('descSubRechazo')?.disable();
      this.subReasonsTypes[rowIndex] = [];
      this.tiporechazoval[rowIndex] = [];
    } else {
      arrayFiles.at(rowIndex).get('descRechazo')?.enable();
      this.getRejectType(value, rowIndex);
      
    }
    
  }

  validateRejectionReason(value: string, rowIndex: number): void {

    let arrayFiles = this.formTableArray.controls.dictamenes as FormArray;
    if (value.length > 0) {
      this.idDocDict = this.tiporechazoval[rowIndex].find((item:any) => item.nombre === value)?.id;
      this.getSubReasonType(this.idDocDict, rowIndex);
      arrayFiles.at(rowIndex).get('descSubRechazo')?.enable();
    } else {
      arrayFiles.at(rowIndex).get('descSubRechazo')?.disable();
    }
  }

  private getRejectType(id: string, rowIndex: number): void {
    this._catalogos.getRipoRechazo()
        .subscribe( ( resp: any ) => {
          this.tiporechazoval[rowIndex] = resp;
        })
  }

  private getSubReasonType(id: string, rowIndex: number): void  {
     this._catalogos.getSubtipoRipoRechazo( id )
        .subscribe( ( resp: any ) => {
          this.subReasonsTypes[rowIndex] = resp;
        });
  }

  saveDictDocts( id: any, rowIndex: number) {

    const arrayFiles = this.formTableArray.controls.dictamenes as FormArray;
    const idTipoRechazo: any = arrayFiles.at(rowIndex).get('descRechazo')?.value.length > 0 ? this.tiporechazoval[rowIndex].find((item:any) => item.nombre === arrayFiles.at(rowIndex).get('descRechazo')?.value)?.id : '';
    const idSubTipoRechazo: any = arrayFiles.at(rowIndex).get('descSubRechazo')?.value.length > 0 ? this.subReasonsTypes[rowIndex].find((item: any) => item.nombre === arrayFiles.at(rowIndex).get('descSubRechazo')?.value)?.id : '';

    const localip = localStorage.getItem("ipC");
    this.ipClient = localip;
    this.usrRed = localStorage.getItem("uId");

    const data = {

      "documento":{
                     "idSolicitud": id,
                     "idTipoRechazo": idTipoRechazo === undefined ? '' : idTipoRechazo,
                     "idTipoSubRechazo": idSubTipoRechazo === undefined ? '' : idSubTipoRechazo,
                     "comentario": arrayFiles.at(rowIndex).get('comentario')?.value,
                     "resultado": arrayFiles.at(rowIndex).get('resultado')?.value,
                  },
            "ipClient": this.ipClient,
            "conn":"",
            "usrRed": this.usrRed
      }

      this._dictaminacion.saveDocsDictaminados( data )
          .subscribe((resp:any) => {
            this.messageModalMdict = 'Documento dictaminado correctamente';
            this.displayModalDict = true;
          }, (err) => {
          this.messageModalMdict = err.error.errors[0].message;
          this.displayModalDict = true;
        });

  }

  publicarDictamen() {

    if( this.tipo_abog === 'Abogado externo' ) {
      this.tipoabog = 'EXT';
    } else if( this.tipo_abog === 'Abogado de seguimiento' ) {
      this.tipoabog = 'SEG';
    }

    const localip = localStorage.getItem("ipC");
    this.ipClient = localip;
    this.usrRed = localStorage.getItem("uId");

    const data = {
                    "idDict": this.id,
                    "idSubDict": this.idSubDictamen === "" ? '0' : this.idSubDictamen,
                    "folio": this.foliodata.beanFolio.folio,
                    "buc": this.buc,
                    "tipoAbog": this.tipoabog,
                    "idTipoDictamen": this.foliodata.beanFolio.idTipoDictamen,
                    "comentario": this.doc_consideraciones,
                    "razonSocial": this.razonSocial,
                    "ipClient": this.ipClient,
                    "usrRed": this.usrRed,
                    "conn":""
    }

    this._dictaminacion.publicDictamen( data )
        .subscribe( ( resp:any ) => {
            this.displayModalAd = true;
            this.messageModalM = 'Se publicó correctamente el folio' + ' ' + this.validatedFolio;
        }, (error: any) => {
          this.messageModalM =  error.error ? error.error.errors[0].message: 'Error al publicar.';
          this.displayModalAd = true;
        });

  }

  rechazarDictamen() {

    this.aplica_rechazo = this.dataFiltersb.aplica_rechazo === 0 ? this.aplica_rechazo = "0" : this.aplica_rechazo = "1";
    
    if( this.tipo_abog === 'Abogado externo' ) {
      this.tipoabog = 'EXT';
    } else if( this.tipo_abog === 'Abogado de seguimiento' ) {
      this.tipoabog = 'SEG';
    }

    const localip = localStorage.getItem("ipC");
    this.ipClient = localip;
    this.usrRed = localStorage.getItem("uId");

    const data = {
                    "rechazoAbogadoExt": this.aplica_rechazo,
                    "idTipoRechazo": this.dataFiltersb.tipo_rechazo,
                    "idSubTipoRechazo": this.dataFiltersb.subtipo_rechazo,
                    "comentarioRechazo": this.doc_consideraciones,
                    "id": this.id,
                    "tipoAbog":  this.tipoabog,
                    "ipClient": this.ipClient,
                    "usrRed": this.usrRed,
                    "conn":"",
                    "abogSeg":"",
                    "abogExt":"",
                    "banca":"",
                    "centroCostos":"",
                    "codigoEstado":"",
                    "codigoEstadoDictamen":"",
                    "codigoEstadoPorRol":"",
                    "comentarioFinal":"",
                    "complemento":"",
                    "comReingreso":"",
                    "correo":"",
                    "estatus":"",
                    "fechaCompromiso":"",
                    "fechaRegistro":"",
                    "folio":"",
                    "folioOrigen":"",
                    "idRolActual":"",
                    "idRolAnterior":"",
                    "idTipoReingreso":"",
                    "nombreDenRaz":"",
                    "numComp":"",
                    "origen":"",
                    "rechazoFinal":"",
                    "region":"",
                    "rolActual":"",
                    "solicitante":"",
                    "subRechazoFinal":"",
                    "sucursal":"",
                    "tel":"",
                    "tipoReingreso":"",
                    "zona":"",
                    "tipoDict":"",
                    "tipoFolio":"",
                    "buc":""
    }

    this._dictaminacion.rejectDictamen( data )
        .subscribe( ( resp:any ) => {
            this.displayModalAd = true;
            this.messageModalM = 'Se envió correctamente el rechazo del folio' + ' ' + this.validatedFolio;
        }, (error: any) => {
          this.messageModalM =  error.error ? error.error.errors[0].message: 'Error al rechazar.';
          this.displayModalAd = true;
        });

  }

  acceptPrioritize() {

    const localip = localStorage.getItem("ipC");
    this.ipClient = localip;
    this.usrRed = localStorage.getItem("uId");

    const data = {
                      "idfolio": this.id,
                      "ipClient": this.ipClient,
                      "conn":"",
                      "usrRed": this.usrRed,
                      "prioridad": 1
                  }

    this._dictaminacion.updtFolioPrioridad( data )
        .subscribe(( resp:any ) => {
          this.confirmPrioritize = false;
        })

  }

  downloadFileDict() {
    
    let sanitizedBase: any = '';
    let fileName = 'documentopreview';

    const basefile = `data:application/pdf;base64,${this.filePDF}`;
    const link = document.createElement("a");
    sanitizedBase = this._sanitizer.sanitize(SecurityContext.HTML, basefile)
    link.href = sanitizedBase
    link.download = `${fileName}.pdf`
    link.click();

  }

  obtenerTipoRechazo() {
    this._catalogos.getRipoRechazo()
        .subscribe( ( resp: any ) => {
          this.tipo_rechazoval = resp;
        })
  }

  obtenerSubTipoRechazo() {

    const id = this.dataFiltersb.tipo_rechazo;

     this._catalogos.getSubtipoRipoRechazo( id )
        .subscribe( ( resp: any ) => {
          
          this.subtipo_rechazoval = resp;
          return resp;
        
        })
  }

  getbase64( filepb64: any ) {

    const b64toUrl = async (base64Data: any) => {
      const r = await fetch(base64Data);
      const blob = await r.blob();
      return blob
    }
    const load = async () => {
      
      const pdfvew = await b64toUrl(filepb64);
      if (typeof (FileReader) !== 'undefined') {
      
        const reader = new FileReader();
        reader.readAsDataURL(pdfvew);
        reader.onload = (e: any) => {
          this.pdfSrc = e.target.result;
          
        };

      }

    }

    load();

  }

  dictaminar() {
    this.displayModalP = true;
  }

  closeModal() {
    this.displayModalP = false;
  }

  closeModalDict() {
    this.displayModalDict = false;
  }

  ejecutePrioritize() {
    this.confirmPrioritize = true;
  }

  closeDialogPrioritize() {
    this.priorizar = null;
    this.confirmPrioritize = false;
  }

  cerrarDialogF() {
    this.pdfSrc = "";
    this.displayModalF = false
  }

  nextPage() {
    this.page++;
  }

  prevPage() {
    this.page--;
  }

  closeAvisoModal() {
    this.displayModalAd = false;

    this._router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
      this._router.navigate(['/solicitudes']);
    });
  }

  closeIAModal() {
    this.displayModalIA = false;
    this.messageModalM = "";
  }

}
