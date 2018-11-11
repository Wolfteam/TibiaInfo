import { PipeTransform, Pipe } from '@angular/core';
import { VocationType } from '../enums/vocation-type.enum';
import { VocationHelper } from '../helpers/vocation.helpers';

@Pipe({
  name: 'vocationTitle'
})
export class VocationTtitlePipe implements PipeTransform {
  transform(value: VocationType): string {
    return VocationHelper.toVocation(value);
  }
}
