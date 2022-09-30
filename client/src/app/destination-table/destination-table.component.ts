import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { IDestination } from '../dtos/destination.interface';
import { Sort } from '@angular/material/sort';

@Component({
  selector: 'app-destination-table',
  templateUrl: './destination-table.component.html',
  styleUrls: ['./destination-table.component.scss'],
})
export class DestinationTableComponent implements OnChanges {
  @Input() destinations: IDestination[] = [];
  displayedColumns = ['country', 'season', 'rating'];
  isSearchButtonClicked = false;

  constructor() {}

  ngOnChanges(changes: SimpleChanges) {
    // If destinations has come -> Set isSearchButtonClicked to true
    if (!changes['destinations'].firstChange) this.isSearchButtonClicked = true;

    // Sort destinations by descending order
    const sort: Sort = { active: 'rating', direction: 'desc' };
    this.sortDestinations(sort);
  }

  compareRows(a: number | string, b: number | string, isAsc: boolean) {
    return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
  }

  sortDestinations(sort: Sort): void {
    const destinations = [...this.destinations];
    if (!sort.active || sort.direction === '') {
      this.destinations = destinations;
      return;
    }

    this.destinations = destinations.sort((a, b) => {
      const isAsc = sort.direction === 'asc';
      switch (sort.active) {
        case 'rating':
          return this.compareRows(a.rating, b.rating, isAsc);

        default:
          return 0;
      }
    });
  }
}
