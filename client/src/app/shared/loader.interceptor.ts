import {Injectable, Provider} from '@angular/core';
import {
    HttpRequest,
    HttpHandler,
    HttpEvent,
    HttpInterceptor, HTTP_INTERCEPTORS
} from '@angular/common/http';
import {finalize, Observable} from 'rxjs';
import {LoaderService} from "./loader.service";

@Injectable()
export class LoaderInterceptor implements HttpInterceptor {

    constructor(private loaderService: LoaderService) {
    }

    intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
        this.loaderService.show();

        return next.handle(request).pipe(
            finalize(() => this.loaderService.hide())
        );
    }
}

export const loaderInterceptorProvider: Provider = {
    provide: HTTP_INTERCEPTORS,
    useClass: LoaderInterceptor,
    multi: true
};
