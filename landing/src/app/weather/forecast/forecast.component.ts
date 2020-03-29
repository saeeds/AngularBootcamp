import { Component, OnInit } from "@angular/core";
import { ForecastService } from "../forecast.service";
import { Observable } from "rxjs";
@Component({
  selector: "app-forecast",
  templateUrl: "./forecast.component.html",
  styleUrls: ["./forecast.component.css"]
})
export class ForecastComponent implements OnInit {
  forecastData$: Observable<{ dateString: string; temp: number }[]>;

  constructor(private forecastService: ForecastService) {}

  ngOnInit(): void {
    this.forecastData$ = this.forecastService.getForecast();
  }
}
