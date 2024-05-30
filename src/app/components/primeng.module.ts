import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

// Modules
import { TableModule } from 'primeng/table';
import { TreeTableModule } from 'primeng/treetable';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ButtonModule } from 'primeng/button';
import { ToastModule } from 'primeng/toast';
import { CalendarModule } from 'primeng/calendar';
import { InputTextModule } from 'primeng/inputtext';
import { KeyFilterModule } from 'primeng/keyfilter';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { TabViewModule } from 'primeng/tabview';
import { RadioButtonModule } from 'primeng/radiobutton';
import { DropdownModule } from 'primeng/dropdown';
import { ToolbarModule } from 'primeng/toolbar';
import { DialogModule } from 'primeng/dialog';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { FormsModule } from '@angular/forms';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { CheckboxModule } from 'primeng/checkbox';
import { InputNumberModule } from 'primeng/inputnumber';
import { TooltipModule } from 'primeng/tooltip';
import { MultiSelectModule } from 'primeng/multiselect';
import { MessagesModule } from 'primeng/messages';
import { MessageModule } from 'primeng/message';
import { InputTextareaModule } from 'primeng/inputtextarea';

// Components
import { NgTableCustComponent } from './ng-table-cust/ng-table-cust.component';
import { NgCalendarComponent } from './ng-calendar/ng-calendar.component';
import { NgAutocompCustComponent } from './ng-autocompl-cust/ng-autocomp-cust.component';
import { NgDropdownComponent } from './ng-dropdown/ng-dropdown.component';



@NgModule({
    declarations: [
        NgTableCustComponent,
        NgCalendarComponent,
        NgAutocompCustComponent,
        NgDropdownComponent
    ],
    imports: [
        HttpClientModule,
        TableModule,
        TreeTableModule,
        BrowserAnimationsModule,
        ProgressSpinnerModule,
        TabViewModule,
        RadioButtonModule,
        ToastModule,
        CalendarModule,
        InputTextModule,
        KeyFilterModule,
        DropdownModule,
        ToolbarModule,
        DialogModule,
        ConfirmDialogModule,
        AutoCompleteModule,
        FormsModule,
        CheckboxModule,
        InputNumberModule,
        TooltipModule,
        MultiSelectModule,
        MessagesModule,
        MessageModule,
        InputTextareaModule
    ],
    exports: [
        NgTableCustComponent,
        NgAutocompCustComponent,
        TableModule,
        TreeTableModule,
        ButtonModule,
        BrowserAnimationsModule,
        ProgressSpinnerModule,
        TabViewModule,
        RadioButtonModule,
        ToastModule,
        CalendarModule,
        NgCalendarComponent,
        InputTextModule,
        KeyFilterModule,
        DropdownModule,
        ToolbarModule,
        DialogModule,
        ConfirmDialogModule,
        CheckboxModule,
        InputNumberModule,
        TooltipModule,
        MultiSelectModule,
        MessagesModule,
        MessageModule,
        NgDropdownComponent,
        InputTextareaModule
    ]
})
export class PrimengModule { }