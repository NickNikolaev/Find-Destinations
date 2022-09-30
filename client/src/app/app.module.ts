import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatSliderModule} from '@angular/material/slider';
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatDatepickerModule} from "@angular/material/datepicker";
import {MatInputModule} from "@angular/material/input";
import {MatButtonModule} from "@angular/material/button";
import {MatNativeDateModule} from "@angular/material/core";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatButtonToggleModule} from "@angular/material/button-toggle";
import {MatIconModule} from "@angular/material/icon";
import {HttpClientModule} from "@angular/common/http";
import { DestinationTableComponent } from './destination-table/destination-table.component';
import {MatTableModule} from "@angular/material/table";
import {MatSortModule} from "@angular/material/sort";
import {MatGridListModule} from "@angular/material/grid-list";
import {SharedModule} from "./shared/shared.module";
import {CoreModule} from "./core/core.module";
import {DestinationService} from "./shared/destination.service";
import {MatSelectModule} from "@angular/material/select";

@NgModule({
    declarations: [
        AppComponent,
        DestinationTableComponent,
    ],
    imports: [
        HttpClientModule,
        BrowserAnimationsModule,
        BrowserModule,
        MatFormFieldModule,
        MatSliderModule,
        FormsModule,
        MatInputModule,
        MatButtonToggleModule,
        MatIconModule,
        MatTableModule,
        MatSortModule,
        SharedModule,
        CoreModule,
        MatButtonModule,
        MatSelectModule,
    ],
    providers: [
        DestinationService,
    ],
    bootstrap: [
        AppComponent,
    ]
})
export class AppModule {
}
