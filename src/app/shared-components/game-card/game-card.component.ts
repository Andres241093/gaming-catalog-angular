import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { Game } from 'src/app/interfaces/game-interface';

@Component({
  selector: 'app-game-card',
  templateUrl: './game-card.component.html',
  styleUrls: ['./game-card.component.scss']
})
export class GameCardComponent {
  @Input() game: Game = {} as Game;

  constructor(private readonly route: Router){}

  showGameDetail(): void {
    this.route.navigate(['/games',this.game.id]);
  }
}
