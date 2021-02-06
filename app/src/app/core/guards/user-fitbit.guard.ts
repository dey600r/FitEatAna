import { Injectable } from '@angular/core';
import { CanActivate, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

import { LoginFitbitService } from '@services/index';

@Injectable({
  providedIn: 'root'
})
export class UserFitbitGuard implements CanActivate {

  constructor( private loginFitbitService: LoginFitbitService ) {}

  canActivate(): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.loginFitbitService.isValidSession();
  }
}
