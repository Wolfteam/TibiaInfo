import { PipeTransform, Pipe } from '@angular/core';
import { StatusType } from '../enums/status-type.enum';

@Pipe({
  name: 'status'
})
export class StatusPipe implements PipeTransform {
  transform(value: StatusType): string {
    switch (value) {
      case StatusType.OFFLINE:
        return 'Offline';
      case StatusType.ONLINE:
        return 'Online';
      default:
        throw new Error('The provided status enum value does not exists');
    }
  }

}
