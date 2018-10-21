import { Component, OnDestroy } from '@angular/core';
import { OnInit } from '@angular/core';
import { SideNavItem } from './models/side-nav-item.model';
import { AppService } from './services/app.service';
import { MatSnackBar } from '@angular/material';
import { Subscription } from 'rxjs';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';
import { LocationStrategy } from '@angular/common';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  host: {
    '(document:keydown)': 'handleKeyDown($event)',
    '(document:keyup)': 'handleKeyUp($event)'
  }
})
export class AppComponent {
  isSideNavOpened: boolean = false;
  sideNavItems: SideNavItem[] = [
    {
      icon: 'people',
      id: 1,
      text: 'Characters',
      url: 'characters'
    },
    {
      icon: 'public',
      id: 2,
      text: 'Worlds',
      url: 'worlds'
    },
    {
      icon: 'account_balance',
      id: 3,
      text: 'Guilds',
      url: 'guilds'
    },
    {
      icon: 'home',
      id: 4,
      text: 'Houses',
      url: 'houses'
    },
    {
      icon: 'trending_up',
      id: 5,
      text: 'Highscores',
      url: 'highscores'
    },
    {
      icon: 'waves',
      id: 6,
      text: 'News',
      url: 'news'
    }];
  isProgressBarVisible = false;
  isBackButtonVisible = false;
  title: string = '';
  playersOnline = 19550;
  private backToRouterPath: string[] = ['/characters'];
  private map: any = {
    17: false,
    16: false
  };


  constructor(
    private appService: AppService,
    private snackBar: MatSnackBar,
    private router: Router
  ) {
    this.appService.changeMainTitleSource.subscribe(async msg => this.changeToolbarTitle(await msg));
    this.appService.showMainProgressBarSource.subscribe(async show => this.showProgressBar(await show));
    this.appService.showMainMessageSource.subscribe(async msg => this.showMessage(await msg));
    this.appService.showBackButtonSource.subscribe(async show => this.showBackButton(await show));
    this.appService.setBackRouterPathSource.subscribe(async path => this.setBackRouterPath(await path));
  }

  private onSideNavItemClick(itemID: number): void {
    console.log("Click on side nav item id: " + itemID)
    this.isSideNavOpened = !this.isSideNavOpened;
  }

  private changeToolbarTitle(title: string): void {
    this.title = title;
  }

  private showProgressBar(isVisible: boolean): void {
    this.isProgressBarVisible = isVisible;
  }

  private showMessage(message: string, action: string = 'Ok'): void {
    this.snackBar.open(message, action, {
      duration: 5000,
    });
  }

  private showBackButton(show: boolean): void {
    this.isBackButtonVisible = show
  }

  private setBackRouterPath(path: string): void {
    console.log("Pusheado a la pila de navegacion.");
    this.backToRouterPath.push(path);
    console.log(this.backToRouterPath);
  }

  goBack(): void {
    console.log("Sacando a la pila de navegacion.");
    this.router.navigate([this.backToRouterPath.pop()]);
    console.log(this.backToRouterPath);
  }

  handleKeyDown(event: KeyboardEvent) {
    if (event.keyCode in this.map) {
      this.map[event.keyCode] = true;
      if (this.map[17] && this.map[16]) {
        this.isSideNavOpened = !this.isSideNavOpened;
      }
    }
  }

  handleKeyUp(event: KeyboardEvent) {
    if (event.keyCode in this.map) {
      this.map[event.keyCode] = false;
    }
  }
}
