import { Injectable } from "@angular/core";
import { Validator, FormGroup, ValidationErrors } from "@angular/forms";

@Injectable({ providedIn: "root" })
export class MatchPassword implements Validator {
  validate(formGroup: FormGroup): ValidationErrors {
    const { password, passwordConfirmation } = formGroup.value;
    if (password === passwordConfirmation) {
      return null;
    } else {
      return { passwordsDontMatch: true };
    }
  }
  registerOnValidatorChange?(fn: () => void): void {
    throw new Error("Method not implemented.");
  }
}
