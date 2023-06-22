import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { finalize, Observable } from 'rxjs';
import { LoadingService } from 'src/app/services/spinner.service';

@Injectable()
export class LoadingInterceptor implements HttpInterceptor {
  constructor(private loadingSvc: LoadingService, private router: Router) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    this.loadingSvc.show();
    return next.handle(req).pipe(
      finalize(() => this.loadingSvc.hide())
    );
  }
}
