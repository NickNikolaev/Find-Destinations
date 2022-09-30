import {Injectable} from '@angular/core';
import {Observable} from "rxjs";
import {IDestination} from "../dtos/destination.interface";
import {HttpClient, HttpParams} from "@angular/common/http";

@Injectable({
    providedIn: 'root'
})
export class DestinationService {

    constructor(private http: HttpClient) {
    }

    getDestinations(params: HttpParams): Observable<{ success: boolean, data: IDestination[] }> {
        return this.http.get<{ success: boolean, data: IDestination[] }>('http://localhost:3000/destinations', {params});
    }
}
