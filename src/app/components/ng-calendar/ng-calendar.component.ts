import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { PrimeNGConfig } from 'primeng/api';
import { DatePipe } from '@angular/common';


@Component({
  selector: 'app-ng-calendar',
  templateUrl: './ng-calendar.component.html',
  providers: [ DatePipe ]
})
export class NgCalendarComponent implements OnInit {

	// Inputs
	@Input() labelCalendar!: string;
	@Input() formatDate!: string;
	@Input() locale!: string;
	@Input() inputId!: string;
	@Input() disabled!: boolean;
	@Input() placeholder!: string;
	@Input() selectDate: string = '';
	@Input() maxDate: Date = null!;
	@Input() minDate: Date = null!;

	// Outputs
	@Output() OutDate = new EventEmitter<any>();

	// Errors
	codeName!: string;

	constructor( public _config: PrimeNGConfig, public datepipe: DatePipe ) { }

	ngOnInit(): void {
		
		this.codeName = "ng-calendar.component.ts";
		this.setLocale( this._config, this.locale );
  
	}

	sendDate() {
		let date = this.datepipe.transform( this.selectDate, 'dd-MM-yyyy' );
		this.OutDate.emit( date );
	}

	setMinDate(date: string): void {
		this.minDate = new Date(this.dateFormat(date));
	}

	setMaxDate(date: string): void {
		this.maxDate = new Date(this.dateFormat(date));
	}

	private dateFormat(date: string): string {
		const [ dia, mes, anio ] = date.split('-');
		return `${mes}-${dia}-${anio}`; 
	}

  
	setLocale( config: PrimeNGConfig, locale: string ): void {
		switch( locale.toLowerCase( ) ) {
			case 'es': {
				config.setTranslation( {
					startsWith: 'Comienza con',
					contains: 'Contiene',
					notContains: 'No contiene',
					endsWith: 'Termina con',
					equals: 'Igual',
					notEquals: 'No es igual',
					noFilter: 'Sin filtro',
					lt: 'Menos que',
					lte: 'Menos que o igual a',
					gt: 'Mas grande que',
					gte: 'Mayor qué o igual a',
					is: 'Es',
					isNot: 'No es',
					before: 'Before',
					after: 'After',
					apply: 'Aplicar',
					matchAll: 'Coincidir con todos',
					matchAny: 'Coincidir con cualquiera',
					addRule: 'Agregar regla',
					removeRule: 'Eliminar regla',
					accept: 'Si',
					reject: 'No',
					choose: 'Escoger',
					upload: 'Subir',
					cancel: 'Cancelar',
					dayNames: [ 'Domingo','Lunes','Martes','Miércoles','Jueves','Viernes','Sábado' ],
					dayNamesShort: [ 'dom','lun','mar','mié','jue','vie','sáb' ],
					dayNamesMin: [ 'D','L','M','M','J','V','S' ],
					monthNames: [ 'Enero','Febrero','Marzo','Abril','Mayo','Junio','Julio','Agosto','Septiembre','Octubre','Noviembre','Diciembre' ],
					monthNamesShort: [ 'Ene','Feb','Mar','Abr','May','Jun','Jul','Ago','Sep','Oct','Nov','Dic' ],
					today: 'Hoy',
					clear: 'Limpiar',
					weekHeader: 'Sm'
				});
				break;
			}
			case 'de': {
				config.setTranslation( {
					startsWith: 'Beginnt mit',
					contains: 'Enthält',
					notContains: 'Enthält nicht',
					endsWith: 'Endet mit',
					equals: 'Gleich',
					notEquals: 'Kein Filter',
					noFilter: 'Kein Filter',
					lt: 'Weniger als',
					lte: 'Weniger als oder gleich',
					gt: 'Größer als',
					gte: 'Größer als oder gleich wie',
					is: 'Ist',
					isNot: 'Ist nicht',
					before: 'Vor',
					after: 'Nach dem',
					apply: 'Anwenden',
					matchAll: 'Alle zusammenbringen',
					matchAny: 'Passen Sie zu einem',
					addRule: 'Regel hinzufügen',
					removeRule: 'Regel entfernen',
					accept: 'Ja',
					reject: 'Nein',
					choose: 'Wählen',
					upload: 'Hochladen',
					cancel: 'Stornieren',
					dayNames: ['Sonntag', 'Montag', 'Dienstag', 'Mittwoch', 'Donnerstag', 'Freitag', 'Samastag'],
					dayNamesShort: ['Son', 'Mon', 'Die', 'Mit', 'Don', 'Fre', 'Sam'],
					dayNamesMin: ['So','Mo','Di','Mi','Do','Fr','Sa'],
					monthNames: [ 'Januar','Februar','März','April','Mai','Juni','Juli','August','September','Oktober','November','Dezember' ],
					monthNamesShort: [ 'Jan', 'Feb', 'Mär', 'Apr', 'Mai', 'Jun','Jul', 'Aug', 'Sep', 'Okt', 'Nov', 'Dez' ],
					today: 'Heute',
					clear: 'Löschen',
					weekHeader: 'Wo'
				});
				break;
			}
			default: {
				break;
			}
		}
	}

}
