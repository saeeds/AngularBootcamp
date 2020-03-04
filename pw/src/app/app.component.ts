import { Component } from "@angular/core";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent {
  length = 0;
  includeLetters = false;
  includeNumbers = false;
  includeSymbols = false;
  password = "";

  onChangeUseLetters() {
    this.includeLetters = !this.includeLetters;
  }

  onChangeUseNumbers() {
    this.includeNumbers = !this.includeNumbers;
  }

  onChangeUseSymbols() {
    this.includeSymbols = !this.includeSymbols;
  }

  onChangeLength(value: string) {
    const parsedValue = parseInt(value, 8);

    if (!isNaN(parsedValue)) {
      this.length = parsedValue;
    }
  }

  onButtonClick() {
    console.log(`
      About to generate a password with the following:
      Includes letters :  ${this.includeLetters}
      Includes Numbers :  ${this.includeNumbers}
      Includes Symbols :  ${this.includeSymbols}
    `);

    const numbers = "1234567890";
    const letters = "abcdefghijklmnopqrstuvwyz";
    const symbols = "!@#$%^&*()";

    let validChars = "";

    if (this.includeLetters) {
      validChars += letters;
    }

    if (this.includeNumbers) {
      validChars += numbers;
    }

    if (this.includeSymbols) {
      validChars += symbols;
    }

    let generatedPassword = "";
    // tslint:disable-next-line: prefer-for-of
    for (let i = 0; i < this.length; i++) {
      const index = Math.floor(Math.random() * validChars.length);
      generatedPassword += validChars[index];
    }

    this.password = generatedPassword;
  }
}
