import { Injectable } from '@angular/core';
import {AgencyService} from "./agency.service";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private agencyService: AgencyService) {}

  static isAdmin: boolean = true; // false;
  static loggedIn: boolean = false;
  static userId: string;
  login(auth: any): boolean {
    AuthService.isAdmin = true;
    let loginSuccessful = false;

    this.agencyService.getUsers().forEach((v) => {
      if (v.username == auth.loginUsername && v.password == auth.loginPassword) {
        loginSuccessful = true;
      }
    });
    AuthService.isAdmin = false;

    if (!loginSuccessful) {
      return false;
    }

    AuthService.isAdmin = true;
    // AuthService.isAdmin = auth.loginUsername == "admin";
    AuthService.loggedIn = true;

    let id = this.agencyService.getLoggedInUserId(auth.loginUsername);
    if (id == null) {
      return false;
    }
    AuthService.userId = id;

    return true;
  }

  static logout() {
    AuthService.isAdmin = false;
    AuthService.loggedIn = false;
    AuthService.userId = "";
  }
}
