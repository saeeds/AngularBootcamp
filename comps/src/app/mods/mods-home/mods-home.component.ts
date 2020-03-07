import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-mods-home",
  templateUrl: "./mods-home.component.html",
  styleUrls: ["./mods-home.component.css"]
})
export class ModsHomeComponent implements OnInit {
  modalOpen = false;
  items = [
    { title: "Why is the sky blue?", content: "the sky is blue becuse it is " },
    {
      title: "What does an orange taste Like? ",
      content: "An orange tastes like an orange"
    },
    { title: "what color is that cat?", content: "the cat is an orange color" }
  ];
  constructor() {}

  ngOnInit(): void {}

  onClick() {
    this.modalOpen = !this.modalOpen;
  }
}
