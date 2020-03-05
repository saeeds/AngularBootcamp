import { Component } from "@angular/core";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent {
  posts = [
    {
      title: "Neat Tree",
      imageUrl: "../assets/tree.jpeg",
      username: "nature",
      content: "I see this neat tree today"
    },
    {
      title: "Snowy Mountain",
      imageUrl: "../assets/mountain.jpeg",
      username: "mountainlove",
      content: "Here is a picture of a snowy mountain"
    },
    {
      title: "Mountain Biking",
      imageUrl: "assets/biking.jpeg",
      username: "biking12222",
      content: "I did some biking today"
    },
    {
      title: "Mountain Biking",
      imageUrl: "assets/biking.jpeg",
      username: "biking12222",
      content: "I did some biking today"
    }
  ];
}
