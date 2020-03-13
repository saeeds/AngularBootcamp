import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Email } from "./email";
interface EmailSummaery {
  id: string;
  subject: string;
  from: string;
}

@Injectable({
  providedIn: "root"
})
export class EmailService {
  rootUrl = "https://api.angular-email.com";
  constructor(private http: HttpClient) {}

  getEmails() {
    return this.http.get<EmailSummaery[]>(`${this.rootUrl}/emails`);
  }

  getEmail(id: string) {
    return this.http.get<Email>(`${this.rootUrl}/emails/${id}`);
  }

  sendEmail(email: Email) {
    return this.http.post(`${this.rootUrl}/emails`, email);
  }
}
