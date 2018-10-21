import { Pipe, PipeTransform } from '@angular/core';
import { WorldLocationType } from '../enums/world-location-type';

@Pipe({
  name: 'worldLocation'
})
export class WorldLocationPipe implements PipeTransform {

  transform(value: WorldLocationType): any {
    switch (value) {
      case WorldLocationType.EUROPE:
        return 'Europe';
      case WorldLocationType.NORTH_AMERICA:
        return 'North America';
      case WorldLocationType.SOUTH_AMERICA:
        return 'South America';
      default:
        throw new Error('The provided world location enum value does not exists');
    }
  }
}
