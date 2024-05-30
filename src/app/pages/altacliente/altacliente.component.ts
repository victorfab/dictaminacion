import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
// Servicios
import { BearerTokenService } from 'src/app/servicios/bearer-token.service';
import { ClientesService } from '../../servicios/clientes.service';

@Component({
  selector: 'app-altacliente',
  templateUrl: './altacliente.component.html',
  styles: [
  ]
})
export class AltaclienteComponent implements OnInit {


  rfcdata!: string;

  nombre!: string;

  apellidop!: string;

  apellidom!: string;

  email!: string;

  ine!: string;

  fechanac!: any;

  estadociv!: string;

  pais!: string;

  calle!: string;

  numext!: string;

  numint!: string;

  estado!: string;

  municipio!: string;

  telefono!: string;

  segmento!: string;

  sucursal!: string;

  cc!: string;

  nacionalidad!: string;

  dataFiltersb: any;

  tipopersona!: any;

  tipopersonas!: any;

  estadocivil!: any;

  estadociviles!: any;

  genero!: any;

  generos!: any;

  datorfc!: string;

  displayModalM = false;

  headerModalM!: string;

  messageModalM!: string;
  
  ipClient: any;

  constructor( public _router:  Router,
               private _cliente: ClientesService,
               private _bearerToken: BearerTokenService ) {

                  this.dataFiltersb = {};
  }

  ngOnInit(): void {

    this._bearerToken.setBearerToken().subscribe( ( resp:any ) => { return resp } );

    this.tipopersona = [
                          {
                            "id": "0",
                            "nombre": "Persona Fisica",
                          },
                          {
                            "id": "1",
                            "nombre": "Persona Moral"
                          }
                       ]

    this.estadocivil = [
                        {
                          "id": "0",
                          "nombre": "Soltero",
                        },
                        {
                          "id": "1",
                          "nombre": "Casado"
                        },
                        {
                          "id": "3",
                          "nombre": "Divorciado",
                        },
                        {
                          "id": "4",
                          "nombre": "Separación en proceso judicial"
                        },
                        {
                          "id": "5",
                          "nombre": "Viudo",
                        },
                        {
                          "id": "6",
                          "nombre": "Concubinato"
                        }
                     ]
  
    this.genero = [
                    {
                      "id": "H",
                      "nombre": "Masculino",
                    },
                    {
                      "id": "M",
                      "nombre": "Femenino"
                    }
                  ]

  }

  /**
   * Metodo para obtener los eventos de los inputs del formulario
   *
   * @param {*} event
   * @param {string} field
   * @memberof AltaclienteComponent
   */
  getDataFirstGroup( event: any, field: string ) {

    switch ( field ) {
      case 'tippersonas':
        this.dataFiltersb.tipopersonas = event.value.id;
        this.dataFiltersb.tipopersonasn = event.value.nombre;
        break;
      case 'rfcdata':
        this.dataFiltersb.rfcdata = event.value.id;
        break;
      case 'nombre':
        this.dataFiltersb.nombre = event;
        break; 
      case 'apellidop':
        this.dataFiltersb.apellidop = event;
        break; 
      case 'apellidom':
        this.dataFiltersb.apellidom = event;
        break; 
      case 'email':
        this.dataFiltersb.email = event;
        break; 
      case 'ine':
        this.dataFiltersb.ine  = event;
        break;
      case 'fechanac':
        this.dataFiltersb.fechanac = event;
        break;

    }

  }

  /**
   * Metodo para obtener los eventos de los inputs del formulario
   *
   * @param {*} evt
   * @param {string} fld
   * @memberof AltaclienteComponent
   */
  getDataSecondGroup( evt: any, fld: string ) {

    switch( fld ) {
      case 'estadociviles':
        this.dataFiltersb.estadociviles = evt.value.nombre;
        break;  
      case 'pais':
        this.dataFiltersb.pais = evt;
        break;
      case 'generos':
        this.dataFiltersb.generos = evt.value.id;
        break;
      case 'nacionalidad':
        this.dataFiltersb.nacionalidad = evt;
        break;
      case 'calle':
        this.dataFiltersb.calle = evt;
        break;
      case 'numext':
        this.dataFiltersb.numext = evt;
        break;
      case 'numint':
        this.dataFiltersb.numint = evt;
        break;
      case 'estado':
        this.dataFiltersb.estado = evt;
        break;
      case 'municipio':
        this.dataFiltersb.municipio = evt;
        break;
    }
  }

  /**
   * Metodo para obtener los eventos de los inputs del formulario
   *
   * @param {*} evt
   * @param {string} fld
   * @memberof AltaclienteComponent
   */
  getDataFourGroup( evt: any, fld: string ) {

    switch( fld ) {
      case 'telefono':
        this.dataFiltersb.telefono = evt;
        break;
      case 'segmento':
        this.dataFiltersb.segmento = evt;
        break;
      case 'sucursal':
        this.dataFiltersb.sucursal = evt;
        break;
      case 'cc':
        this.dataFiltersb.cc = evt;
        break;
    }
  }

  /**
   * Metodo para guardar los datos del cliente
   *
   * @memberof AltaclienteComponent
   */
  guardarClente() {

    const localip = localStorage.getItem("ipC");
    const userid = localStorage.getItem("uId");
    this.ipClient = localip;
    

    const data =  {

                    "partyAddRq": {
                                    "rqUID": "",
                                    "partyInfo": {
                                      "customerType": this.dataFiltersb.tipopersonasn,
                                      "partyServiceLevelCode": "",
                                      "partyCategoryCode": "",
                                      "fiscalActivityInd": true,
                                      "bankRelationshipInd": true,
                                      "partyPartyRelInd": true,
                                      "partyGroupRelInd": true,
                                      "notificationInd": true,
                                      "establishedDt": "",
                                      "bankActivityDt": "",
                                      "originatingBranchCode": "",
                                      "salesChannelCode": "",
                                      "originatingChannelCode": "",
                                      "originatingBankCode": "",
                                      "legalEntity": "",
                                      "accountingField": "",
                                      "privateBankingInd": true,
                                      "openedAccountsInd": true,
                                      "nationalityCountry": {
                                        "countryCodeValue": ""
                                      },
                                      "orgPartyInfo": {
                                        "orgEstablishDt": "",
                                        "legalForm": "",
                                        "orgName": {
                                          "legalName": "",
                                          "name": ""
                                        }
                                      },
                                      "personPartyInfo": {
                                        "birthDt": this.dataFiltersb.fechanac,
                                        "gender": this.dataFiltersb.generos,
                                        "maritalStat": this.dataFiltersb.estadociviles,
                                        "immigrationStat": "",
                                        "personName": {
                                          "givenName": this.dataFiltersb.nombre,
                                          "paternalName": this.dataFiltersb.apellidop,
                                          "maternalName": this.dataFiltersb.apellidom
                                        }
                                      },
                                      "birthCountry": {
                                        "countryCodeValue": this.dataFiltersb.pais,
                                        "birthPlaceCode": ""
                                      },
                                      "residenceCountry": {
                                        "countryCodeValue": "",
                                        "timeFrame": {
                                          "startDt": "",
                                          "duration": {
                                            "count": 0,
                                            "unit": ""
                                          }
                                        }
                                      },
                                      "occupationData": {
                                        "genericActivityCode": "",
                                        "specificActivityCode": "",
                                        "occupationCode": ""
                                      },
                                      "issuedIdent": [
                                        {
                                          "issuedIdentType": "",
                                          "issuedIdentValue": "",
                                          "partyIssuedIdentId": "",
                                          "issuer": "",
                                          "issueDt": "",
                                          "expDt": "",
                                          "issuedLoc": "",
                                          "issuedCountryCodeValue": "",
                                          "taxRegisterMark": "",
                                          "identPrimaryInd": true,
                                          "identOcr": "",
                                          "identFolioNumber": "",
                                          "lastUpdateDt": "",
                                          "comments1": "",
                                          "comments2": ""
                                        }
                                      ],
                                      "contact": [
                                        {
                                          "phoneNum": {
                                            "phoneType": "",
                                            "phoneCategory": "",
                                            "phone": this.dataFiltersb.telefono,
                                            "phoneAreaCode": "",
                                            "carrierCode": "",
                                            "phoneExt": "",
                                            "comments": "",
                                            "lastUpdateDt": ""
                                          },
                                          "postAddr": {
                                            "addrType": "",
                                            "addr1": this.dataFiltersb.calle,
                                            "addr2": "",
                                            "addr3": "",
                                            "addr4": "",
                                            "postalCode": "",
                                            "cityCode": "",
                                            "countyDistrictCode": "",
                                            "stateProvCode": "",
                                            "addrAdditional": {
                                              "streetType": "",
                                              "addrRef1": "",
                                              "constructionType": "",
                                              "urbanAreaType": "",
                                              "settlementCode": "",
                                              "entitlement": "",
                                              "addrRef2": "",
                                              "addrRef3": "",
                                              "postOfficeCode": "",
                                              "postBox": "",
                                              "bankMexLoc": ""
                                            },
                                            "countryCode": {
                                              "countryCodeValue": ""
                                            },
                                            "timeFrame": {
                                              "startDt": "",
                                              "duration": {
                                                "count": 0,
                                                "unit": ""
                                              }
                                            },
                                            "city": this.dataFiltersb.estado,
                                            "countyDistrict": this.dataFiltersb.municipio,
                                            "verifyDt": "",
                                            "normalizationInd": true,
                                            "wrongAddrInd": true,
                                            "upDt": "",
                                            "comments": "",
                                            "lastUpdateDt": "",
                                            "addressIdent": "",
                                            "return": {
                                              "lastReturnDt": "",
                                              "returnCount": 0,
                                              "returnMailInd": true,
                                              "returnReason": ""
                                            }
                                          },
                                          "email": {
                                            "emailAddr": this.dataFiltersb.email
                                          }
                                        }
                                      ],
                                      "correspondence": {
                                        "campaignType": ""
                                      },
                                      "partyPref": {
                                        "language": ""
                                      },
                                      "relationshipMgr": [
                                        {
                                          "relationshipMgrIdent": ""
                                        }
                                      ],
                                      "partyIndicator": [
                                        {
                                          "indicatorValue": "",
                                          "indicatorCode": ""
                                        }
                                      ],
                                      "accessLevel": "",
                                      "taxResidenceCountry": {
                                        "countryCodeValue": ""
                                      },
                                      "financialData": [
                                        {
                                          "financialType": "",
                                          "financialAmt": {
                                            "amt": "",
                                            "curCode": {
                                              "curCodeValue": "",
                                              "curCodeType": ""
                                            }
                                          },
                                          "freq": ""
                                        }
                                      ]
                                    }
                    },
                      "usrRed": userid,
                      "ipClient": this.ipClient, 
                      "conn": ""
                  }

    this._cliente.createClientes( data )
                 .subscribe( (resp: any) => {

                  this.headerModalM = "ALTA DE USUARIO";
                  this.messageModalM = `El Usuario se ha agregado correctamente, con el numero" + " " + ${resp.data.buc}` ;
                  this.displayModalM = true;
        
                });
                  
  }

  /**
   * Reinicia formulrio
   *
   * @memberof AltaclienteComponent
   */
  limpiarFormulario() {
    this._router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
      this._router.navigate(['/clientes']);
    });
  }

  /**
   * Cerrar modal
   *
   * @memberof AltaclienteComponent
   */
  closeModal() {

    this.displayModalM = false;

    this._router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
      this._router.navigate(['/clientes']);
    });

  }

}
