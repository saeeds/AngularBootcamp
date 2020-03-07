import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { CollectionsHomeComponent } from "./collections-home/collections-home.component";
import { BiographyComponent } from "./biography/biography.component";
import { CompainesComponent } from "./compaines/compaines.component";
import { PartnersComponent } from "./partners/partners.component";

const routes: Routes = [
  {
    path: "",
    component: CollectionsHomeComponent,
    children: [
      { path: "", component: BiographyComponent },
      { path: "companies", component: CompainesComponent },
      { path: "partners", component: PartnersComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CollectionsRoutingModule {}
