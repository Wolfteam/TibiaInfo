import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
// import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { RouterModule, Route } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './modules/materia.module';
import { HttpClientModule } from '@angular/common/http';

// Components
import { AppComponent } from './app.component';
import { FooterComponent } from './components/general/footer/footer.component';
import { CharacterComponent } from './components/characters/character/character.component';
import { CharacterListComponent } from './components/characters/character-list/character-list.component';

// Pipes
import { VocationTtitlePipe } from './pipes/vocationTitle.pipe';
import { VocationImagePipe } from './pipes/vocationImage.pipe';
import { _appIdRandomProviderFactory } from '@angular/core/src/application_tokens';

import { CharacterService } from './services/character.service';


const appRoutes: Route[] = [
  {
    path: 'characters',
    component: CharacterListComponent
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
    VocationImagePipe,
    VocationTtitlePipe,
    CharacterComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MaterialModule,
    HttpClientModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [CharacterService],
  bootstrap: [AppComponent]
})
export class AppModule { }
