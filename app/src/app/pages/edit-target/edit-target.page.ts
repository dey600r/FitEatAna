import { Component, OnInit, ViewChild } from '@angular/core';
import { Platform, IonSlides } from '@ionic/angular';
import { Router } from '@angular/router';

// EXTERNAL LIBRARIES
import { TranslateService } from '@ngx-translate/core';
import { Storage } from '@ionic/storage';

// UTILS
import { RoutesConstants, Constants, GoalsEnum } from '@utils/index';
import { UserGoalModel } from '@src/app/core/models/user-goal.model';

@Component({
  selector: 'app-edit-target',
  templateUrl: './edit-target.page.html',
  styleUrls: ['./edit-target.page.scss'],
})
export class EditTargetPage implements OnInit {

  userGoal: UserGoalModel = new UserGoalModel();

  URL_TARGET: string = RoutesConstants.URL_TARGET;

  @ViewChild('slider', { read: IonSlides }) slider: IonSlides;

  listGoals: any[] = [];

  constructor(private platform: Platform,
              private translator: TranslateService,
              private router: Router,
              private storage: Storage) {
    this.platform.ready().then(() => {
      let userLang = navigator.language.split('-')[0];
      userLang = /(es|en)/gi.test(userLang) ? userLang : 'en';
      this.translator.use(userLang);
    }).finally(() => {

      this.storage.get(Constants.STORAGE_USER_GOAL).then((data: UserGoalModel) => {
        this.userGoal = new UserGoalModel();
        if (data) {
          this.userGoal = data;
          this.listGoals = [{ title: 'COMMON.LOSE', checked: (data.goal === GoalsEnum.LOSE), value: GoalsEnum.LOSE },
          { title: 'COMMON.GAIN', checked: (data.goal === GoalsEnum.GAIN), value: GoalsEnum.GAIN },
          { title: 'COMMON.KEEP', checked: (data.goal === GoalsEnum.KEEP), value: GoalsEnum.KEEP }];
        }
        this.slider.slideTo(0);
      });
    });
  }

  // EVENTS
  ngOnInit() {
  }

  slideChange(event: any) {
    this.save();
  }

  goNext(step: number) {
    this.slider.slideTo(step);
  }

  toggleChange(value: GoalsEnum) {
    this.listGoals.forEach(x => {
      if (x.value === value) {
        this.userGoal.goal = value;
      } else {
        x.checked = false;
      }
    });
  }

  finish() {
    this.save();
    this.router.navigateByUrl(RoutesConstants.URL_TARGET);
  }

  // METHODS
  save() {
    this.storage.set(Constants.STORAGE_USER_GOAL, this.userGoal);
  }
}
