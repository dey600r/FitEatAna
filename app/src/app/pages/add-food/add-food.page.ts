import { Component, OnInit } from '@angular/core';
import { Platform } from '@ionic/angular';

// EXTERNAL LIBRARIES
import { TranslateService } from '@ngx-translate/core';

// UTILS
import { UrlsConstants } from '@utils/index';

@Component({
  selector: 'app-add-food',
  templateUrl: './add-food.page.html',
  styleUrls: ['./add-food.page.scss'],
})
export class AddFoodPage implements OnInit {

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

  segmentChanged(event: any) {
    // event.detail.value
  }

}
