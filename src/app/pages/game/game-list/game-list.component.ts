import { Component, HostListener, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Subject } from 'rxjs';
import { takeUntil, switchMap, finalize } from 'rxjs/operators';
import { Game, Screenshot } from 'src/app/interfaces/game-interface';
import { GameService } from 'src/app/services/game.service';

@Component({
  selector: 'app-game-list',
  templateUrl: './game-list.component.html',
  styleUrls: ['./game-list.component.scss'],
})
export class GameListComponent implements OnInit, OnDestroy {
  @HostListener('window:scroll', ['$event'])
  onScroll(): void {
    if (this.isNearBottom()) {
      this.loadMoreGames();
    }
  }

  games: Game[] = [];
  isLoading = false;
  imageSrc = '';
  private destroy$ = new Subject<void>();

  private pagination$ = new BehaviorSubject<{
    pageSize: number;
    pageIndex: number;
    search?: string;
  }>({
    pageSize: 15,
    pageIndex: 1,
  });

  constructor(
    private readonly gameService: GameService,
    private readonly router: Router
  ) {}

  ngOnInit(): void {
    this.initializeDataStream();
  }

  search(value: string): void {
    this.games = [];
    this.pagination$.next({
      pageSize: 15,
      pageIndex: 1,
      search: value || undefined,
    });
  }

  private initializeDataStream(): void {
    this.pagination$
      .pipe(
        takeUntil(this.destroy$),
        switchMap((params) => {
          this.isLoading = true;
          return this.gameService
            .getGameListPerPage(params)
            .pipe(finalize(() => (this.isLoading = false)));
        })
      )
      .subscribe({
        next: (res) => {
          this.games = [...this.games, ...this.formatData(res.results)];
        },
      });
  }

  private formatData(games: Game[]): Game[] {
    return games.filter((game) => game.background_image);
  }

  private isNearBottom(): boolean {
    return (
      window.innerHeight + window.scrollY >=
      document.documentElement.scrollHeight - 10
    );
  }

  private loadMoreGames(): void {
    if (!this.isLoading) {
      this.isLoading = true;
      this.pagination$.next({
        ...this.pagination$.value,
        pageIndex: this.pagination$.value.pageIndex + 1,
      });
    }
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
