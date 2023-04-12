import { HttpInterceptor,HttpHandler, HttpRequest, HttpEvent, HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {catchError, map} from 'rxjs/operators'
import { LoadingService } from 'src/app/services/loading.service';

@Injectable()
export class HttpRequestInterceptor implements HttpInterceptor {

  constructor(private readonly loadingService: LoadingService){}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    this.loadingService.show();
    return next.handle(req)
    .pipe(map((evt: HttpEvent<any>) => {
      if (evt instanceof HttpResponse) {
        this.loadingService.hide();
      }
      return evt;
    }))
  }
}