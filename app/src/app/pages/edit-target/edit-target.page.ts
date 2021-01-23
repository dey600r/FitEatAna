import { Component, OnInit } from '@angular/core';
import { Platform } from '@ionic/angular';

// EXTERNAL LIBRARIES
import { TranslateService } from '@ngx-translate/core';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-edit-target',
  templateUrl: './edit-target.page.html',
  styleUrls: ['./edit-target.page.scss'],
})
export class EditTargetPage implements OnInit {

  weight = 0;

  constructor(private platform: Platform,
              private translator: TranslateService,
              private storage: Storage) {
    this.platform.ready().then(() => {
      let userLang = navigator.language.split('-')[0];
      userLang = /(es|en)/gi.test(userLang) ? userLang : 'en';
      this.translator.use(userLang);
    }).finally(() => {

      this.storage.get('weight').then((val) => {
        console.log('Your weight is', val);
        this.weight = val;
      });
    });
  }

  ngOnInit() {
  }

  slideChange(event: any) {
    event.target.getActiveIndex().then(index => {
      switch (index) {
        case 1:
        case 3:
        case 4:
        case 5:
          console.log('NADA');
          break;
        case 2:
          this.storage.set('weight', this.weight);
          break;
        default:
          console.log('DEFAULT');
      }
    });
  }
}
