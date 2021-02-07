import { Injectable } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Platform } from '@ionic/angular';
import { HttpHeaders } from '@angular/common/http';

// EXTERNAL LIBRARIES
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';
import { Storage } from '@ionic/storage';

// SERVICES
import { HttpService } from './http.service';
import { CommonService } from './common.service';

// UTILS
import { UserTokenModel, TokenFitbitModel } from '@models/index';
import { environment } from '@environment/environment';
import { Constants, RoutesConstants } from '@utils/index';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginFitbitService {

  private userToken: UserTokenModel = new UserTokenModel('', '', 0);
  private userTokenBehavior: BehaviorSubject<UserTokenModel> = new BehaviorSubject<UserTokenModel>(this.userToken);

  constructor(private platform: Platform,
              private activatedRouter: ActivatedRoute,
              private router: Router,
              private iab: InAppBrowser,
              private commonService: CommonService,
              private httpService: HttpService,
              private storage: Storage) {
  }

  getUserTokenFitbit(): Observable<UserTokenModel> {
    return this.userTokenBehavior.asObservable();
  }

  async loadUserToken() {
    this.userToken.setInfo(await this.storage.get(Constants.STORAGE_USER_TOKEN) || null);
  }

  async loginWithFitbit() {
    await this.loadUserToken();

    if (this.userToken && this.userToken.isAuthorizated() && this.userToken.isAuthenticated()) {
      this.router.navigateByUrl(RoutesConstants.URL_HOME);
    } else if (this.userToken && this.userToken.isAuthorizated() && !this.userToken.isAuthenticated()) {
      this.authenticationWithFitbit();
    } else {
      this.authorizationWithFitbit();
    }
  }

  // ------------------------------------------------------
  // AUTHORIZATION
  // ------------------------------------------------------

  async isValidSession(): Promise<boolean> {
    await this.loadUserToken();

    if (this.userToken === null || !this.userToken.isAuthorizated()) {
      this.router.navigateByUrl(RoutesConstants.URL_LOGIN);
      return Promise.resolve(false);
    }

    return Promise.resolve(true);
  }

  private authorizationWithFitbit() {
    const url = this.getAuthorizationUrl();
    if (this.isDevice()) {

      const browser = this.iab.create(url);
      // browser.show();

      browser.on('loadstart').subscribe(event => {
        if (event.url && event.url.includes('?code=')) {
          this.userToken.codeAuthorization = event.url.split('code=')[1].split('#_=_')[0];
          this.storage.set(Constants.STORAGE_USER_TOKEN, this.userToken);
          browser.close();
        }
      });

      browser.on('exit').subscribe(event => {
        this.router.navigateByUrl(RoutesConstants.URL_HOME);
      });
    } else {
      window.open(url, '_self');
    }
  }

  private getAuthorizationUrl(): string {
    this.userToken =  new UserTokenModel('', this.commonService.getRandomKey(), Constants.AUTHORIZATION_EXPIRE_IN);
    this.storage.set(Constants.STORAGE_USER_TOKEN, this.userToken);
    let url = `${this.getURLAuthorization()}?`;
    url += `client_id=${environment.fitbit.clientId}&`;
    url += `expires_in=${Constants.AUTHORIZATION_EXPIRE_IN}`;
    url += `redirect_uri=${environment.fitbit.redirectUri}&response_type=code&`;
    url += `scope=weight%20nutrition%20profile%20nutrition&`;
    url += `code_challange=${this.commonService.getCryptoKey(this.userToken.codeVerifier)}&`;
    url += `code_challenge_method=S256`;
    return url;
  }

  // ------------------------------------------------------
  // AUTENTICATION - TOKEN
  // ------------------------------------------------------

  async authenticationWithFitbit(): Promise<boolean> {
    await this.loadUserToken();

    return new Promise<boolean>(resolve => {
      if (!this.isDevice() && this.activatedRouter.snapshot.queryParams.code) {
        this.userToken.codeAuthorization = this.activatedRouter.snapshot.queryParams.code;
      }

      if (this.userToken.isAuthorizated() && this.userToken.isAuthenticated()) {
        this.userTokenBehavior.next(this.userToken);
        resolve(true);
      } else if (this.userToken.isAuthorizated() && !this.userToken.isAuthenticated()) {
        this.getTokenFitbit(this.userToken.codeAuthorization, this.userToken.codeVerifier).subscribe((token: TokenFitbitModel) => {
          this.setStorageUserToken(token);
          resolve(true);
        }, error => {
          this.controlErrors(error.error);
          resolve(false);
        });
      } else {
        console.log('AUTHORIZATION CODE NOT FOUND');
        this.router.navigateByUrl(RoutesConstants.URL_LOGIN);
        resolve(false);
      }
    });
  }

  private getTokenFitbit(codeAuth: string, codeVerifier: string): Observable<any> {

    const body: any = this.getHeaderToken();
    const head = new HttpHeaders(body);

    const param: any = {
      client_id: environment.fitbit.clientId,
      grant_type: 'authorization_code',
      redirect_uri: environment.fitbit.redirectUri,
      code: codeAuth,
      code_verifier: codeVerifier,
      expires_in: Constants.AUTENTICATION_EXPIRE_IN
    };

    return this.httpService.post(this.getURLAutentication(), body, head, param);
  }

  private async refreshToken(): Promise<boolean> {
    if (this.userToken.refreshToken) {
      const body: any = this.getHeaderToken();
      const head = new HttpHeaders(body);

      const param: any = {
        grant_type: 'refresh_token',
        refresh_token : this.userToken.refreshToken,
        expires_in: Constants.AUTENTICATION_EXPIRE_IN
      };

      return await new Promise<boolean>( resolve => {
        this.httpService.post(this.getURLAutentication(), body, head, param).subscribe((token: TokenFitbitModel) => {
          this.setStorageUserToken(token);
          resolve(true);
        }, error => {
          this.controlErrors(error.error);
          resolve(false);
        });
      });
    } else {
      console.log('REFRESH TOKEN NOT FOUND');
      this.router.navigateByUrl(RoutesConstants.URL_LOGIN);
    }
  }

  private setStorageUserToken(data: any) {
    this.userToken.setToken(data.access_token, Constants.AUTENTICATION_EXPIRE_IN,
      data.refresh_token, data.token_type, data.user_id);
    this.storage.set(Constants.STORAGE_USER_TOKEN, this.userToken);
    this.userTokenBehavior.next(this.userToken);
  }

  private getHeaderToken(): any {
    return {
      'Content-Type': 'application/x-www-form-urlencoded',
      Authorization: `Basic ${environment.fitbit.secretAuthorizationId}`
    };
  }

  // ------------------------------------------------------
  // GET API FITBIT
  // ------------------------------------------------------

  async getFitbit(url: string): Promise<Observable<any>> {
    return this.isValidAndRefreshToGetOrPost(new Promise<Observable<any[]>>( resolve => {
      resolve(this.httpService.get(url, this.getHeaderApiRequest()));
    }));
  }

  async postFitbit(url: string, param: any): Promise<Observable<any>> {
    return this.isValidAndRefreshToGetOrPost(new Promise<Observable<any[]>>( resolve => {
      resolve(this.httpService.post(url, {}, this.getHeaderApiRequest(), param));
    }));
  }

  private getHeaderApiRequest(): HttpHeaders {
    return new HttpHeaders({
      Authorization: `${this.userToken.tokenType}  ${this.userToken.token}`,
    });
  }

  private async isValidAndRefreshToGetOrPost(promise: Promise<any>): Promise<any> {
    if (!this.userToken.isAuthorizated()) {
      this.router.navigateByUrl(RoutesConstants.URL_LOGIN);
      return Promise.resolve(null);
    }
    if (!this.userToken.isAuthenticated() && !await this.refreshToken()) {
        return Promise.resolve(null);
    }

    return promise;
  }

  // ------------------------------------------------------
  // GET URLS
  // ------------------------------------------------------

  private getURLAuthorization(): string {
    return `${environment.fitbit.urlApi}${environment.fitbit.urlAuthorization}`;
  }

  private getURLAutentication(): string {
    return `${environment.fitbit.urlApi}${environment.fitbit.urlToken}`;
  }

  getURLApi(api: string): string {
    return `${environment.fitbit.urlApi}${api}`;
  }

  // ------------------------------------------------------
  // OTHER METHODS
  // ------------------------------------------------------

  private isDevice(): boolean {
    return this.iab && (this.platform.is('android') || this.platform.is('ios'));
  }

  private controlErrors(error: any) {
    if (error && error.errors && error.errors.length > 0) {
      if (error.errors[0].errorType === 'invalid_grant' &&
        error.errors[0].message.includes('Authorization code invalid')) {
          this.authorizationWithFitbit();
      } else if (error.errors[0].errorType === 'expired_token' &&
        error.errors[0].message.includes('Access token expired')) {
          this.refreshToken();
      }
    } else {
      console.log('Error no controlado');
      this.router.navigateByUrl(RoutesConstants.URL_LOGIN);
    }
  }

}
