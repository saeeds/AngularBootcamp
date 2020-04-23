import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { NavBarComponent } from "./nav-bar/nav-bar.component";
import { RouterModule } from "@angular/router";
import { SharedModule } from "../shared/shared.module";

import { TestErrorComponent } from "./test-error/test-error.component";
import { NotFoundComponent } from "./not-found/not-found.component";
import { ServerErrorComponent } from "./server-error/server-error.component";
import { ToastrModule } from "ngx-toastr";
import { SectionHeaderComponent } from "./section-header/section-header.component";
import { BreadcrumbModule } from "xng-breadcrumb";

@NgModule({
  declarations: [
    NavBarComponent,
    TestErrorComponent,
    NotFoundComponent,
    ServerErrorComponent,
    SectionHeaderComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    BreadcrumbModule,
    SharedModule,
    ToastrModule.forRoot({
      timeOut: 10000,
      positionClass: "toast-bottom-right",
      preventDuplicates: true,
    }),
  ],
  exports: [NavBarComponent, SectionHeaderComponent],
})
export class CoreModule {}
