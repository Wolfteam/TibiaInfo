import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { SortDirectionType } from 'src/app/enums/sort-direction-type.enum';
import { Subscription } from 'rxjs';
import { FormControl } from '@angular/forms';
import { ItemModel } from 'src/app/models/item.model';
import { VocationType } from 'src/app/enums/vocation-type.enum';
import { GuildMemberSortFilterType } from 'src/app/enums/guild-member-sort-filter-type.enum';

@Component({
  selector: 'app-guild-details-member-filter',
  templateUrl: './guild-details-member-filter.component.html',
  styleUrls: ['./guild-details-member-filter.component.css']
})
export class GuildDetailsMemberFilterComponent implements OnInit {
  @Output() public filterChangedEvent: EventEmitter<[string, string, GuildMemberSortFilterType, SortDirectionType, number]> = new EventEmitter<[string, string, GuildMemberSortFilterType, SortDirectionType, number]>();
  @Output() public guildMemberSelectedEvent: EventEmitter<string> = new EventEmitter<string>();
  @Output() public guildRankSelectedEvent: EventEmitter<string> = new EventEmitter<string>();
  @Input() public filteredGuildMemberOptions: string[] = [];
  @Input() public filteredGuildRankOptions: string[] = [];

  private subscriptions: Subscription[] = [];
  private guildMemberSearchControl: FormControl = new FormControl();
  private guildRankSearchControl: FormControl = new FormControl();

  private currentGuildMemberSearch: string = '';
  private currentGuildRankSearch: string = '';

  private currentSortOrder: number = GuildMemberSortFilterType.NAME;
  private sortOrders: ItemModel[] = [
    {
      id: GuildMemberSortFilterType.RANK,
      text: 'Rank',
      selected: false
    }, {
      id: GuildMemberSortFilterType.NAME,
      text: 'Name',
      selected: true
    }, {
      id: GuildMemberSortFilterType.LEVEL,
      text: 'Level',
      selected: false
    }, {
      id: GuildMemberSortFilterType.VOCATION,
      text: 'Vocation',
      selected: false
    }, {
      id: GuildMemberSortFilterType.JOINED_DATE,
      text: 'Joined Date',
      selected: false
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
  private currentSortVocation: ItemModel;
  private sortVocations: ItemModel[] = [
    {
      id: -1,
      selected: true,
      text: 'All'
    },
    {
      id: VocationType.NONE,
      selected: false,
      text: 'None'
    }, {
      id: VocationType.DRUID,
      selected: false,
      text: 'Druid'
    },
    {
      id: VocationType.ELDER_DRUID,
      selected: false,
      text: 'Elder Druid'
    },
    {
      id: VocationType.KNIGHT,
      selected: false,
      text: 'Knight'
    },
    {
      id: VocationType.ELITE_KNIGHT,
      selected: false,
      text: 'Elite Knight'
    },
    {
      id: VocationType.SORCERER,
      selected: false,
      text: 'Sorcerer'
    },
    {
      id: VocationType.MASTER_SORCERER,
      selected: false,
      text: 'Master Sorcerer'
    },
    {
      id: VocationType.PALADIN,
      selected: false,
      text: 'Paladin'
    },
    {
      id: VocationType.ROYAL_PALADIN,
      selected: false,
      text: 'Royal Paladin'
    }]

  constructor() { }

  ngOnInit(): void {
    this.currentSortDirection = this.sortDirections[0];
    this.currentSortVocation = this.sortVocations[0];
    this.guildRankSearchControl.valueChanges.subscribe((value: string) => {
      this.currentGuildRankSearch = value;
      this.filterChangedEvent.emit([this.currentGuildMemberSearch, this.currentGuildRankSearch, this.currentSortOrder, this.currentSortDirection.id, this.currentSortVocation.id]);
    });
    this.guildMemberSearchControl.valueChanges.subscribe((value: string) => {
      this.currentGuildMemberSearch = value;
      this.filterChangedEvent.emit([this.currentGuildMemberSearch, this.currentGuildRankSearch, this.currentSortOrder, this.currentSortDirection.id, this.currentSortVocation.id]);
    });
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(s => s.unsubscribe());
  }

  private onGuildMemberSelected(name: string): void {
    this.guildMemberSelectedEvent.emit(name);
  }

  private onGuildRankSelected(name: string): void {
    this.guildRankSelectedEvent.emit(name);
  }

  private onSortOrderChange(sortOrder: number): void {
    this.filterChangedEvent.emit([this.currentGuildMemberSearch, this.currentGuildRankSearch, sortOrder, this.currentSortDirection.id, this.currentSortVocation.id]);
  }

  private onSortDirectionChange(sortDirection: number): void {
    this.filterChangedEvent.emit([this.currentGuildMemberSearch, this.currentGuildRankSearch, this.currentSortOrder, sortDirection, this.currentSortVocation.id]);
  }

  private onSortVocationChange(vocation: number): void {
    this.filterChangedEvent.emit([this.currentGuildMemberSearch, this.currentGuildRankSearch, this.currentSortOrder, this.currentSortDirection.id, vocation]);
  }
}
