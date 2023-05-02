import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { forkJoin } from 'rxjs';
import { Game } from 'src/app/interfaces/game-interface';
import { ImageGallery } from 'src/app/interfaces/image-gallery-interface';
import { GameService } from 'src/app/services/game.service';

@Component({
  selector: 'app-game-detail',
  templateUrl: './game-detail.component.html',
  styleUrls: ['./game-detail.component.scss']
})
export class GameDetailComponent implements OnInit {
  gameId = 0;
  gameDetails: Game = {} as Game;
  gameScreenshots: ImageGallery = {} as ImageGallery;

  constructor(private readonly activatedRoute: ActivatedRoute, private readonly gameService: GameService) { }

  ngOnInit(): void {
    this.getData();
  }

  getData(): void {
    this.activatedRoute.params.subscribe({
      next: value => this.gameId = value['id']
    });

    forkJoin([this.gameService.getGameDetails(this.gameId), this.gameService.getGameScreenshots(this.gameId)])   
    .subscribe({
      next: ([details,screenshots]) => {
        this.gameDetails = details;
        this.gameScreenshots = screenshots;
        console.log(this.gameScreenshots)
      }
    });
  }
}
