import { Input } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IconDefinition } from '@fortawesome/free-solid-svg-icons';
import { DomSanitizer } from '@angular/platform-browser';
import { SecurityContext } from '@angular/core';
// Intarfaces
import { Cattipodict } from '../../interfaces/catalogos.interface';
// Servicios
import { CookieService } from 'ngx-cookie-service';
import { BearerTokenService } from 'src/app/servicios/bearer-token.service';
import { DictamenesService } from '../../servicios/dictamenes.service';
import { DictaminacionService } from '../../servicios/dictaminacion.service';
import { IntervinienteService } from '../../servicios/intervinientes.service';
import { ProfileService } from '../../servicios/profile.service';

@Component({
  selector: 'app-foliodetalle',
  templateUrl: './foliodetalle.component.html',
  styles: [
  ]
})
export class FoliodetalleComponent implements OnInit {

  @Input() iconoDictamen: IconDefinition | undefined;

  nombre!: string;

  apellidoP!: string;

  uid!: string;

  rol!: any;

  region!: string;

  folio!: string;

  idfolio!: string;

  public complemento!: string;

  fechaRegistro!: string;

  fechaactual: any;

  solicitante: any;

  sucursal!: string;

  cc: number = 0;

  foliodata!: any;

  tel!: string;

  correo!: string;

  fechaEnvio!: string;

  abogSeg!: string;

  origen!: string;

  razonSocial!: string;

  estatus!: string;

  centroCosto!: string;

  buc!: string;

  idDictamen!: string;

  idSubDictamen!: string;

  tipoFolio!: string;

  id!: string;

  filePDFv!: any;

  filePDF!: any;

  filenetBase64!: any;

  pdfSrc!: any;

  apoderados!: any[];

  selectedapoderados!: any;

  idSubTipoRchz!: any;

  comentario!: any;

  comentarioSeg!: any;

  comentarioExt!: any;

  comentarioSol!: any;

  comentarios!: any[];

  idTipoComentarioRchz!: any;

  selectedcomentarios!: any;

  arrayFiles!: any[];

  selectedarrayFiles!: any;

  tipodictamenes!: Cattipodict;

  page: number = 1;

  totalPages: number = 0;

  isLoaded: boolean = false;

  displayModalP: boolean = false;

  displayModalF: boolean = false;

  extrolname!: string;

  segname!: string;

  solname!: string;

  adminname!: string;

  ipClient: any;

  usrRed: any;

  displayModalM = false;

  headerModalM!: string;

  messageModalM!: string;

  constructor( private _dictaminacion: DictaminacionService,
               private _route: ActivatedRoute,
               public _router:  Router,
               public _profile: ProfileService,
               private _dictamenes: DictamenesService,
               private _interviniente: IntervinienteService,
               private _bearerToken: BearerTokenService,
               private _cookieService: CookieService,
               private _sanitizer: DomSanitizer ) { }

  ngOnInit(): void {

    this._bearerToken.setBearerToken().subscribe( ( resp:any ) => { return resp } );

    this.obtenerPerfil();

    localStorage.setItem('previousUrl', 'foliodetalle');

  }

  obtenerPerfil() {

    const localip = localStorage.getItem("ipC");
    this.ipClient = localip;

    if(!this._cookieService.get('cookie_INTRAMX-APPEB-SSO_DICTAMINACION') && !this._cookieService.get('iv_user')) {

        let user = localStorage.getItem('usuario');
        let roluser = localStorage.getItem('roluser'); //id de abogado
        
        return this._profile.getProfile( user, roluser, this.ipClient )
                  .subscribe( ( resp: any ) => {

                      this.uid = resp.userId;
                      this.rol = localStorage.getItem('rol'); //Nombre del rol
                      this.extrolname = 'Abogado externo';
                      this.segname = 'Abogado de seguimiento';
                      this.solname = 'Solicitante';
                      this.adminname = 'Administrador';
                      this.obtenerIdFolio();                      
                  });

    } else {

      return this._profile.getProfileCookie( this.ipClient )
                  .subscribe( ( resp: any ) => {

                    this.uid = resp.userId;
                    this.uid = resp.userId;
                    this.rol = localStorage.getItem('rol'); //Nombre del rol
                    this.extrolname = 'Abogado externo';
                    this.segname = 'Abogado de seguimiento';
                    this.solname = 'Solicitante';
                    this.adminname = 'Administrador';
                    this.obtenerIdFolio();
                    this.obtenerIdFolio();
                });
    }

  }

  obtenerIdFolio() {

    const idfolio = this._route.snapshot.paramMap.get( 'idfolio' );
    const usrRed = this.uid;
    const session = '';
    const localip = localStorage.getItem("ipC");
    this.ipClient = localip;

    this._dictaminacion.getIdxFolio( idfolio, usrRed, this.ipClient, session )
                       .subscribe( ( resp:any ) => {
                         this.id = resp.beanRespuestaConsulta.beanComplementoRespuesta.id;

                         this.obtenerFolioDictamen( this.id );
                         this.obtenerComentarios( this.id );
                       })

  }

  obtenerFolioDictamen( id: string ) {

    const localip = localStorage.getItem("ipC");
    const idfolio = id;
    const session = '';
    const usrRed = this.uid;
    this.ipClient = localip;


    this._dictaminacion.getFolioDictamen( idfolio, usrRed, this.ipClient, session )
                       .subscribe( ( resp: any ) => {

                         this.foliodata = resp;
                         this.idfolio = resp.beanDictSol.idDictSolPk;
                         this.solicitante = resp.beanEmitirDictamen.solicitante;
                         this.tipoFolio = resp.beanFolio.tipoFolio === "0" ? this.tipoFolio = 'NUEVO' : this.tipoFolio = 'COMPLEMENTO';
                         this.idDictamen = resp.beanFolio.idTipoDictamen;
                         this.idSubDictamen = resp.beanFolio.idTipoEmpresaFk;
                         this.buc = resp.beanFolio.buc;
                         this.region = resp.beanZonaRespuesta.region;
                         this.folio = resp.beanFolio.folio;
                         this.complemento = resp.beanFolio.complemento;
                         this.fechaRegistro = resp.beanFechasRespuesta.fechaRegistro;
                         this.sucursal = resp.beanZonaRespuesta.sucursal;
                         this.centroCosto = resp.beanBusqueda.centroCosto;
                         this.estatus = resp.beanFolio.estatus;
                         this.razonSocial = resp.beanEmitirDictamen.nombreDenominacionRazonSocial;
                         this.origen = resp.beanComplementoSeg.origen;
                         this.abogSeg = resp.beanAbogadoSeguimiento.abogSeg;
                         this.tel = resp.beanAbogadoOrigen.tel;
                         this.correo = resp.beanAbogadoOrigen.correo;
                         this.fechaEnvio = resp.beanFechasRespuesta.fechaEnvio;
                         this.comentarioSol = resp.beanReingresos.comReingreso;

                         this.obtenerDocumentos();
                         this.validateDict();
                         this.valcomplement();

                        })

  }

  validateDict() {

    const localip = localStorage.getItem("ipC");
    this.ipClient = localip;
    this.usrRed = localStorage.getItem("uId");

    switch ( this.idDictamen ) {
      case '1':
        /* OP Bancarias */
        const dataob = {
          "idDictamen": this.idDictamen,
          "tipoSubDict": this.idSubDictamen,
          "razonSocial": this.razonSocial,
          "idSolicitud":this.id,
          "folio": this.foliodata.beanFolio.folio,
          "buc" : this.buc,
          "ipClient": this.ipClient,
          "usrRed": this.usrRed,
          "conn": ""
        }
    
        this._dictamenes.getDictamentOPBancPDF( dataob )
            .subscribe( resp => {
              this.filePDFv = resp.base64;
            }, (errors) => {
              this.filePDFv = errors.error.errors[0].message;
            });

        break;
      case '2':
        /* gobeinst */
        const datagobinst = {
          "idDictamen": this.idDictamen,
          "tipoSubDict": this.idSubDictamen,
          "razonSocial": this.razonSocial,
          "idSolicitud":this.id,
          "folio": this.foliodata.beanFolio.folio,
          "buc" : this.buc,
          "ipClient": this.ipClient,
          "usrRed": this.usrRed,
          "conn": ""
        }
    
        this._dictamenes.getDictamenGobeInstPDF( datagobinst )
            .subscribe( resp => {
              this.filePDFv = resp.base64;
            }, (errors) => {
              this.filePDFv = errors.error.errors[0].message;
            });

        break;
      case '3':
        /* Especial */ 
        const datae = {
          "idDictamen": this.idDictamen,
          "tipoSubDict": this.idSubDictamen,
          "razonSocial": this.razonSocial,
          "idSolicitud":this.id,
          "folio": this.foliodata.beanFolio.folio,
          "buc" : this.buc,
          "ipClient": this.ipClient,
          "usrRed": this.usrRed,
          "conn": ""
        }
    
        this._dictamenes.getDictamentEspPDF( datae )
            .subscribe( resp => {
              this.filePDFv = resp.base64;
            }, (errors) => {
              this.filePDFv = errors.error.errors[0].message;
           });

        break;
      case '4':
        /* devdesaldo */
        const datadevsal = {
          "idDictamen": this.idDictamen,
          "tipoSubDict": this.idSubDictamen,
          "razonSocial": this.razonSocial,
          "idSolicitud":this.id,
          "folio": this.foliodata.beanFolio.folio,
          "buc" : this.buc,
          "ipClient": this.ipClient,
          "usrRed": this.usrRed,
          "conn": ""
        }
    
        this._dictamenes.getDictamentDevSalPDF( datadevsal )
            .subscribe( resp => {
              this.filePDFv = resp.base64;
            }, (errors) => {
              this.filePDFv = errors.error.errors[0].message;
           });

        break;
      case '5':
        /* fideicomiso */
        const datafid = {
          "idDictamen": this.idDictamen,
          "tipoSubDict": this.idSubDictamen,
          "razonSocial": this.razonSocial,
          "idSolicitud":this.id,
          "folio": this.foliodata.beanFolio.folio,
          "buc" : this.buc,
          "ipClient": this.ipClient,
          "usrRed": this.usrRed,
          "conn": ""
        }

        this._dictamenes.getDictamenFideicomisoPDF( datafid )
            .subscribe( resp => {
              this.filePDFv = resp.base64;
            }, (errors) => {
              this.filePDFv = errors.error.errors[0].message;
           });

        break;
      case '6':
        /*persfisi*/
        const datapf = {
          "idDictamen": this.idDictamen,
          "tipoSubDict": this.idSubDictamen,
          "razonSocial": this.razonSocial,
          "idSolicitud":this.id,
          "folio": this.foliodata.beanFolio.folio,
          "buc" : this.buc,
          "ipClient": this.ipClient,
          "usrRed": this.usrRed,
          "conn": ""
        }
    
        this._dictamenes.getDictamenPerFisPDF( datapf )
            .subscribe( resp => {
              this.filePDFv = resp.base64;
            }, (errors) => {
              this.filePDFv = errors.error.errors[0].message;
           });

        break;

    }

  }

  /**
   *
   * Metodo para validar complemento
   * @return {*} 
   * @memberof VistafoliosgestionComponent
   */
  valcomplement() {
    
    if (this.foliodata.beanFolio.complemento !== '') {
        return this.foliodata.beanFolio.complemento;
    } else {
        return this.foliodata.beanFolio.folio;
    }

  }

  generarComplemento() {
    
    if ( this.foliodata.beanFolio.complemento !== '' ) {
      this._router.navigate(['/foliocomplemento', this.foliodata.beanFolio.complemento]);
      
    } else {
      this._router.navigate(['/foliocomplemento', this.foliodata.beanFolio.folio]);
      
    }

  }

  obtenerComentarios( id: any ) {

    const localip = localStorage.getItem("ipC");
    this.ipClient = localip;
    this.usrRed = localStorage.getItem("uId");
    
    const idfolio = id;
    const usrRed = this.usrRed;
    const session = "";

    this._dictaminacion.getComments( idfolio, this.usrRed, this.ipClient, session )
        .subscribe( ( resp:any ) => {

          if( resp.length > 0 ) { 
            this.comentarioSeg = resp[0].comentario;
            this.comentarioExt = resp[1].comentario;
            this.idTipoComentarioRchz = resp[1]?.idTipoComentarioRchz;
            this.idSubTipoRchz = resp[1]?.idSubTipoRchz;
            this.comentario = resp
          } else {
            this.comentarios = [""];
          }

        })

  }

  obtenerDocumentos() {

    const localip = localStorage.getItem("ipC");
    this.ipClient = localip;
    this.usrRed = localStorage.getItem("uId");
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

  previewDictamen() {

    this._dictamenes.getBase64FileNetDictamen( this.idfolio )
        .subscribe( ( resp: any ) => {

            let filepb64 = 'data:application/pdf;base64,' + resp.docBase64;
            this.filePDF =  resp.docBase64;
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
          this.headerModalM = "¡Error! ";
          this.messageModalM = `Hubo un error al recuperar el dictamen, favor de contactar al Administrador.`;
          this.displayModalM = true;
        });

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

  closeModal() {

    this.displayModalM = false;

  }

  dictaminar() {
    this.displayModalP = true;
  }

  afterLoadComplete(pdfData: any) {
    this.totalPages = pdfData.numPages;
    this.isLoaded = true;
  }

}
