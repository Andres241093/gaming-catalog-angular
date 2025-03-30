import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Game, Screenshot } from 'src/app/interfaces/game-interface';

@Component({
  selector: 'app-game-card',
  templateUrl: './game-card.component.html',
  styleUrls: ['./game-card.component.scss'],
})
export class GameCardComponent implements OnInit {
  @Input() game: Game = {} as Game;
  imageSrc = '';
  private interval: any;

  constructor(private readonly route: Router) {}

  ngOnInit(): void {
    this.imageSrc = this.game.background_image;
  }

  startImageRotation(screenshots: Screenshot[]): void {
    let index = 0;
    this.interval = setInterval(() => {
      index = (index + 1) % screenshots.length;
      const newImage = new Image();
      newImage.src = screenshots[index].image;

      newImage.onload = () => {
        this.imageSrc = screenshots[index].image;
      };
    }, 500);
  }

  stopImageRotation(originalImage: string): void {
    clearInterval(this.interval);
    this.imageSrc = originalImage;
  }

  showGameDetail(): void {
    this.route.navigate(['/games', this.game.id]);
  }
}
