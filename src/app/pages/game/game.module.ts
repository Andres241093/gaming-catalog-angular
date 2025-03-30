import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GameRoutingModule } from './game-routing.module';
import { GameListComponent } from './game-list/game-list.component';
import { GameCardModule } from 'src/app/shared-components/game-card/game-card.module';
import { PaginatorModule } from 'src/app/shared-components/paginator/paginator.module';
import { SearchBarModule } from 'src/app/shared-components/search-bar/search-bar.module';
import { LoadingModule } from 'src/app/shared-components/loading/loading.module';
import { GameDetailComponent } from './game-detail/game-detail.component';
import { NoResultsModule } from 'src/app/shared-components/no-results/no-results.module';
import { GalleryModule } from 'ng-gallery';
import { MatCardModule } from '@angular/material/card';
import { LightboxModule } from 'ng-gallery/lightbox';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';

@NgModule({
  declarations: [GameListComponent, GameDetailComponent],
  imports: [
    CommonModule,
    GameRoutingModule,
    PaginatorModule,
    SearchBarModule,
    LoadingModule,
    NoResultsModule,
    GalleryModule,
    MatCardModule,
    LightboxModule,
    //News
    MatToolbarModule,
    MatInputModule,
    FormsModule,
    GameCardModule,
    MatDividerModule,
    MatIconModule,
  ],
})
export class GameModule {}
