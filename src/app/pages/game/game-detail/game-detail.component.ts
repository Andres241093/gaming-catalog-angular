import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { GalleryItem, ImageItem, VideoItem, YoutubeItem } from 'ng-gallery';
import { BehaviorSubject, Subject, forkJoin, takeUntil } from 'rxjs';
import { Game } from 'src/app/interfaces/game-interface';
import { ImageDetails } from 'src/app/interfaces/image-gallery-interface';
import { Screenshot } from 'src/app/interfaces/screenshot-interface';
import { VideoData } from 'src/app/interfaces/video-data-interface';
import { GameService } from 'src/app/services/game.service';
import { LoadingService } from 'src/app/services/loading.service';

@Component({
  selector: 'app-game-detail',
  templateUrl: './game-detail.component.html',
  styleUrls: ['./game-detail.component.scss'],
})
export class GameDetailComponent implements OnInit, OnDestroy {
  gameId = 0;
  gameDetails: Game = {} as Game;
  gameImages: GalleryItem[] = [];
  gameScreenshots: Screenshot = {} as Screenshot;
  videoData: VideoData = {} as VideoData;
  destroyObs: Subject<boolean> = new Subject();
  isLoading = false;
  YTitem: SafeResourceUrl = '';

  constructor(
    private readonly activatedRoute: ActivatedRoute,
    private readonly gameService: GameService,
    public sanitizer: DomSanitizer
  ) {}

  ngOnInit(): void {
    this.getData();
  }

  getData(): void {
    this.isLoading = true;
    this.activatedRoute.params.subscribe({
      next: (value) => (this.gameId = value['id']),
    });

    forkJoin([
      this.gameService.getGameDetails(this.gameId),
      this.gameService.getGameScreenshots(this.gameId),
    ])
      .pipe(takeUntil(this.destroyObs))
      .subscribe({
        next: ([details, screenshots]) => {
          this.gameDetails = details;
          this.gameScreenshots = screenshots;
          this.getVideo(this.gameDetails.name);
        },
      });
  }

  getVideo(name: string): void {
    this.gameService
      .getVideos(this.gameId, name)
      .pipe(takeUntil(this.destroyObs))
      .subscribe({
        next: (video) => {
          const videoId = video.items[0].id.videoId;
          this.YTitem = this.sanitizer.bypassSecurityTrustResourceUrl(
            `https://www.youtube.com/embed/${videoId.toString()}`
          );
          this.setImages(this.gameScreenshots.results);
        },
        error: (err) => this.setImages(this.gameScreenshots.results),
      });
  }
  setImages(results: ImageDetails[]): void {
    results.forEach((imageData: ImageDetails) => {
      const image = new ImageItem({
        src: imageData.image,
        thumb: imageData.image,
      });
      this.gameImages.push(image);
    });
    this.isLoading = false;
  }

  ngOnDestroy(): void {
    this.destroyObs.next(true);
  }
}
