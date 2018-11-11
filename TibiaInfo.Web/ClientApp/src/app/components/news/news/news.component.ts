import { Component, OnInit, Input } from '@angular/core';
import { SimpleNews } from 'src/app/models/news/simple-news.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.css']
})
export class NewsComponent implements OnInit {

  @Input() news: SimpleNews;

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  showDetails(): void {
    this.router.navigate(['/news', this.news.id])
  }
}
