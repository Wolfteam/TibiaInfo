import { Component, OnInit } from '@angular/core';
import { House } from 'src/app/models/houses/house.model';
import { HouseService } from 'src/app/services/house.service';
import { AppService } from 'src/app/services/app.service';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-house-details',
  templateUrl: './house-details.component.html',
  styleUrls: ['./house-details.component.css']
})
export class HouseDetailsComponent implements OnInit {

  private house: House;
  private isPageLoaded: boolean = false;
  private subscriptions: Subscription[] = [];

  constructor(
    private appService: AppService,
    private houseService: HouseService,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.appService.showMainProgressBar(true);
    this.appService.showBackButton(true);
    this.appService.setBackRouterPath('/houses');

    this.subscriptions.push(
      this.activatedRoute.paramMap.subscribe(params => {
        const world = params.get('world');
        const houseId = params.get('id');
        if (houseId === null || world === null) {
          this.appService.showMessage('You need to provide a valid world name and a house id');
          return;
        }
        this.appService.changeMaintTitle(`Houses - ${world} - ${houseId}`);

        this.houseService.getHouse(world, +houseId).subscribe(r => {
          if (r.succeed) {
            this.house = r.result;
            this.isPageLoaded = true;
          } else {
            this.appService.showMessage('An error occurred while trying to get all the worlds. ' + r.message);
          }
        }, (error) => {
          console.log(error);
          this.appService.showMainProgressBar(false)
          this.appService.showMessage('An unknown error occurred while trying to get all the worlds.');
        },
          () => this.appService.showMainProgressBar(false))
      })
    );
  }

}
