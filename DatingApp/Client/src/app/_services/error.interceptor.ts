import { Injectable } from "@angular/core";
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpErrorResponse,
  HTTP_INTERCEPTORS,
} from "@angular/common/http";
import { Observable, throwError } from "rxjs";
import { catchError } from "rxjs/operators";

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
      catchError((error) => {
        if (error.status === 401) {
          return throwError(error.statusText);
        }
        if (error instanceof HttpErrorResponse) {
          const applicationError = error.headers.get("Application-Error");
          if (applicationError) {
            return throwError(applicationError);
          }

          const serverError = error.error;
          let modelSateErrors = "";
          if (serverError.errors && typeof serverError.errors === "object") {
            for (const key in serverError.errors) {
              if (serverError.errors[key]) {
                modelSateErrors += serverError.errors[key] + "\n";
              }
            }
          }
          return throwError(modelSateErrors || serverError || "Server Error");
        }
      })
    );
  }
}

export const ErrorInterceptorProvider = {
  provide: HTTP_INTERCEPTORS,
  useClass: ErrorInterceptor,
  multi: true,
};
