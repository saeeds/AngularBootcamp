import { Component, OnInit } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { IProduct } from "./shared/models/product";
import { IPagination } from "./shared/models/pagination";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"]
})
export class AppComponent implements OnInit {
  title = "client";
  products: IProduct[];
  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.http.get("https://localhost:5001/api/products?pgaeSize=50").subscribe(
      (response: IPagination) => {
        this.products = response.data;
        console.log(response);
      },
      error => {
        console.log(error);
      }
    );
  }
}
