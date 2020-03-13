import { Injectable } from "@angular/core";
import { EMPTY } from "rxjs";
import { catchError } from "rxjs/operators";
import {
  Resolve,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router
} from "@angular/router";
import { Email } from "./email";
import { EmailService } from "./email.service";

@Injectable({
  providedIn: "root"
})
export class EmailResolverService implements Resolve<Email> {
  constructor(private eEmailService: EmailService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const { id } = route.params;
    return this.eEmailService.getEmail(id).pipe(
      catchError(() => {
        this.router.navigateByUrl("/inbox/not-found");
        return EMPTY;
      })
    );
  }
}
