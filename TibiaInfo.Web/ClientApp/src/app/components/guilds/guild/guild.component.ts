import { Component, OnInit, Input } from '@angular/core';
import { BaseGuild } from 'src/app/models/guilds/base-guild.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-guild',
  templateUrl: './guild.component.html',
  styleUrls: ['./guild.component.css']
})
export class GuildComponent implements OnInit {

  @Input() guild: BaseGuild;

  constructor(private router: Router) { }

  ngOnInit() {

  }

  showDetails(): void {
    this.router.navigate(['guild', this.guild.name])
  }
}
