import { Component, OnInit, Input } from '@angular/core';
import { GuildMemberCharacter } from 'src/app/models/guilds/guild-member-character.model';

@Component({
  selector: 'app-guild-member',
  templateUrl: './guild-member.component.html',
  styleUrls: ['./guild-member.component.css']
})
export class GuildMemberComponent implements OnInit {

  @Input() public character: GuildMemberCharacter;
  constructor() { }

  ngOnInit() {
  }

}
