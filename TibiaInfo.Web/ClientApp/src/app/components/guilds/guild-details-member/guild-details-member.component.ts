import { Component, OnInit, Input } from '@angular/core';
import { GuildMemberCharacter } from 'src/app/models/guilds/guild-member-character.model';

@Component({
  selector: 'app-guild-details-member',
  templateUrl: './guild-details-member.component.html',
  styleUrls: ['./guild-details-member.component.css']
})
export class GuildDetailsMemberComponent implements OnInit {

  @Input() public character: GuildMemberCharacter;
  constructor() { }

  ngOnInit() {
  }

}
