import { Component, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { Game } from 'src/app/interfaces/game-interface';
import { GameService } from 'src/app/services/game.service';

@Component({
  selector: 'app-game-list',
  templateUrl: './game-list.component.html',
  styleUrls: ['./game-list.component.scss']
})
export class GameListComponent implements OnInit {
  games: Game[] = [];
  length = 0;

  constructor(private readonly gameService: GameService) { }

  ngOnInit(): void {
    this.getData();
  }

  getData(): void {
    this.gameService.getGameList().subscribe({
      next: (res: any) => {
        this.length = res.count;
        this.games = this.formatData(res['results']);
      }
    });
  }

  formatData(games: Game[]): Game[] {
    return games.filter((game: Game)=>{
      return game.background_image;
    });
  }

  onChangePage(event: PageEvent){
    this.gameService.getGameListPerPage(event.pageSize,event.pageIndex + 1)
    .subscribe({
      next: (res: any) => {
        this.games = this.formatData(res['results']);
      }
    });
  }
}
