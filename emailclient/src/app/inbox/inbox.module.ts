import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { InboxRoutingModule } from "./inbox-routing.module";
import { SharedModule } from "../shared/shared.module";
import { ReactiveFormsModule } from "@angular/forms";
import { InboxHomeComponent } from "./inbox-home/inbox-home.component";
import { EmailCreateComponent } from "./email-create/email-create.component";
import { EmailReplyComponent } from "./email-reply/email-reply.component";
import { EmailIndexComponent } from "./email-index/email-index.component";
import { EmailShowComponent } from "./email-show/email-show.component";
import { PlaceholderComponent } from "./placeholder/placeholder.component";
import { NotFoundComponent } from "./not-found/not-found.component";
import { EmailFormComponent } from "./email-form/email-form.component";
import { from } from "rxjs";
@NgModule({
  declarations: [
    InboxHomeComponent,
    EmailCreateComponent,
    EmailReplyComponent,
    EmailIndexComponent,
    EmailShowComponent,
    PlaceholderComponent,
    NotFoundComponent,
    EmailFormComponent
  ],
  imports: [CommonModule, InboxRoutingModule, SharedModule, ReactiveFormsModule]
})
export class InboxModule {}
