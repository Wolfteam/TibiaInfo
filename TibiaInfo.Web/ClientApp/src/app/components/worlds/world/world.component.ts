import { Component, OnInit, Input } from '@angular/core';
import { SimpleWorld } from 'src/app/models/worlds/simple-world.model';
import { WorldService } from 'src/app/services/world.service';
import { Router } from '@angular/router';
import { AppService } from 'src/app/services/app.service';

@Component({
  selector: 'app-world',
  templateUrl: './world.component.html',
  styleUrls: ['./world.component.css']
})
export class WorldComponent implements OnInit {

  @Input() world: SimpleWorld;

  constructor(private router:Router) { }

  ngOnInit() {

  }

  showDetails() {
    this.router.navigate(['/world', this.world.name])
  }
}
