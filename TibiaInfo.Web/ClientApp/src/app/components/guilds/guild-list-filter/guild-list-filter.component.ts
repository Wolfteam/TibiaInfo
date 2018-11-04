import { Component, OnInit, Output, EventEmitter, Input, OnDestroy } from '@angular/core';
import { AppService } from 'src/app/services/app.service';
import { WorldService } from 'src/app/services/world.service';
import { FormControl } from '@angular/forms';
import { Subscription } from 'rxjs';
import { MatAutocompleteSelectedEvent } from '@angular/material';
import { ItemModel } from 'src/app/models/item.model';
import { SortDirectionType } from 'src/app/enums/sort-direction-type.enum';

@Component({
  selector: 'app-guild-list-filter',
  templateUrl: './guild-list-filter.component.html',
  styleUrls: ['./guild-list-filter.component.css']
})
export class GuildListFilterComponent implements OnInit, OnDestroy {

  @Output() public worldSelectionChangeEvent: EventEmitter<string> = new EventEmitter<string>();
  @Output() public sortDirectionChangeEvent: EventEmitter<[string, SortDirectionType]> = new EventEmitter<[string, SortDirectionType]>();
  @Input() public showAdditionalFilters: boolean = false;
  @Input() public filteredGuildsOptions: string[] = [];
  private _isWorldSearchControlEnabled: boolean = true;
  @Input()
  get isWorldSearchControlEnabled(): boolean {
    return this._isWorldSearchControlEnabled;
  }
  set isWorldSearchControlEnabled(isEnabled: boolean) {
    this._isWorldSearchControlEnabled = isEnabled;
    if (!isEnabled)
      this.worldSearchControl.disable();
    else
      this.worldSearchControl.enable();
  }


  private isPageLoaded: boolean = false;
  private subscriptions: Subscription[] = [];
  private worldSearchControl = new FormControl();
  private worlds: string[] = [];
  private currentSelectedWorld: string;
  private filteredWorldOptions: string[] = [];

  private guildSearchControl = new FormControl();
  private currentSearch: string = '';
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

  constructor(
    private appService: AppService,
    private worldService: WorldService
  ) { }

  ngOnInit(): void {
    this.currentSortDirection = this.sortDirections[0];
    this.appService.showMainProgressBar(true);
    this.subscriptions.push(
      this.worldSearchControl.valueChanges.subscribe((value: string) =>
        this.filteredWorldOptions = this.getWorldSearchOptions(value)
      ),

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
        () => this.appService.showMainProgressBar(false)),

      this.guildSearchControl.valueChanges.subscribe((value: string) =>
        this.sortDirectionChangeEvent.emit([value, this.currentSortDirection.id])
      )
    );
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(s => s.unsubscribe());
  }

  private getWorldSearchOptions(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.worlds
      .filter(world => world.toLowerCase().includes(filterValue))
  }

  private onWorldSelected(event: MatAutocompleteSelectedEvent): void {
    this.currentSelectedWorld = event.option.value;
    this.worldSelectionChangeEvent.emit(this.currentSelectedWorld);
  }

  private onSortDirectionChange(sortDirection: SortDirectionType): void {
    console.log("Sort direction changed");
    this.sortDirectionChangeEvent.emit([this.currentSearch, sortDirection]);
  }
}
