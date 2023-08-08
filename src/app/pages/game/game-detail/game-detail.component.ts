import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { GalleryItem, ImageItem, VideoItem } from 'ng-gallery';
import { forkJoin } from 'rxjs';
import { Game } from 'src/app/interfaces/game-interface';
import { ImageDetails } from 'src/app/interfaces/image-gallery-interface';
import { Screenshot } from 'src/app/interfaces/screenshot-interface';
import { VideoData } from 'src/app/interfaces/video-data-interface';
import { GameService } from 'src/app/services/game.service';
import { LoadingService } from 'src/app/services/loading.service';

@Component({
  selector: 'app-game-detail',
  templateUrl: './game-detail.component.html',
  styleUrls: ['./game-detail.component.scss']
})
export class GameDetailComponent implements OnInit {
  gameId = 0;
  gameDetails: Game = {} as Game;
  gameImages: GalleryItem[] = [];
  gameScreenshots: Screenshot = {} as Screenshot;
  videoData: VideoData = {} as VideoData;

  constructor(private readonly activatedRoute: ActivatedRoute, 
    private readonly gameService: GameService,
    private readonly loadingService: LoadingService) { }

  ngOnInit(): void {
    this.getData();
  }

  getData(): void {
    this.activatedRoute.params.subscribe({
      next: value => this.gameId = value['id']
    });

    forkJoin([this.gameService.getGameDetails(this.gameId), 
      this.gameService.getGameScreenshots(this.gameId),
      this.gameService.getVideos(this.gameId)])   
    .subscribe({
      next: ([details,screenshots,videosData]) => {
        this.videoData = videosData;
        this.gameDetails = details;
        this.gameScreenshots = screenshots;
        const video = `https://www.youtube.com/embed/${this.videoData.items[0].id}`
        const videoThumb = `https://i3.ytimg.com/vi/${this.videoData.items[0].id}/maxresdefault.jpg`;
        screenshots.results.forEach((imageData: ImageDetails) => {
          const image = new ImageItem({src: imageData.image, thumb: imageData.image})
          this.gameImages.push(image);
        });
        this.gameImages.push(new VideoItem({src: video,thumb: videoThumb}))
        this.loadingService.hide();
      }
    });
  }
}
