import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ElasticSearchService } from './elasticsearch.service';
import { PlayApiService } from './play-api.service';

import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatButtonModule, MatCheckboxModule} from '@angular/material';
import {MatListModule} from '@angular/material/list';
import {MatIconModule} from '@angular/material/icon';
import {MatCardModule} from '@angular/material/card';
import {MatChipsModule} from '@angular/material/chips';
import { HttpClientModule } from '@angular/common/http';
import {MatInputModule} from '@angular/material/input';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatAutocompleteModule,MatAutocompleteTrigger} from '@angular/material/autocomplete';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import {MatExpansionModule} from '@angular/material/expansion';
import {HttpModule} from '@angular/http';
import {MatNativeDateModule} from '@angular/material';
import {MatProgressBarModule} from '@angular/material/progress-bar';
//import {MatSliderModule} from '@angular/material/slider';









import { AppComponent } from './app.component';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatButtonModule, 
    MatCheckboxModule,
    MatListModule,
    MatIconModule,
    MatCardModule,
    MatChipsModule,
    MatInputModule,
    FormsModule,
    MatGridListModule,
    MatAutocompleteModule,
    ReactiveFormsModule,
    MatSlideToggleModule,
    MatExpansionModule,
    HttpModule,
    MatNativeDateModule,
    MatProgressBarModule,
    //MatSliderModule
  ],
  providers: [ElasticSearchService,PlayApiService],
  entryComponents: [AppComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }


