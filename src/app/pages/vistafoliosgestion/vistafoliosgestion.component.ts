import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { faFile, faMale } from '@fortawesome/free-solid-svg-icons';
import { DomSanitizer } from '@angular/platform-browser';
import { SecurityContext } from '@angular/core';
// Interface
import { Abogado, Region, Subrechazo, Tiporechazo } from '../../interfaces/catalogos.interface';
// Servicios
import { BearerTokenService } from 'src/app/servicios/bearer-token.service';
import { CatalogosService } from '../../servicios/catalogos.service';
import { DictaminacionService } from '../../servicios/dictaminacion.service';
import { GestionService } from '../../servicios/gestion.service';
import { IntervinienteService } from '../../servicios/intervinientes.service';
import { ProfileService } from '../../servicios/profile.service';
import { DictamenesService } from 'src/app/servicios/dictamenes.service';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-vistafoliosgestion',
  templateUrl: './vistafoliosgestion.component.html',
  styles: [
  ]
})
export class VistafoliosgestionComponent implements OnInit {

  faFile = faFile;

  faMale = faMale;

  displayModalP: boolean = false;

  isReady = true;

  id!: string;

  uid: string = '';

  rol!: any;

  buc!: string;

  razonSocial!: string;

  tipo_abog!: any;

  tipoabog!: string;

  foliodata!: any;

  idDictamen!: string;

  tipoDictamen!: string;

  idSubDictamen!: string;

  headertitulo!: string;

  region!: Region[];

  regiones: any;

  abogseg!: Abogado[];

  abogext!: Abogado[];

  filePDF!: any;

  filePDFv!: any;

  filenetBase64!: any;

  filename!: string;

  displayModalF: boolean = false;

  pdfSrc!: any;

  page: number = 1;

  totalPages: number = 0;

  isLoaded: boolean = false;

  arrayFiles!: any[];

  selectedarrayFiles!: any;

  apoderados!: any[];

  selectedapoderados!: any;

  comentarios!: any[];

  selectedcomentarios!: any;

  dataFiltersb!: any;

  regionid!: any;

  accion!: any;

  accionval!: any;

  aplicarechazoval!: any;

  aplica_rechazo!: any;

  tipo_rechazoval!: Tiporechazo[];

  tipo_rechazo!: any;

  subtipo_rechazoval!: Subrechazo[];

  subtipo_rechazo!: any;

  estatus_dict!: string;

  observaciones!: any;

  doc_consideraciones!: string;

  displayModalAd: boolean = false;

  messageModalM!: string;

  ipClient!: any;

  usrRed!: any;

  constructor( private _route: ActivatedRoute,
               private _router: Router,
               public _profile: ProfileService,
               private _gestion: GestionService,
               private _dictaminacion: DictaminacionService,
               private _dictamenes: DictamenesService,
               private _interviniente: IntervinienteService,
               private _catalogos: CatalogosService,
               private _bearerToken: BearerTokenService,
               private _cookieService: CookieService,
               private _sanitizer: DomSanitizer ) {

                this.dataFiltersb = {};

              }

  ngOnInit(): void {

    this._bearerToken.setBearerToken().subscribe( ( resp:any ) => { return resp } );
    
    this.obtenerPerfil();
    this.getRegion();
    this.getAbogadoSeg();

    this.aplicarechazoval  = [
                                  {
                                    "id": 0,
                                    "nombre": "SI",
                                  },
                                  {
                                    "id": 1,
                                    "nombre": "NO"
                                  }
                              ]

    this.accionval = [
                    {
                      "id": 0,
                      "nombre": "Publicar",
                    },
                    {
                      "id": 1,
                      "nombre": "Regresar a revisión"
                    }
                  ]

  }

  /**
   *
   * Metodo para obtener perfil del usuario
   * @return {*} 
   * @memberof VistafoliosgestionComponent
   */
  obtenerPerfil() {

    const localip = localStorage.getItem("ipC");
    this.ipClient = localip;

    if(!this._cookieService.get('cookie_INTRAMX-APPEB-SSO_DICTAMINACION') && !this._cookieService.get('iv_user')) {

        this.rol = localStorage.getItem('rol');

        let user = localStorage.getItem('usuario');
        let roluser = localStorage.getItem('roluser');

        return this._profile.getProfile( user, roluser, this.ipClient )
                  .subscribe( ( resp: any ) => {

                      this.uid = resp.userId;
                      
                      this.obtenerIdFolio();
                    
                  });

    } else {

        return this._profile.getProfileCookie( this.ipClient )
                    .subscribe( ( resp: any ) => {

                      this.uid = resp.userId;
                          
                      this.obtenerIdFolio();
                    
                  });

    } 

  }

  /**
   *
   * Metodo para obtener el id del folio
   * @memberof VistafoliosgestionComponent
   */
  obtenerIdFolio() {

    const localip = localStorage.getItem("ipC");
    this.ipClient = localip;
    const idfolio = this._route.snapshot.paramMap.get( 'idfolio' );
    const session = '';
    
    this._dictaminacion.getIdxFolio( idfolio, this.uid, this.ipClient, session )
                       .subscribe( ( resp:any ) => {
                         this.id = resp.beanRespuestaConsulta.beanComplementoRespuesta.id;
                         this.obtenerFolioDictamen( this.id );
                         this.obtenerIntervinientes();
                         this.obtenerComentarios( this.id );
                       })

  }

  /**
   *
   * Metodo para obtener el folio del dictamen
   * @param {string} id
   * @memberof VistafoliosgestionComponent
   */
  obtenerFolioDictamen( id: string ) {

    const localip = localStorage.getItem("ipC");
    this.ipClient = localip;
    const idfolio = id;
    const session = '';

    this._dictaminacion.getFolioDictamen( idfolio, this.uid, this.ipClient, session )
                       .subscribe( ( resp: any ) => {

                         this.foliodata = resp;
                         this.idDictamen = resp.beanFolio.idTipoDictamen;
                         this.idSubDictamen = resp.beanFolio.idTipoEmpresaFk;
                         this.buc = resp.beanFolio.buc;
                         this.razonSocial = resp.beanEmitirDictamen.nombreDenominacionRazonSocial;
                         this.estatus_dict = resp.beanFolio.estatusDict;
                         this.obtenerDocumentos();
                         this.validaTipoDictamen();
                         this.getAbogadoExt();

                        })

  }

  /**
   *
   * MEtodo par validar el tipo de dictamen
   * @memberof VistafoliosgestionComponent
   */
  validaTipoDictamen() {

    switch ( this.idDictamen ) {
      case '1':
        this.tipoDictamen = 'OPERACIONES BANCARIAS';
        break;
      case '2':
        this.tipoDictamen = 'GOBIERNO E INSTITUCIONES';
        break;
      case '3':
        this.tipoDictamen = 'ESPECIAL';
        break;
      case '4':
        this.tipoDictamen = 'DEVOLUCIÓN DE SALDO';
        break;
      case '5':
        this.tipoDictamen = 'FIDEICOMISO';
        break;
      case '6':
        this.tipoDictamen = 'PERSONA FÍSICA';
        break;
    }

  }

  /**
   *
   * OBtener los eventos de los inputs del formulario
   * @param {*} event
   * @param {string} field
   * @memberof VistafoliosgestionComponent
   */
  getData( event: any, field: string ) {

    this.dataFiltersb.busquedaFolio = "";
    this.dataFiltersb.comResNombreSolicitante = "";
    this.dataFiltersb.estado = "";
    this.dataFiltersb.buc = "";
    this.dataFiltersb.region = "";
    this.dataFiltersb.rzonSocial = "";

    switch ( field ) {
      case 'region':
        this.regionid = event.value.id;
        break;
      case 'abogado':
        this.dataFiltersb.abogado = event;
        break;
      case 'abogadoext':
        this.dataFiltersb.abogadoext = event;
        break;
      default:
        break;
    }

  }

  /**
   *
   * Obtener el total de paginas de la vista
   * @param {*} pdfData
   * @memberof VistafoliosgestionComponent
   */
  afterLoadComplete(pdfData: any) {
    this.totalPages = pdfData.numPages;
    this.isLoaded = true;
  }

  /**
   *
   * Metodo para obtener los documentos
   * @memberof VistafoliosgestionComponent
   */
  obtenerDocumentos() {

    const localip = localStorage.getItem("ipC");
    this.ipClient = localip;
    const session = "";

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

        }, (error) => {
          return error;
        });

  }

  /**
   *
   * Metodo para descargar archivos
   * @param {*} base64
   * @param {*} nombre
   * @memberof VistafoliosgestionComponent
   */
  descargarArchivo( base64: any, nombre:any, descrip: any ) {

    if( base64 === undefined ) {

      this.arrayFiles.forEach( (item: any) => {

        if( nombre === item.nombreDocumento && descrip === item.descripcionTipoDocumento) {
          let downloadBase64 = item.docBase64;
          const basefile = `data:application/pdf;base64,${downloadBase64}`;
          const link = document.createElement("a");
          link.href = basefile;
          link.download = `${nombre}`
          link.click();
        }
      });

    } else {

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

  }

  /**
   *
   * Metodo para obtener la vista del archivo
   * @param {*} codeb
   * @param {string} nombre
   * @memberof VistafoliosgestionComponent
   */
  previewArchivo( codeb: any, nombre: string, descrip: any ) {

    if( codeb === undefined ) {

      this.arrayFiles.forEach( (item: any) => {
        if( nombre === item.nombreDocumento && descrip === item.descripcionTipoDocumento) {
          
          this.filenetBase64 = item.docBase64;
          let filepb64 = 'data:application/pdf;base64,' + this.filenetBase64;
          this.filePDF =  this.filenetBase64;
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

        }
      });

    } else {

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

  }

  /**
   *
   * Metodo para obtener intervinientes
   * @memberof VistafoliosgestionComponent
   */
  obtenerIntervinientes() {

    const localip = localStorage.getItem("ipC");
    this.ipClient = localip;
    const idfolio = this.id;
    const session = "";

    this._interviniente.getIntervinientesById( idfolio, this.uid, this.ipClient, session )
        .subscribe( resp=> {

          this.apoderados = resp;
        })

  }

  /**
   *
   * Metodo para obtener comentarios
   * @param {*} id
   * @memberof VistafoliosgestionComponent
   */
  obtenerComentarios( id: any ) {
    
    const localip = localStorage.getItem("ipC");
    this.ipClient = localip;
    const idfolio = id;
    const session = "";

    this._dictaminacion.getComments( idfolio, this.uid, this.ipClient, session )
        .subscribe( ( resp:any ) => {

          this.comentarios = resp;
        })
        
  }

  /**
   *
   * Metodo para reasignar el dictamen de abog de seguimiento
   * @memberof VistafoliosgestionComponent
   */
  reasignarDictamenSeg() {

    const localip = localStorage.getItem("ipC");
    this.ipClient = localip;

    const data = {
                      "idDictamen": this.id,
                      "idAbogSeg": this.dataFiltersb.abogado.value,
                      "idAbogSegAnt": this.foliodata.beanAbogadoSeguimiento.idAbogSeg,
                      "idAbogExt": this.foliodata.beanAbogadoExterno.idAbogExt,
                      "region": this.regionid,
                      "usrRed": this.uid,
                      "ipClient": this.ipClient,
                      "conn": ""
                  }

     this._gestion.reasignarDictamenSeg( data )
        .subscribe( ( resp:any ) => {
            this.displayModalAd = true;
            this.messageModalM = 'Se reasigno correctamente el folio' + ' ' + this.valcomplement();
        });

  }

  /**
   *
   * Metodo para reasignar dictamen de abog externo
   * @memberof VistafoliosgestionComponent
   */
  reasignarDictamenExt() {

    const localip = localStorage.getItem("ipC");
    this.ipClient = localip;

    const data = {
                      "idDictamen": this.id,
                      "idAbogExt": this.dataFiltersb.abogadoext.value,
                      "region": "",
                      "usrRed": this.uid,
                      "ipClient": this.ipClient,
                      "conn": ""
                  }
 
    this._gestion.reasignarDictamenExt( data )
        .subscribe( ( resp:any ) => {
            this.displayModalAd = true;
            this.messageModalM = 'Se reasigno correctamente el folio' + ' ' + this.valcomplement()
        }, (error: any) => {
            this.displayModalAd = true;
            this.messageModalM =  error.error ? error.error.errors[0].message: 'Error al reasignar el folio' + ' ' + this.valcomplement()
        });
  }

  /**
   *
   * Metodo para validar complemento
   * @return {*} 
   * @memberof VistafoliosgestionComponent
   */
  valcomplement() {
    if ("complemento" in this.foliodata.beanFolio) {
        return this.foliodata.beanFolio.complemento;
    } else {
        return this.foliodata.beanFolio.folio;
    }
  }

  /**
   *
   * Metodo para descargar el dictamen en pdf
   * @memberof VistafoliosgestionComponent
   */
  downloadFileDict() {

    let sanitizedBase: any = '';
    let fileName = 'OperacionesBancarias';

    const basefile = `data:application/pdf;base64,${this.filePDF}`;
    const link = document.createElement("a");
    sanitizedBase = this._sanitizer.sanitize(SecurityContext.HTML, basefile)
    link.href = sanitizedBase
    link.download = `${fileName}.pdf`
    link.click();

  }

  /**
   *
   * Metodo para obtener el subtipo de rechazo
   * @memberof VistafoliosgestionComponent
   */
  obtenerSubTipoRechazo() {

    const id = this.dataFiltersb.tipo_rechazo;

     this._catalogos.getSubtipoRipoRechazo( id )
        .subscribe( ( resp: any ) => {
          
          this.subtipo_rechazoval = resp;
          return resp;
        
        })
  }

  /**
   *
   * Metodo para obtener la region
   * @memberof VistafoliosgestionComponent
   */
  getRegion() {
    this._catalogos.getRegion()
        .subscribe( ( resp:any ) => {
          this.region = resp;
        })
  }

  /**
   *
   * Metodo para obtener los abogados de seguiiento
   * @memberof VistafoliosgestionComponent
   */
  getAbogadoSeg() {

    this._catalogos.getAbogadodeSeguimiento()
        .subscribe( ( resp:any ) => {
          this.abogseg = resp;
        })
  }

  /**
   *
   * Metodo para obtener los abogados externos
   * @memberof VistafoliosgestionComponent
   */
  getAbogadoExt() {

    this._catalogos.getAbogadoExterno( this.idDictamen )
        .subscribe( ( resp:any ) => {
          this.abogext = resp;
        })
  }

  /**
   *
   * Despliega modal
   * @memberof VistafoliosgestionComponent
   */
  dictaminar() {
    this.displayModalP = true;
  }

  /**
   *
   * Cierra modal
   * @memberof VistafoliosgestionComponent
   */
  closeModal() {
    this.displayModalP = false;
  }

  /**
   *
   * Cierra modal auxiliar
   * @memberof VistafoliosgestionComponent
   */
  cerrarDialogF() {
    this.pdfSrc = "";
    this.displayModalF = false
  }

  /**
   *
   * Siguiente pagina de prevista de pdf
   * @memberof VistafoliosgestionComponent
   */
  nextPage() {
    this.page++;
  }

  /**
   *
   * Pagina anterior de prevista de pdf
   * @memberof VistafoliosgestionComponent
   */
  prevPage() {
    this.page--;
  }

  /**
   *
   * Cierra modal
   * @memberof VistafoliosgestionComponent
   */
  closeAvisoModal() {
    this.displayModalAd = false;

    this._router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
      this._router.navigate(['/gestiondiaria']);
    });
  }

}
