import { Component, OnInit } from '@angular/core';
import { Platform } from '@ionic/angular';

// EXTERNAL LIBRARIES
import { TranslateService } from '@ngx-translate/core';

// UTILS
import { UrlsConstants } from '@utils/index';

@Component({
  selector: 'app-feeding',
  templateUrl: './feeding.page.html',
  styleUrls: ['./feeding.page.scss'],
})
export class FeedingPage implements OnInit {

  URL_HOME = UrlsConstants.URL_HOME;

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

}
