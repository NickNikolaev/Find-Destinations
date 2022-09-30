import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {LoaderComponent} from './loader/loader.component';
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";
import {loaderInterceptorProvider} from "./loader.interceptor";


@NgModule({
    declarations: [
        LoaderComponent
    ],
    imports: [
        CommonModule,
        MatProgressSpinnerModule,
    ],
    providers: [
        loaderInterceptorProvider,
    ],
    exports: [
        LoaderComponent,
    ]
})
export class SharedModule {
}
