import { Component, OnInit } from '@angular/core';
import { Platform } from '@ionic/angular';

// LIBRARIES ANGULAR
import { TranslateService } from '@ngx-translate/core';

// SERVICES
import { LoginFitbitService } from '@services/index';

// UTILS
import { UrlsConstants } from '@utils/index';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  readonly URL_HOME = UrlsConstants.URL_HOME;

  constructor(private platform: Platform,
              private translator: TranslateService,
              private loginFitbitService: LoginFitbitService) {
    this.platform.ready().then(() => {
      let userLang = navigator.language.split('-')[0];
      userLang = /(es|en)/gi.test(userLang) ? userLang : 'en';
      this.translator.use(userLang);
    }).finally(() => {
    });
  }

  ngOnInit() {
  }

  authorizateWithFitbit() {
    this.loginFitbitService.loginWithFitbit();
  }

  signUpWithFitbit() {
    this.loginFitbitService.signUpWithFitbit();
  }

}
