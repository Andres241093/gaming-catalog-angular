import { Component, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { Game } from 'src/app/interfaces/game-interface';
import { GameService } from 'src/app/services/game.service';
import { LoadingService } from 'src/app/services/loading.service';

@Component({
  selector: 'app-game-list',
  templateUrl: './game-list.component.html',
  styleUrls: ['./game-list.component.scss']
})
export class GameListComponent implements OnInit {
  games: Game[] = [];
  length = 0;
  isLoading = false;
  disablePaginator = false;
  title = 'All games';

  constructor(private readonly gameService: GameService, 
    private readonly loadingService: LoadingService) { }

  ngOnInit(): void {
    this.getData();
  }

  getData(): void {
    this.gameService.getGameList().subscribe({
      next: (res: any) => {
        this.length = res.count;
        this.games = this.formatData(res['results']);
        this.loadingService.hide();
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
    this.gameService.getGameListPerPage(event.pageSize,event.pageIndex + 1)
    .subscribe({
      next: (res: any) => {
        this.games = this.formatData(res['results']);
        this.loadingService.hide();
      }
    });
  }

  searchValue(value: string): void {
    if(value){
      this.triggerLoading(true);
      this.gameService.searchGame(value)
      .subscribe({
        next: (res) => {
          this.changeTitle('Search results');
          this.triggerLoading(false);
          this.disablePaginator = true;
          this.length = res.count;
          this.games = this.formatData(res['results']);
          this.loadingService.hide();
        }
      });
    }else{
      this.disablePaginator = false;
      this.triggerLoading(false);
      this.changeTitle('All games');
      this.getData();
    }
  }

  triggerLoading(value: boolean): void {
    this.loadingService.cancelLoading(value);
    this.isLoading = value;
  }
}
