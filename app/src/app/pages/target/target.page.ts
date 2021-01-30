import { Component } from '@angular/core';
import { Platform } from '@ionic/angular';

// EXTERNAL LIBRARIES
import { TranslateService } from '@ngx-translate/core';

// UTILS
import { RoutesConstants } from '@utils/index';

@Component({
  selector: 'app-target',
  templateUrl: 'target.page.html',
  styleUrls: ['target.page.scss']
})
export class TargetPage {

  URL_HOME = RoutesConstants.URL_HOME;
  URL_EDIT_TARGET = RoutesConstants.URL_EDIT_TARGET;

  constructor(private platform: Platform,
              private translator: TranslateService) {
    this.platform.ready().then(() => {
      let userLang = navigator.language.split('-')[0];
      userLang = /(es|en)/gi.test(userLang) ? userLang : 'en';
      this.translator.use(userLang);
    }).finally(() => {
    });
  }

}
