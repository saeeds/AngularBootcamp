import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ReactiveFormsModule } from "@angular/forms";

import { AuthRoutingModule } from "./auth-routing.module";
import { SignupComponent } from "./signup/signup.component";
import { SigninComponent } from "./signin/signin.component";
import { SharedModule } from "../shared/shared.module";
import { SignoutComponent } from './signout/signout.component';

@NgModule({
  declarations: [SignupComponent, SigninComponent, SignoutComponent],
  imports: [CommonModule, AuthRoutingModule, ReactiveFormsModule, SharedModule]
})
export class AuthModule {}
