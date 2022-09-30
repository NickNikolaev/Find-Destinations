import {Component, ViewChild} from '@angular/core';
import {HttpParams} from "@angular/common/http";
import {IDestination} from "./dtos/destination.interface";
import {NgForm} from "@angular/forms";
import {DestinationService} from "./shared/destination.service";

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
})
export class AppComponent {
    @ViewChild('destinationForm') destinationForm: NgForm = {} as NgForm;
    destinations: IDestination[] = [];
    currentMonth = new Date().getMonth() + 1;

    constructor(private destinationService: DestinationService) {
    }

    getDestinations(): void {
        const fromObject = {month: this.destinationForm.value.month};
        if (this.destinationForm.value.seasons) Object.assign(fromObject, {seasons: this.destinationForm.value.seasons});
        if (this.destinationForm.value.continents) Object.assign(fromObject, {continents: this.destinationForm.value.continents});
        const params = new HttpParams({fromObject})

        this.destinationService.getDestinations(params)
            .subscribe(({data}) => this.destinations = data)
    }
}
