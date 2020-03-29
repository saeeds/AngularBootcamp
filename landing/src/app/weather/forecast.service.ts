import { Injectable } from "@angular/core";
import { HttpParams, HttpClient } from "@angular/common/http";
import { Observable, of, throwError } from "rxjs";
import {
  switchMap,
  map,
  pluck,
  mergeMap,
  filter,
  toArray,
  share,
  tap,
  catchError,
  retry
} from "rxjs/operators";
import { NotificationsService } from "../notifications/notifications.service";

interface OpenWeatherResponse {
  list: {
    dt_txt: string;
    main: {
      temp: number;
    };
  }[];
}

@Injectable({
  providedIn: "root"
})
export class ForecastService {
  private url = "https://api.openweathermap.org/data/2.5/forecast";
  constructor(
    private http: HttpClient,
    private notificationsService: NotificationsService
  ) {}

  getForecast() {
    return this.getCurrentLocation().pipe(
      map(coords => {
        return new HttpParams()
          .set("lat", String(coords.altitude))
          .set("lon", String(coords.longitude))
          .set("units", "metric")
          .set("appid", "11d6dc8fd8988ea006710daea5c86f93");
      }),
      switchMap(httpParams => {
        return this.http.get<OpenWeatherResponse>(this.url, {
          params: httpParams
        });
      }),
      pluck("list"),
      mergeMap(value => of(...value)),
      filter((value, index) => index % 8 === 0),
      map(value => {
        return {
          dateString: value.dt_txt,
          temp: value.main.temp
        };
      }),
      toArray(),
      share()
    );
  }

  getCurrentLocation() {
    return new Observable<Coordinates>(observer => {
      window.navigator.geolocation.getCurrentPosition(
        position => {
          observer.next(position.coords);
          observer.complete();
        },
        err => {
          observer.error(err);
        }
      );
    }).pipe(
      retry(1),
      tap(() => {
        this.notificationsService.addSuccess("Got your location");
      }),
      catchError(err => {
        this.notificationsService.addError("Faild to get your location");
        return throwError(err);
      })
    );
  }
}
