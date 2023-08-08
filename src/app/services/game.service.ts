import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { PAGINATOR_INITIAL_VALUES } from '../const/paginator-initial-values';
import { Screenshot } from '../interfaces/screenshot-interface';
import { VideoData } from '../interfaces/video-data-interface';

@Injectable({
  providedIn: 'root'
})
export class GameService {
  url = environment.url;
  apiKey = environment.api_key;
  youtubeUrl = environment.YOUTUBE_URL;
  youtubeKey = environment.YOUTUBE_API_KEY;
  publishers = 'electronic-arts,microsoft-studios,ubisoft-entertainment,square-enix,sega-2,2k-games,bethesda-softworks,valve,capcom,sony-computer-entertainment,sony-interactive-entertainment,nintendo,feral-interactive,warner-bros-interactive,thq-nordic,activision-blizzard,aspyr,bandai-namco-entertainment,deep-silver,rockstar-games,505-games,paradox-interactive,thq,activison,konami,telltale-games,bandai-namco-entertainment-us,disney-interactive,cd-projekt-red,activision,harmonix';
  pageSize = PAGINATOR_INITIAL_VALUES.pageSize + 1;

  constructor(private readonly http: HttpClient){}

  getGameList(): Observable<any>{
    return this.http.get<any>(`${this.url}/games?key=${this.apiKey}&ordering=-metacritic&publishers=${this.publishers}&page_size=${this.pageSize}`);
  }

  getGameListPerPage(pageSize: number,pageIndex: number): Observable<any> {
    return this.http.get<any>(`${this.url}/games?key=${this.apiKey}&ordering=-metacritic&publishers=${this.publishers}&page_size=${pageSize}&page=${pageIndex}`);
  }

  searchGame(searchValue: string): Observable<any> {
    return this.http.get<any>(`${this.url}/games?key=${this.apiKey}&ordering=-metacritic&publishers=${this.publishers}&search=${searchValue}`);
  }

  getGameDetails(id: number): Observable<any> {
    return this.http.get<any>(`${this.url}/games/${id}?key=${this.apiKey}`);
  }

  getGameScreenshots(id: number): Observable<Screenshot> {
    return this.http.get<any>(`${this.url}/games/${id}/screenshots?key=${this.apiKey}`);
  }

  getVideos(id: number): Observable<VideoData> {
    const keyword = 'guitar hero metallica trailer';
    return this.http.get<any>(`${this.youtubeUrl}/search?q=${keyword}&maxResults=10&key=${this.youtubeKey}`);
  }
}
