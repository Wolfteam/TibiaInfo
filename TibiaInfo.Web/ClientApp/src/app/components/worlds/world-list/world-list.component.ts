import { Component, OnInit } from '@angular/core';
import { AppService } from 'src/app/services/app.service';
import { WorldService } from 'src/app/services/world.service';
import { SimpleWorld } from 'src/app/models/worlds/simple-world.model';

@Component({
  selector: 'app-world-list',
  templateUrl: './world-list.component.html',
  styleUrls: ['./world-list.component.css']
})
export class WorldListComponent implements OnInit {

  worlds: SimpleWorld[] = [];

  constructor(
    private appService: AppService,
    private worldService: WorldService
  ) { }

  ngOnInit() {
    this.appService.changeMaintTitle('Worlds');
    this.appService.showMainProgressBar(true);
    this.appService.showBackButton(false);

    this.worldService.getAllWorlds().subscribe(r => {
      console.log(r);
      if (r.succeed) {
        this.worlds = r.result.worlds;
      } else {
        this.appService.showMessage('An error occurred while trying to get the character. ' + r.message);
      }
    }, (error) => this.appService.showMessage('An unknown error occurred while trying to get all the worlds. ' + error),
      () => this.appService.showMainProgressBar(false));
  }

}
