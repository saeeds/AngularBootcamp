import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

interface UnsplashResponse {
  urls: {
    regular: string;
  };
}

@Injectable({
  providedIn: "root"
})
export class PhotosService {
  accesKey = "MKuS2VAj0LTzXOe-KVDYA_WWEATHZQaYjkbYUZNb87g";
  Url = "https://api.unsplash.com";

  constructor(private http: HttpClient) {}

  getPhoto() {
    return this.http.get<UnsplashResponse>(`${this.Url}/photos/random`, {
      headers: {
        Authorization: `Client-ID ${this.accesKey}`
      }
    });
  }
}
