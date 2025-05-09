import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { PAGINATOR_INITIAL_VALUES } from '../const/paginator-initial-values';
import { Screenshot } from '../interfaces/screenshot-interface';
import { VideoData } from '../interfaces/video-data-interface';

@Injectable({
  providedIn: 'root',
})
export class GameService {
  url = environment.url;
  apiKey = environment.api_key;
  youtubeUrl = environment.YOUTUBE_URL;
  youtubeKey = environment.YOUTUBE_API_KEY;
  publishers =
    'activision,harmonix,electronic-arts,dimps,microsoft-studios,ubisoft-entertainment,square-enix,sega-2,2k-games,bethesda-softworks,valve,capcom,sony-computer-entertainment,sony-interactive-entertainment,nintendo,feral-interactive,warner-bros-interactive,thq-nordic,activision-blizzard,aspyr,bandai-namco-entertainment,deep-silver,rockstar-games,505-games,paradox-interactive,thq,activison,konami,telltale-games,bandai-namco-entertainment-us,disney-interactive,cd-projekt-red';
  pageSize = PAGINATOR_INITIAL_VALUES.pageSize + 1;

  constructor(private readonly http: HttpClient) {}

  getGameListPerPage(data: {
    pageSize: number;
    pageIndex: number;
    search?: string;
  }): Observable<any> {
    let params = new HttpParams()
      .set('key', this.apiKey)
      .set('ordering', '-metacritic')
      .set('publishers', this.publishers)
      .set('page_size', data.pageSize)
      .set('page', data.pageIndex);
    data.search && data.search.length > 0
      ? (params = params.set('search', data.search))
      : null;
    console.log(data);
    return this.http.get<any>(`${this.url}/games?${params}`);
  }

  getGameDetails(id: number): Observable<any> {
    return this.http.get<any>(`${this.url}/games/${id}?key=${this.apiKey}`);
  }

  getGameScreenshots(id: number): Observable<Screenshot> {
    return this.http.get<any>(
      `${this.url}/games/${id}/screenshots?key=${this.apiKey}`
    );
  }

  getVideos(id: number, name: string): Observable<VideoData> {
    const keyword = `${name} trailer videogame 1080p`;
    return this.http.get<any>(
      `${this.youtubeUrl}/search?q=${keyword}&maxResults=10&key=${this.youtubeKey}`
    );
  }
}
