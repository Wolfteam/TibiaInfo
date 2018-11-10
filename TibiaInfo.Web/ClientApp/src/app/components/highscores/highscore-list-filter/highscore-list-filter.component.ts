import { Component, OnInit, OnDestroy, Input, EventEmitter, Output, AfterViewInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { WorldService } from 'src/app/services/world.service';
import { AppService } from 'src/app/services/app.service';
import { FormControl, FormGroup } from '@angular/forms';
import { HighScoreType } from 'src/app/models/highscores/highscore-type.enum';
import { VocationType } from 'src/app/enums/vocation-type.enum';
import { ItemModel } from 'src/app/models/item.model';
import { SortDirectionType } from 'src/app/enums/sort-direction-type.enum';
import { HighScoreListFilterType } from 'src/app/enums/highscore-list-filter-type.enum';

@Component({
  selector: 'app-highscore-list-filter',
  templateUrl: './highscore-list-filter.component.html',
  styleUrls: ['./highscore-list-filter.component.css']
})
export class HighscoreListFilterComponent implements OnInit, OnDestroy, AfterViewInit {

  @Output() searchHighScoresEvent: EventEmitter<[string, HighScoreType, VocationType]> = new EventEmitter<[string, HighScoreType, VocationType]>();
  @Output() filterChangeEvent: EventEmitter<[string, HighScoreListFilterType, SortDirectionType]> = new EventEmitter<[string, HighScoreListFilterType, SortDirectionType]>();
  @Input() showAdditionalFilters: boolean = false;
  private _isMainFilterEnabled: boolean = true;
  @Input()
  get isMainFilterEnabled(): boolean {
    return this._isMainFilterEnabled;
  }
  set isMainFilterEnabled(isEnabled: boolean) {
    this._isMainFilterEnabled = isEnabled;
    if (!isEnabled)
      this.highScoreFilterForm.disable({ emitEvent: false });
    else
      this.highScoreFilterForm.enable({ emitEvent: false });
  }
  @Input() filteredCharacterOptions: string[] = [];

  isPageLoaded: boolean = false;

  highScoreFilterForm: FormGroup;
  additionalFiltersForm: FormGroup;

  filteredWorldOptions: string[] = [];
  private worlds: string[] = [];

  currentHighscore: HighScoreType;
  highscoresOptions: HighScoreType[] = [];

  currentVocation: VocationType;
  vocationOptions: VocationType[] = [];

  sortOrders: ItemModel[] = [
    {
      id: HighScoreListFilterType.RANK,
      text: 'Rank',
      selected: true
    },
    {
      id: HighScoreListFilterType.NAME,
      text: 'Name',
      selected: false
    },
    {
      id: HighScoreListFilterType.POINTS,
      text: 'Points',
      selected: false
    },
    {
      id: HighScoreListFilterType.LEVEL_POINTS,
      text: 'Level',
      selected: false
    }, {
      id: HighScoreListFilterType.VOCATION,
      text: 'Vocation',
      selected: false
    }];

  currentSortDirection: ItemModel;
  sortDirections: ItemModel[] = [
    {
      id: SortDirectionType.ASCENDING,
      text: 'Ascending',
      selected: true
    }, {
      id: SortDirectionType.DESCENDING,
      text: 'Descending',
      selected: false
    }];

  private subscription: Subscription[] = [];

  constructor(
    private appService: AppService,
    private worldService: WorldService
  ) {
    this.highscoresOptions = Object.keys(HighScoreType).filter(key => isNaN(Number(HighScoreType[key]))).map(n => +n);
    const allowedVocations: number[] = [
      VocationType.ALL,
      VocationType.DRUID,
      VocationType.PALADIN,
      VocationType.KNIGHT,
      VocationType.SORCERER
    ];
    this.vocationOptions = Object.keys(VocationType)
      .filter(key => isNaN(Number(VocationType[key])) && allowedVocations.indexOf(+key) >= 0)
      .map(n => +n);

    this.currentHighscore = HighScoreType.EXPERIENCE;
    this.currentVocation = VocationType.ALL;
    this.currentSortDirection = this.sortDirections[0];

    this.highScoreFilterForm = new FormGroup({
      worldSearchControl: new FormControl(),
      highscoresTypesControl: new FormControl(this.currentHighscore),
      vocationTypesControl: new FormControl(this.currentVocation)
    });
    this.additionalFiltersForm = new FormGroup({
      characterSearchControl: new FormControl(),
      sortDirectionControl: new FormControl(this.currentSortDirection),
      sortOrderControl: new FormControl(HighScoreListFilterType.RANK)
    });
  }

  ngOnInit(): void {
    this.appService.showMainProgressBar(true);
    this.subscription.push(
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
        () => this.appService.showMainProgressBar(false)
      )
    );
  }

  ngAfterViewInit(): void {
    this.subscription.push(
      this.highScoreFilterForm.controls['worldSearchControl'].valueChanges.subscribe((value: string) => {
        this.filteredWorldOptions = this.getWorldSearchOptions(value);
      }),
      this.additionalFiltersForm.controls['characterSearchControl'].valueChanges.subscribe((value: string) => {
        this.filterChangeEvent.emit([
          value,
          <HighScoreListFilterType>this.additionalFiltersForm.controls['sortOrderControl'].value,
          (<ItemModel>this.additionalFiltersForm.controls['sortDirectionControl'].value).id,
        ]);
      }),
      this.additionalFiltersForm.controls['sortDirectionControl'].valueChanges.subscribe((value: ItemModel) => {
        this.onSortDirectionChange(value.id);
      })
    );
  }

  ngOnDestroy(): void {
    this.subscription.forEach(s => s.unsubscribe());
  }

  searchHighScores(): void {
    if (this.worlds.indexOf(this.highScoreFilterForm.controls['worldSearchControl'].value) < 0) {
      this.appService.showMessage('You must select a world');
      return;
    }
    this.searchHighScoresEvent.emit([
      this.highScoreFilterForm.controls['worldSearchControl'].value,
      this.currentHighscore,
      this.currentVocation
    ]);
    this.additionalFiltersForm.reset({
      characterSearchControl: null,
      sortDirectionControl: this.sortDirections[0],
      sortOrderControl: HighScoreListFilterType.RANK
    }, { emitEvent: false, onlySelf: true });
  }

  onSortDirectionChange(sortDirection: SortDirectionType): void {
    this.filterChangeEvent.emit([
      this.additionalFiltersForm.controls['characterSearchControl'].value,
      <HighScoreListFilterType>this.additionalFiltersForm.controls['sortOrderControl'].value,
      sortDirection
    ]);
  }

  onSortOrderChange(sortOrder: HighScoreListFilterType): void {
    this.filterChangeEvent.emit([
      this.additionalFiltersForm.controls['characterSearchControl'].value,
      sortOrder,
      (<ItemModel>this.additionalFiltersForm.controls['sortDirectionControl'].value).id
    ]);
  }

  private getWorldSearchOptions(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.worlds
      .filter(world => world.toLowerCase().includes(filterValue))
  }
}
