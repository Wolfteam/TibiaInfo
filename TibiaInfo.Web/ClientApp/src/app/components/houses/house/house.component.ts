import { Component, OnInit, Input } from '@angular/core';
import { SimpleHouse } from 'src/app/models/houses/simple-house.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-house',
  templateUrl: './house.component.html',
  styleUrls: ['./house.component.css']
})
export class HouseComponent implements OnInit {
  @Input() public currentWorld: string;
  @Input() public house: SimpleHouse;
  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  private showDetails(): void {
    this.router.navigate(['/house', this.currentWorld, this.house.id]);
  }
}
