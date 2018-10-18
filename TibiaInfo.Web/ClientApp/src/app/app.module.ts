// Modules
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
// import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { RouterModule, Route } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './modules/material.module';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms'

// Components
import { AppComponent } from './app.component';
import { FooterComponent } from './components/general/footer/footer.component';
import { CharacterComponent } from './components/characters/character/character.component';
import { CharacterListComponent } from './components/characters/character-list/character-list.component';
import { CharacterSearchComponent } from './components/characters/character-search/character-search.component';

// Pipes
import { AccountStatusPipe } from './pipes/account-status.pipe';
import { SexPipe } from './pipes/sex.pipe';
import { VocationTtitlePipe } from './pipes/vocation-title.pipe';
import { VocationImagePipe } from './pipes/vocation-image.pipe';
import { StatusPipe } from './pipes/status.pipe'

//Services
import { AppService } from './services/app.service';
import { CharacterService } from './services/character.service';
import { CookieService } from 'ngx-cookie-service';
import { CharacterDetailsComponent } from './components/characters/character-details/character-details.component';

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
    SexPipe,
    VocationImagePipe,
    VocationTtitlePipe,
    StatusPipe,
    CharacterComponent,
    CharacterSearchComponent,
    CharacterDetailsComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MaterialModule,
    HttpClientModule,
    FormsModule,
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
