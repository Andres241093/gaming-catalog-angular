import { Component, OnDestroy, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { ActivatedRoute } from '@angular/router';
import { Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, takeUntil } from 'rxjs/operators';
import { Game } from 'src/app/interfaces/game-interface';
import { GameService } from 'src/app/services/game.service';
import { LoadingService } from 'src/app/services/loading.service';

@Component({
  selector: 'app-game-list',
  templateUrl: './game-list.component.html',
  styleUrls: ['./game-list.component.scss']
})
export class GameListComponent implements OnInit, OnDestroy {
  games: Game[] = [];
  length = 0;
  disablePaginator = false;
  title = 'All games';
  destroyObs: Subject<boolean> = new Subject();
  isLoading = false;

  constructor(private readonly gameService: GameService, 
    private readonly loadingService: LoadingService,
    private readonly activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    const value = localStorage.getItem('search');
    if(value){
      this.searchValue(value)
    }else{
      this.getData();
    }
  }

  getData(): void {
    this.isLoading = true;
    this.gameService.getGameList()
    .pipe(takeUntil(this.destroyObs)) 
    .subscribe({
      next: (res: any) => {
        this.length = res.count;
        this.games = this.formatData(res['results']);
        this.isLoading = false;
      }
    });
  }

  formatData(games: Game[]): Game[] {
    return games.filter((game: Game)=>{
      return game.background_image;
    });
  }

  changeTitle(newTitle: string): void {
    this.title = newTitle;
  }

  onChangePage(event: PageEvent){
    this.isLoading = true;
    this.gameService.getGameListPerPage(event.pageSize,event.pageIndex + 1)
    .pipe(takeUntil(this.destroyObs)) 
    .subscribe({
      next: (res: any) => {
        this.games = this.formatData(res['results']);
        this.isLoading = false;
      }
    });
  }

  searchValue(value: string): void {
    if(value.length > 0){
      this.isLoading = true;
      this.gameService.searchGame(value)
      .pipe(
        takeUntil(this.destroyObs),
        debounceTime(500),
        distinctUntilChanged()
        ) 
      .subscribe({
        next: (res) => {
          this.changeTitle('Search results');
          this.disablePaginator = true;
          this.length = res.count;
          this.games = this.formatData(res['results']);
          this.isLoading = false;
        }
      });
    }else{
      this.disablePaginator = false;
      this.changeTitle('All games');
      this.getData();
    }
  }

  ngOnDestroy(): void {
    this.destroyObs.next(true);
  }
}
