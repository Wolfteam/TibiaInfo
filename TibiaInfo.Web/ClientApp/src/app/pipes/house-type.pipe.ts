import { Pipe, PipeTransform } from '@angular/core';
import { HouseType } from '../enums/house-type.enum';

@Pipe({
  name: 'houseType'
})
export class HouseTypePipe implements PipeTransform {

  transform(value: HouseType): any {
    switch (value) {
      case HouseType.HOUSE:
        return 'House';
      case HouseType.HOUSE:
        return 'GuildHalls';
      default:
        throw new Error('The provided house type enum value does not exists');
    }
  }

}
