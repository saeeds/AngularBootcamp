import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent
} from "@angular/common/http";
import { Observable, throwError } from "rxjs";
import { Router, NavigationExtras } from "@angular/router";
import { Injectable } from "@angular/core";
import { catchError, delay } from "rxjs/operators";
import { ToastrService } from "ngx-toastr";

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  constructor(private router: Router, private toaster: ToastrService) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
      delay(1000),
      catchError((error: any) => {
        if (error) {
          if (error.status === 400) {
            if (error.error.errors) {
              throw error.error;
            } else {
              this.toaster.error(error.error.message, error.error.statusCode);
            }
          }
          if (error.status === 401) {
            this.toaster.error(error.error.message, error.error.statusCode);
          }
          if (error.status === 404) {
            this.router.navigateByUrl("/not-found");
          }
          if (error.status === 500) {
            const navigationExtra: NavigationExtras = {
              state: { error: error.error }
            };
            this.router.navigateByUrl("/server-error", navigationExtra);
          }
        }
        return throwError(error);
      })
    );
  }
}
