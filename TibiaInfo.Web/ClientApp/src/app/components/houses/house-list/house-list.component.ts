import { Component, OnInit, OnDestroy } from '@angular/core';
import { AppService } from 'src/app/services/app.service';
import { HouseService } from 'src/app/services/house.service';
import { Subscription } from 'rxjs';
import { HouseListSearchEvent } from 'src/app/models/events/house-list-search.event';
import { AllHouses } from 'src/app/models/houses/all-houses.model';
import { SimpleHouse } from 'src/app/models/houses/simple-house.model';

@Component({
  selector: 'app-house-list',
  templateUrl: './house-list.component.html',
  styleUrls: ['./house-list.component.css']
})
export class HouseListComponent implements OnInit, OnDestroy {
  //TODO: Loading indicator does not hide when you fast switch between pages
  showHouses: boolean = false;
  private subscriptions: Subscription[] = [];
  private allHouses: AllHouses;
  filteredHouses: SimpleHouse[] = [];
  houseOptions: string[] = [];

  constructor(
    private appService: AppService,
    private houseService: HouseService
  ) { }

  ngOnInit(): void {
    this.appService.changeMaintTitle('Houses');
    this.appService.showBackButton(false);
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(s => s.unsubscribe());
  }

  searchHouses(event: HouseListSearchEvent): void {
    this.showHouses = false;
    this.appService.showMainProgressBar(true);

    this.subscriptions.push(
      this.houseService
        .getAllHouses(event.world, event.town, event.houseType, event.houseStatus, event.sortBy, event.sortDirection)
        .subscribe(r => {
          if (r.succeed) {
            this.allHouses = r.result;
            this.filterHouses('');
            this.houseOptions = this.allHouses.houses.map(h => h.name).sort();
            this.showHouses = true;
          } else {
            this.appService.showMessage(`An error occurred while trying to get all the houses for world : ${event.world}. ${r.message}`)
          }
        }, (error) => {
          console.log(error);
          this.appService.showMessage('An unkwnown error occurred while trying to get all the houses');
          this.appService.showMainProgressBar(false);
        },
          () => this.appService.showMainProgressBar(false))
    );
  }

  filterHouses(value: string) {
    this.filteredHouses = this.allHouses.houses
      .filter(h => h.name.toLowerCase().includes(value.toLowerCase()));
  }
}
