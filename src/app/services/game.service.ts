import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class GameService {
  url = environment.url;
  apiKey = environment.api_key;
  publishers = 'electronic-arts,microsoft-studios,ubisoft-entertainment,square-enix,sega-2,2k-games,bethesda-softworks,valve,capcom,sony-computer-entertainment,sony-interactive-entertainment,nintendo,feral-interactive,warner-bros-interactive,thq-nordic,activision-blizzard,aspyr,bandai-namco-entertainment,deep-silver,rockstar-games,505-games,paradox-interactive,thq,activison,konami,telltale-games,bandai-namco-entertainment-us,disney-interactive,cd-projekt-red';

  constructor(private readonly http: HttpClient){}

  getGameList(): Observable<any>{
    return this.http.get<any>(`${this.url}/games?key=${this.apiKey}&ordering=-metacritic&publishers=${this.publishers}`);
  }
}
