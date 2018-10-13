import { Component } from '@angular/core';
import { OnInit } from '@angular/core';
import { SideNavItem } from './models/sideNavItem.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  sideNavItems: SideNavItem[] = [
    {
      icon: 'people',
      id: 1,
      text: 'Characters'
    },
    {
      icon: 'public',
      id: 2,
      text: 'Worlds'
    },
    {
      icon: 'account_balance',
      id: 3,
      text: 'Guilds'
    },
    {
      icon: 'home',
      id: 4,
      text: 'Houses'
    },
    {
      icon: 'trending_up',
      id: 5,
      text: 'Highscores'
    },
    {
      icon: 'waves',
      id: 6,
      text: 'News'
    }];
  isProgressBarVisible = false;
  isBackButtonVisible = false;
  title = 'Characters';
  playersOnline = 19550;


  private onSideNavItemClick(itemID: number) {
    console.log(itemID);
  }

  private changeToolbarTitle(title: string) {
    this.title = title;
  }

  private changeProgressBarVisibility(isVisible: boolean) {
    this.isProgressBarVisible = isVisible;
  }
}
