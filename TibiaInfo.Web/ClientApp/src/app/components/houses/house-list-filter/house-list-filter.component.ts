import { Component, OnInit, Output, Input, EventEmitter, AfterViewInit, OnDestroy } from '@angular/core';
import { AppService } from 'src/app/services/app.service';
import { WorldService } from 'src/app/services/world.service';
import { Subscription } from 'rxjs';
import { FormControl } from '@angular/forms';
import { TownsType } from 'src/app/enums/towns-type.enum';
import { HouseListSearchEvent } from '../../../models/events/house-list-search.event';
import { HouseType } from 'src/app/enums/house-type.enum';
import { ItemModel } from 'src/app/models/item.model';
import { SortDirectionType } from 'src/app/enums/sort-direction-type.enum';
import { HouseStatusType } from 'src/app/enums/house-status-type.enum';

@Component({
  selector: 'app-house-list-filter',
  templateUrl: './house-list-filter.component.html',
  styleUrls: ['./house-list-filter.component.css']
})
export class HouseListFilterComponent implements OnInit, AfterViewInit, OnDestroy {

  @Output() public searchHousesEvent = new EventEmitter<HouseListSearchEvent>();
  @Output() public houseSearchControlChange = new EventEmitter<string>();
  private _houseOptions: string[];
  @Input()
  get houseOptions(): string[] {
    return this._houseOptions;
  }
  set houseOptions(houses: string[]) {
    this._houseOptions = houses;
    this.filteredHouseOptions = this.getHouseSearchOptions('');
  }

  @Input() public showAdditionalFilters: boolean = false;

  private isPageLoaded: boolean = false;
  private subscriptions: Subscription[] = [];

  private worldSearchControl = new FormControl();
  private houseSearchControl = new FormControl();

  private currentWorld: string;
  private worlds: string[] = [];
  private filteredWorldOptions: string[] = [];

  private filteredHouseOptions: string[] = [];

  private currentTown: TownsType;
  private townsOptions: TownsType[] = [
    // TownsType.AB_DENDRIEL,
    // TownsType.ANKRAHMUN,
    // TownsType.CARLIN,
    // TownsType.DARASHIA,
    // TownsType.EDRON,
    // TownsType.FARMINE,
    // TownsType.GRAY_BEACH,
    // TownsType.KAZORDOON,
    // TownsType.LIBERTY_BAY,
    // TownsType.PORT_HOPE,
    // TownsType.RATHLETON,
    // TownsType.SVARGROND,
    // TownsType.THAIS,
    // TownsType.VENORE,
    // TownsType.YALAHAR
  ];

  private currentHouseStatus: ItemModel;
  private houseStatusOptions: ItemModel[] = [
    {
      id: -1,
      selected: true,
      text: 'All'
    },
    {
      id: HouseStatusType.AUCTIONED_NO_BID,
      selected: false,
      text: 'Auctioned (No bid)'
    },
    {
      id: HouseStatusType.AUCTIONED_BID,
      selected: false,
      text: 'Auctioned (Bid)'
    },
    {
      id: HouseStatusType.RENTED,
      selected: false,
      text: 'Rented'
    }];

  private currentSortDirection: ItemModel;
  private sortDirections: ItemModel[] = [
    {
      id: SortDirectionType.ASCENDING,
      text: 'Ascending',
      selected: true
    }, {
      id: SortDirectionType.DESCENDING,
      text: 'Descending',
      selected: false
    }];

  private currentSortOrder: ItemModel;
  private sortOrders: ItemModel[] = [
    {
      id: 0,
      text: 'Name',
      selected: true
    },
    {
      id: 1,
      text: 'Size',
      selected: false
    },
    {
      id: 2,
      text: 'Rent',
      selected: false
    },
    {
      id: 3,
      text: 'Bid',
      selected: false
    },
    {
      id: 4,
      text: 'Auction End',
      selected: false
    }];
  private currentHouseType: string = 'Houses';
  private _showGuildHalls: boolean = false;
  get showGuildHalls(): boolean {
    return this._showGuildHalls;
  }
  set showGuildHalls(show: boolean) {
    this.currentHouseType = show ? 'GuildHalls' : 'Houses';
    console.log(this.currentHouseType);
    this._showGuildHalls = show;
  }

  constructor(
    private appService: AppService,
    private worldService: WorldService
  ) { }

  ngOnInit(): void {
    this.townsOptions = Object.keys(TownsType).filter(key => isNaN(Number(TownsType[key]))).map(n => +n);
    this.currentTown = this.townsOptions[0];
    this.currentSortOrder = this.sortOrders.find(s => s.selected);
    this.currentHouseStatus = this.houseStatusOptions.find(s => s.selected);
    this.currentSortDirection = this.sortDirections.find(s => s.selected);

    this.appService.showMainProgressBar(true);
    this.subscriptions.push(
      this.worldService.getAllWorlds().subscribe(r => {
        if (r.succeed) {
          this.worlds = r.result.worlds.map(world => world.name);
          this.filteredWorldOptions = this.worlds;
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
    )
  }

  ngAfterViewInit(): void {
    this.subscriptions.push(
      this.worldSearchControl.valueChanges.subscribe((value: string) => {
        this.currentWorld = value;
        this.filteredWorldOptions = this.getWorldSearchOptions(value)
      }),
      this.houseSearchControl.valueChanges.subscribe((value: string) => {
        this.filteredHouseOptions = this.getHouseSearchOptions(value);
        this.houseSearchControlChange.emit(value);
      })
    )
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(s => s.unsubscribe());
  }

  private getWorldSearchOptions(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.worlds
      .filter(world => world.toLowerCase().includes(filterValue))
  }

  private getHouseSearchOptions(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.houseOptions
      .filter(house => house.toLowerCase().includes(filterValue))
  }

  private searchHouses(): void {
    if (this.worlds.indexOf(this.currentWorld) < 0) {
      this.appService.showMessage('You must select world');
      return;
    }

    if (this.townsOptions.indexOf(this.currentTown) < 0) {
      this.appService.showMessage('You must select a town');
      return;
    }

    this.searchHousesEvent.emit({
      houseType: this.showGuildHalls ? HouseType.GUILD_HALLS : HouseType.HOUSE,
      town: this.currentTown,
      world: this.currentWorld,
      sortBy: this.currentSortOrder.text.toLowerCase().replace(' ', '_'),
      sortDirection: this.currentSortDirection.id,
      houseStatus: this.currentHouseStatus.id
    });
  }
}
