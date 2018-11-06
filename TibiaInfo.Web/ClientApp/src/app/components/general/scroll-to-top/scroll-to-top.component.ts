import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-scroll-to-top',
  templateUrl: './scroll-to-top.component.html',
  styleUrls: ['./scroll-to-top.component.css'],
  host: {
    '(window:scroll)': 'onWindowScroll()'
  }
})
export class ScrollToTopComponent implements OnInit {
  private showGoToTheTopButton: boolean = false;
  private initialY: number;

  constructor() { }

  ngOnInit(): void {
    this.initialY = document.documentElement.scrollTop || document.body.scrollTop;
  }

  private scrollToTheTop(): void {
    document.getElementById('app-root').scrollIntoView({behavior:'smooth', block:'start', inline:'start'});
  }

  private onWindowScroll(): void {
    if (this.initialY) {
      if (this.initialY > window.scrollY) {
        this.showGoToTheTopButton = false;
      }
      else {
        this.showGoToTheTopButton = true;
      }
    }
    else {
      this.initialY = window.scrollY;
      this.showGoToTheTopButton = true;
    }
  }
}
