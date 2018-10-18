import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class AppService {

  showMainProgressBarSource = new Subject<boolean>();
  showMainMessageSource = new Subject<string>();
  changeMainTitleSource = new Subject<string>();

  showMainProgressBar(show: boolean): void {
    this.showMainProgressBarSource.next(show);
  }

  showMessage(message: string): void {
    this.showMainMessageSource.next(message);
  }

  changeMaintTitle(title: string): void {
    this.changeMainTitleSource.next(title);
  }
}
