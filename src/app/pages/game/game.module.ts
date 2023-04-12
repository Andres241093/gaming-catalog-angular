import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GameRoutingModule } from './game-routing.module';
import { GameListComponent } from './game-list/game-list.component';
import { GameCardModule } from 'src/app/shared-components/game-card/game-card.module';


@NgModule({
  declarations: [GameListComponent],
  imports: [
    CommonModule,
    GameRoutingModule,
    GameCardModule
  ]
})
export class GameModule { }
