import { Injectable } from "@angular/core";
import { Subject } from "rxjs";
import { AngularFireAuth } from "@angular/fire/auth";

import { AuthData } from "./auth-data.model";
import { Router } from "@angular/router";

@Injectable()
export class AuthService {
  authChange = new Subject<boolean>();
  private isAuthenticated = false;

  constructor(private router: Router, private afAuth: AngularFireAuth) {}

  registerUser(authData: AuthData) {
    this.afAuth.auth
      .createUserWithEmailAndPassword(authData.email, authData.password)
      .then((result) => {
        console.log(result);
        this.authSuccessfuly();
      })
      .catch((error) => {
        console.log(error);
      });
  }

  login(authData: AuthData) {
    this.afAuth.auth
      .signInWithEmailAndPassword(authData.email, authData.password)
      .then((result) => {
        console.log(result);
        this.authSuccessfuly();
      })
      .catch((error) => {
        console.log(error);
      });
  }

  logout() {
    this.authChange.next(false);
    this.router.navigate(["/login"]);
    this.isAuthenticated = false;
  }

  isAuth() {
    return this.isAuthenticated;
  }

  private authSuccessfuly() {
    this.isAuthenticated = true;
    this.authChange.next(true);
    this.router.navigate(["/training"]);
  }
}
