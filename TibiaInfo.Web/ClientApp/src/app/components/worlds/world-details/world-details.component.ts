import { Component, OnInit, ViewChild } from '@angular/core';
import { WorldService } from 'src/app/services/world.service';
import { ActivatedRoute } from '@angular/router';
import { AppService } from 'src/app/services/app.service';
import { World } from 'src/app/models/worlds/world.model';
import { StatusType } from 'src/app/enums/status-type.enum';
import { CdkVirtualScrollViewport } from '@angular/cdk/scrolling';

@Component({
  selector: 'app-world-details',
  templateUrl: './world-details.component.html',
  styleUrls: ['./world-details.component.css'],
})
export class WorldDetailsComponent implements OnInit {

  private world: World;
  private isPageLoaded: boolean;
    //TODO: CdkVirtualScrollViewport is not correctly working
  @ViewChild(CdkVirtualScrollViewport) cdkVirtualScrollViewport: CdkVirtualScrollViewport;

  constructor(
    private activatedRoute: ActivatedRoute,
    private appService: AppService,
    private worldService: WorldService
  ) { }

  ngOnInit() {
    this.appService.showMainProgressBar(true);
    this.appService.showBackButton(true);
    this.appService.setBackRouterPath('/worlds');

    this.activatedRoute.paramMap.subscribe(params => {
      const worldName = params.get('name');
      if (worldName === null || worldName == '') {
        this.appService.showMainProgressBar(false);
        this.appService.showMessage('You need to provide a valid world name.');
        return;
      }

      this.worldService.getWorld(worldName).subscribe(r => {
        if (r.succeed) {
          r.result.playersOnline.forEach(p => {
            p.status = StatusType.ONLINE;
            p.world = r.result.name;
          });
          this.world = r.result;
          this.isPageLoaded = true;
          this.appService.changeMaintTitle(`World - ${r.result.name}`);
        }
        else {
          this.appService.showMessage('An error occurred while trying to get the world. ' + r.message);
        }
      },
        (error) => {
          console.log(error);
          this.appService.showMessage('An unknown error occurred.');
          this.appService.showMainProgressBar(false);
        },
        () => this.appService.showMainProgressBar(false)
      );
    });
  }

  scrolledIndexChange(event: any) {
    console.log(this.cdkVirtualScrollViewport);
  }
}
