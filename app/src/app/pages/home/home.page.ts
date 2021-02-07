import { Component, OnInit } from '@angular/core';
import { Platform } from '@ionic/angular';

// EXTERNAL LIBRARIES
import { TranslateService } from '@ngx-translate/core';
import { Storage } from '@ionic/storage';

// SERVICES
import { LoginFitbitService } from '@services/index';
import { UserProfileModel } from '@models/index';

// UTILS
import { Constants, RoutesConstants } from '@utils/index';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss']
})
export class HomePage implements OnInit {

  URL_LOGIN = RoutesConstants.URL_LOGIN;

  profile: UserProfileModel = new UserProfileModel();

  constructor(private platform: Platform,
              private translator: TranslateService,
              private loginFitbitService: LoginFitbitService,
              private storage: Storage) {
    this.platform.ready().then(() => {
      let userLang = navigator.language.split('-')[0];
      userLang = /(es|en)/gi.test(userLang) ? userLang : 'en';
      this.translator.use(userLang);
    }).finally(() => {
    });
  }

  ngOnInit() {
    this.initPageLogin();
  }

  async initPageLogin() {
    await this.loginFitbitService.authenticationWithFitbit();

    this.loginFitbitService.getFitbit(this.loginFitbitService.getURLApi(Constants.URL_FITBIT_GET_PROFILE)).then(
      (value: Observable<any[]>) => {
      if (value) {
        value.subscribe((data: any) => {
          this.profile = new UserProfileModel(data.user.displayName, data.user.age,
            data.user.fullName, data.user.dateOfBirth, data.user.timezone, data.user.avatar);
          this.storage.set(Constants.STORAGE_USER_PROFILE, this.profile);
        }, error => {
          this.storage.get(Constants.STORAGE_USER_PROFILE).then(profile => {
            if (profile) {
              this.profile = profile;
            }
          });
        });
      }
    });
  }

  click() {

  }

}
