import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GameCardComponent } from './game-card.component';
import {MatCardModule} from '@angular/material/card';
import {MatChipsModule} from '@angular/material/chips';

@NgModule({
  declarations: [
    GameCardComponent
  ],
  imports: [
    CommonModule,
    MatCardModule,
    MatChipsModule
  ],
  exports: [
    GameCardComponent
  ]
})
export class GameCardModule { }
