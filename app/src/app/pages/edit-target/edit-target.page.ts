import { Component, OnInit, ViewChild } from '@angular/core';
import { Platform, IonSlides } from '@ionic/angular';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

// EXTERNAL LIBRARIES
import { TranslateService } from '@ngx-translate/core';
import { Storage } from '@ionic/storage';

// UTILS
import { RoutesConstants, Constants, GoalsEnum } from '@utils/index';
import { UserGoalModel } from '@models/index';

// SERVICES
import { LoginFitbitService, CalendarService } from '@services/index';

@Component({
  selector: 'app-edit-target',
  templateUrl: './edit-target.page.html',
  styleUrls: ['./edit-target.page.scss'],
})
export class EditTargetPage implements OnInit {

  userGoal: UserGoalModel = new UserGoalModel();

  URL_TARGET: string = RoutesConstants.URL_TARGET;

  @ViewChild('slider', { read: IonSlides }) slider: IonSlides;

  listGoals: any[] = [
    { title: 'COMMON.LOSE', checked: true, value: GoalsEnum.LOSE },
    { title: 'COMMON.GAIN', checked: false, value: GoalsEnum.GAIN },
    { title: 'COMMON.KEEP', checked: false, value: GoalsEnum.KEEP }
  ];

  constructor(private platform: Platform,
              private translator: TranslateService,
              private router: Router,
              private storage: Storage,
              private loginFitbitService: LoginFitbitService,
              private calendarService: CalendarService) {
    this.platform.ready().then(() => {
      let userLang = navigator.language.split('-')[0];
      userLang = /(es|en)/gi.test(userLang) ? userLang : 'en';
      this.translator.use(userLang);
    }).finally(() => {

      // const url = this.loginFitbitService.getURLApi(Constants.URL_FITBIT_GET_FAT).replace('{date}', '2021-02-08');
      // this.loginFitbitService.getFitbit(url).then((result: Observable<any>) => {
      //   result.subscribe(value => {
      //     console.log(value);
      //   });
      // });

      this.storage.get(Constants.STORAGE_USER_GOAL).then((data: UserGoalModel) => {
        this.userGoal = new UserGoalModel();
        if (data) {
          this.userGoal = data;
          this.listGoals.forEach(x => x.checked = (x.value === data.goal));
        }
        this.slider.slideTo(0);
      });
    });
  }

  // EVENTS
  ngOnInit() {
  }

   async slideChange(event: any) {
    this.save(await this.slider.getActiveIndex());
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
    this.save(5);
    this.router.navigateByUrl(RoutesConstants.URL_TARGET);
  }

  // METHODS
  save(indexSlide) {
    switch (indexSlide) {
      case 2:
        break;
      case 3:
        break;
      case 4:
        break;
      case 5:
        this.saveFat();
    }
    this.storage.set(Constants.STORAGE_USER_GOAL, this.userGoal);
  }

  saveFat() {
    this.userGoal.fat.date = new Date();
    this.loginFitbitService.postFitbit(this.loginFitbitService.getURLApi(Constants.URL_FITBIT_UPDATE_FAT),
    {
      fat: this.userGoal.fat.percentageFat,
      date: this.calendarService.getDateFormatFitbit(this.userGoal.fat.date),
      time: this.calendarService.getTimeFormatFitbit(this.userGoal.fat.date)
    }).then((value: Observable<any[]>) => {
      if (value) {
        value.subscribe((data: any) => {
          console.log(data);
        });
      }
    });
  }
}
