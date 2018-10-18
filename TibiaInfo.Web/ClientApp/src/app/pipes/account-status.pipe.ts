import { PipeTransform, Pipe } from '@angular/core';
import { AccountStatusType } from '../enums/account-status-type.enum';

@Pipe({
  name: 'accountStatus'
})
export class AccountStatusPipe implements PipeTransform {
  transform(value: AccountStatusType): string {
    switch (value) {
      case AccountStatusType.FREE:
        return "Free Account";
      case AccountStatusType.PREMIUM:
        return "Premium Account";
      default:
        throw new Error('The provided account status type enum value does not exists');
    }
  }
}
