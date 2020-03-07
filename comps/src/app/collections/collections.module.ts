import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { SharedModule } from "../shared/shared.module";
import { CollectionsRoutingModule } from "./collections-routing.module";
import { CollectionsHomeComponent } from "./collections-home/collections-home.component";
import { TableComponent } from "./table/table.component";
import { BiographyComponent } from './biography/biography.component';
import { CompainesComponent } from './compaines/compaines.component';
import { PartnersComponent } from './partners/partners.component';
import { TabsComponent } from './tabs/tabs.component';

@NgModule({
  declarations: [CollectionsHomeComponent, TableComponent, BiographyComponent, CompainesComponent, PartnersComponent, TabsComponent],
  imports: [CommonModule, CollectionsRoutingModule, SharedModule],
  exports: []
})
export class CollectionsModule {}
