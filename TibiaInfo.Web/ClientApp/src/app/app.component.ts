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
  styleUrls: ['./app.component.css']
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

  constructor(
    private appService: AppService,
    private snackBar: MatSnackBar,
    private router: Router
  ) {
    this.appService.changeMainTitleSource.subscribe(async msg => this.changeToolbarTitle(await msg));
    this.appService.showMainProgressBarSource.subscribe(async show => this.showProgressBar(await show));
    this.appService.showMainMessageSource.subscribe(async msg => this.showMessage(await msg));
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

  showMessage(message: string, action: string = 'Ok'): void {
    this.snackBar.open(message, action, {
      duration: 5000,
    });
  }
}
