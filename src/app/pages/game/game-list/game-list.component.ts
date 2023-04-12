import { Component, OnInit } from '@angular/core';
import { GameGenre, ParentPlatform, Platform } from 'src/app/interfaces/esrb-rating-interface';
import { Game } from 'src/app/interfaces/game-interface';
import { GameService } from 'src/app/services/game.service';

@Component({
  selector: 'app-game-list',
  templateUrl: './game-list.component.html',
  styleUrls: ['./game-list.component.scss']
})
export class GameListComponent implements OnInit {
  games: Game[] = [];

  constructor(private readonly gameService: GameService) { }

  ngOnInit(): void {
    this.getData();
  }

  getData(): void {
    this.gameService.getGameList().subscribe({
      next: (res: any) => {
        this.games = this.formatData(res['results']);
        console.log(this.games)
      }
    });
  }

  formatData(games: Game[]): Game[] {
    return games.filter((game: Game)=>{
      return game.background_image;
    });
  }
}
