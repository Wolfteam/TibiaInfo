// Modules
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
// import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { RouterModule, Route } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './modules/material.module';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { ScrollDispatchModule } from '@angular/cdk/scrolling';
import { ScrollingModule } from '@angular/cdk-experimental/scrolling';

// Components
import { AppComponent } from './app.component';
import { FooterComponent } from './components/general/footer/footer.component';
import { CharacterComponent } from './components/characters/character/character.component';
import { CharacterListComponent } from './components/characters/character-list/character-list.component';
import { CharacterSearchComponent } from './components/characters/character-search/character-search.component';
import { CharacterDetailsComponent } from './components/characters/character-details/character-details.component';
import { WorldComponent } from './components/worlds/world/world.component';
import { WorldListComponent } from './components/worlds/world-list/world-list.component';
import { WorldDetailsComponent } from './components/worlds/world-details/world-details.component';
import { WorldListFilterComponent } from './components/worlds/world-list-filter/world-list-filter.component';
import { WorldDetailsPlayerFilterComponent } from './components/worlds/world-details-player-filter/world-details-player-filter.component';
import { GuildListComponent } from './components/guilds/guild-list/guild-list.component';
import { GuildComponent } from './components/guilds/guild/guild.component';
import { GuildListFilterComponent } from './components/guilds/guild-list-filter/guild-list-filter.component';
import { GuildDetailsComponent } from './components/guilds/guild-details/guild-details.component';
import { GuildDetailsMemberComponent } from './components/guilds/guild-details-member/guild-details-member.component';
import { GuildDetailsMemberFilterComponent } from './components/guilds/guild-details-member-filter/guild-details-member-filter.component';

// Pipes
import { AccountStatusPipe } from './pipes/account-status.pipe';
import { SexPipe } from './pipes/sex.pipe';
import { StatusPipe } from './pipes/status.pipe';
import { TownPipe } from './pipes/town.pipe';
import { VocationTtitlePipe } from './pipes/vocation-title.pipe';
import { VocationImagePipe } from './pipes/vocation-image.pipe';
import { WorldLocationPipe } from './pipes/world-location.pipe';
import { WorldPvpPipe } from './pipes/world-pvp.pipe';

//Services
import { AppService } from './services/app.service';
import { CharacterService } from './services/character.service';
import { CookieService } from 'ngx-cookie-service';

const appRoutes: Route[] = [
  {
    path: 'characters',
    component: CharacterListComponent
  },
  {
    path: 'character/:name',
    component: CharacterDetailsComponent
  },
  {
    path: 'worlds',
    component: WorldListComponent
  },
  {
    path: 'world/:name',
    component: WorldDetailsComponent
  },
  {
    path: 'guilds',
    component: GuildListComponent
  },
  {
    path: 'guild/:name',
    component:GuildDetailsComponent
  },
  {
    path: '',
    redirectTo: '/characters',
    pathMatch: 'full'
  }];



@NgModule({
  declarations: [
    AppComponent,
    CharacterListComponent,
    FooterComponent,
    AccountStatusPipe,
    StatusPipe,
    SexPipe,
    TownPipe,
    VocationImagePipe,
    VocationTtitlePipe,
    CharacterComponent,
    CharacterSearchComponent,
    CharacterDetailsComponent,
    WorldComponent,
    WorldListComponent,
    WorldLocationPipe,
    WorldPvpPipe,
    WorldDetailsComponent,
    WorldListFilterComponent,
    WorldDetailsPlayerFilterComponent,
    GuildListComponent,
    GuildComponent,
    GuildListFilterComponent,
    GuildDetailsComponent,
    GuildDetailsMemberComponent,
    GuildDetailsMemberFilterComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MaterialModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    ScrollDispatchModule,
    ScrollingModule,
    RouterModule.forRoot(appRoutes, { scrollPositionRestoration: 'enabled' })
  ],
  providers: [
    AppService,
    CharacterService,
    CookieService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
