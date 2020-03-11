import { Injectable } from "@angular/core";
import { AsyncValidator, FormControl, ValidationErrors } from "@angular/forms";
import { Observable, of } from "rxjs";
import { map, catchError } from "rxjs/operators";
import { AuthService } from "../auth.service";

@Injectable({
  providedIn: "root"
})
export class UniqueUsername implements AsyncValidator {
  constructor(private authService: AuthService) {}

  validate = (
    control: FormControl
  ): Promise<ValidationErrors> | Observable<ValidationErrors> => {
    const { value } = control;
    return this.authService.usernameAvailable(value).pipe(
      map(resp => {
        if (resp.available) {
          return null;
        }
      }),
      catchError(err => {
        if (err.error.username) {
          return of({ nonUniqueUsername: true });
        } else {
          return of({ noConnection: true });
        }
      })
    );
    // tslint:disable-next-line: semicolon
  };

  registerOnValidatorChange?(fn: () => void): void {
    throw new Error("Method not implemented.");
  }
}
