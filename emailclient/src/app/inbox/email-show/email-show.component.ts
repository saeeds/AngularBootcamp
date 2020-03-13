import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { Email } from "../email";

@Component({
  selector: "app-email-show",
  templateUrl: "./email-show.component.html",
  styleUrls: ["./email-show.component.css"]
})
export class EmailShowComponent implements OnInit {
  email: Email;
  constructor(private route: ActivatedRoute) {
    this.email = this.route.snapshot.data.email;
    this.route.data.subscribe(({ email }) => {
      this.email = email;
    });
  }

  ngOnInit(): void {
    // console.log(this.route.snapshot.params.id);
    // this.route.params
    //   .pipe(
    //     switchMap(({ id }) => {
    //       return this.emailService.getEmail(id);
    //     })
    //   )
    //   .subscribe(email => {
    //     this.email = email;
    //   });
  }
}
