import { Component } from '@angular/core';
import { Platform } from '@ionic/angular';

// EXTERNAL LIBRARIES
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-target',
  templateUrl: 'target.page.html',
  styleUrls: ['target.page.scss']
})
export class TargetPage {

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
