import { Component, OnInit, OnDestroy } from "@angular/core";
import { BreadcrumbService } from "xng-breadcrumb";
import { Subscription, Observable } from "rxjs";

@Component({
  selector: "app-section-header",
  templateUrl: "./section-header.component.html",
  styleUrls: ["./section-header.component.scss"]
})
export class SectionHeaderComponent implements OnInit, OnDestroy {
  // subscription: Subscription;
  breadcrumb$: Observable<any[]>;

  constructor(private breadcrumbService: BreadcrumbService) {}

  ngOnInit(): void {
    this.breadcrumb$ = this.breadcrumbService.breadcrumbs$;
  }

  ngOnDestroy(): void {
    //this.subscription.unsubscribe();
  }
}
