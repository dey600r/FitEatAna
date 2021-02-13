import { Component, OnInit } from '@angular/core';
import { Platform } from '@ionic/angular';

// EXTERNAL LIBRARIES
import { TranslateService } from '@ngx-translate/core';

// UTILS
import { UrlsConstants } from '@utils/index';

@Component({
  selector: 'app-food-logs',
  templateUrl: './food-logs.page.html',
  styleUrls: ['./food-logs.page.scss'],
})
export class FoodLogsPage implements OnInit {

  URL_HOME = UrlsConstants.URL_HOME;
  URL_ADD_FOOD = UrlsConstants.URL_ADD_FOOD;

  constructor(private platform: Platform,
              private translator: TranslateService) {
    this.platform.ready().then(() => {
    let userLang = navigator.language.split('-')[0];
    userLang = /(es|en)/gi.test(userLang) ? userLang : 'en';
    this.translator.use(userLang);
    }).finally(() => {
    });
  }

  ngOnInit() {
  }

  segmentChanged(event: any) {
    // event.detail.value
  }

}
