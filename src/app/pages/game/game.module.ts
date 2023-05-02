import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GameRoutingModule } from './game-routing.module';
import { GameListComponent } from './game-list/game-list.component';
import { GameCardModule } from 'src/app/shared-components/game-card/game-card.module';
import { PaginatorModule } from 'src/app/shared-components/paginator/paginator.module';
import { SearchBarModule } from 'src/app/shared-components/search-bar/search-bar.module';
import { LoadingModule } from 'src/app/shared-components/loading/loading.module';

@NgModule({
  declarations: [GameListComponent],
  imports: [
    CommonModule,
    GameRoutingModule,
    GameCardModule,
    PaginatorModule,
    SearchBarModule,
    LoadingModule
  ]
})
export class GameModule { }
