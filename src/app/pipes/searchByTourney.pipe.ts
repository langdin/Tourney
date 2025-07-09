import { Pipe, PipeTransform } from '@angular/core';
import { Tourney } from 'src/app/models/tourney';

@Pipe({
  name: 'search'
})
export class SearchByTourney implements PipeTransform {
  transform(tourneys: Tourney[], searchString: string): any {
    if (!searchString) { return tourneys; }
    const res = new Array<Tourney>();
    tourneys.filter(tourney => {
      if (
        tourney.name.toLowerCase().indexOf(searchString) !== -1 ||
        tourney.description.toLowerCase().indexOf(searchString) !== -1 ||
        tourney.status.toLowerCase() === searchString
      ) {
        res.push(tourney);
      }
    });
    return res;
  }
}
