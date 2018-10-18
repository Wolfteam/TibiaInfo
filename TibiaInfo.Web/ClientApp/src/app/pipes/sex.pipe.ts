import { PipeTransform, Pipe } from '@angular/core';
import { SexType } from '../enums/sex-type.enum';

@Pipe({
  name: 'sex'
})
export class SexPipe implements PipeTransform {
  transform(value: SexType): string {
    switch (value) {
      case SexType.FEMALE:
        return "Female";
      case SexType.MALE:
        return "Male";
      default:
        throw new Error('The provided sex type enum value does not exists');
    }
  }
}
