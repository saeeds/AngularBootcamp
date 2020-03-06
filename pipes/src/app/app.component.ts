import { Component } from "@angular/core";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent {
  name: string;
  date: string;
  amount: number;
  height: number;
  miles: number;

  car = {
    make: "Toyota",
    model: "Camry",
    year: 2000
  };

  onMilesChnage(value: string) {
    this.miles = parseFloat(value);
  }

  onHeightChnage(value: string) {
    this.height = parseFloat(value);
  }

  onNameChnage(value: string) {
    this.name = value;
  }

  onDateChnage(value: string) {
    this.date = value;
  }

  onAmountChnage(value: string) {
    this.amount = parseFloat(value);
  }
}
