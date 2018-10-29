import { Component, OnInit, OnDestroy } from '@angular/core';
import { GuildService } from 'src/app/services/guild.service';
import { AppService } from 'src/app/services/app.service';
import { Guild } from 'src/app/models/guilds/guild.model';
import { Subscription } from 'rxjs';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-guild-details',
  templateUrl: './guild-details.component.html',
  styleUrls: ['./guild-details.component.css']
})
export class GuildDetailsComponent implements OnInit, OnDestroy {

  //TODO: Add some filtering to the guild members
  private isPageLoaded: boolean = false;
  private subscriptions: Subscription[] = [];
  private guild: Guild;

  constructor(
    private appService: AppService,
    private guildService: GuildService,
    private activeRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.appService.showMainProgressBar(true);
    this.appService.showBackButton(true);
    this.appService.setBackRouterPath('/guilds');

    this.subscriptions.push(
      this.activeRoute.paramMap.subscribe(params => {
        const guildName = params.get('name');
        if (guildName === null || guildName === '') {
          this.appService.showMainProgressBar(false);
          this.appService.showMessage('You need to provide a valid guild name.');
          return;
        }
        this.guildService.getGuild(guildName).subscribe(r => {
          if (r.succeed) {
            this.guild = r.result;
            this.appService.changeMaintTitle(`Guild - ${r.result.name}`);
            this.isPageLoaded = true;
          } else {
            this.appService.showMessage(`An error occurred while trying to get the guild. ${r.message}`);
          }
        }, (error) => {
          console.log(error);
          this.appService.showMessage('An unknown error occurred.');
          this.appService.showMainProgressBar(false);
        },
          () => this.appService.showMainProgressBar(false))
      })
    )
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(s => s.unsubscribe());
  }

}
