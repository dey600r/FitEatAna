import { Component, OnInit, ViewChild } from '@angular/core';
import { Platform, IonSlides } from '@ionic/angular';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

// EXTERNAL LIBRARIES
import { TranslateService } from '@ngx-translate/core';
import { Storage } from '@ionic/storage';

// UTILS
import { RoutesConstants, Constants, GoalsEnum, GoalsTypeEnum } from '@utils/index';
import {
  BaseFatFitbitResponseModel, BaseFatGoalFitbitResponseModel, BaseWeightGoalFitbitResponseModel,
  FatFitbitRequestModel, WeightFitbitRequestModel, WeightGoalFitbitResponseModel,
  UserFatModel, UserGoalModel, FatGoalFitbitResponseModel
} from '@models/index';

// SERVICES
import { LoginFitbitService, CalendarService, CommonService } from '@services/index';

@Component({
  selector: 'app-edit-target',
  templateUrl: './edit-target.page.html',
  styleUrls: ['./edit-target.page.scss'],
})
export class EditTargetPage implements OnInit {

  userGoal: UserGoalModel = new UserGoalModel();

  changedFat = false;
  changedFatGoal = false;
  changedWeight = false;
  changedWeightGoal = false;

  URL_TARGET: string = RoutesConstants.URL_TARGET;

  listGoals: any[] = [
    { title: 'COMMON.LOSE', checked: true, value: GoalsEnum.LOSE },
    { title: 'COMMON.GAIN', checked: false, value: GoalsEnum.GAIN },
    { title: 'COMMON.KEEP', checked: false, value: GoalsEnum.KEEP }
  ];

  @ViewChild('slider', { read: IonSlides }) slider: IonSlides;

  constructor(private platform: Platform,
              private translator: TranslateService,
              private router: Router,
              private storage: Storage,
              private loginFitbitService: LoginFitbitService,
              private calendarService: CalendarService,
              private commonService: CommonService) {
    this.platform.ready().then(() => {
      let userLang = navigator.language.split('-')[0];
      userLang = /(es|en)/gi.test(userLang) ? userLang : 'en';
      this.translator.use(userLang);
    }).finally(() => {
      this.changedFat = false;
      this.changedFatGoal = false;
      this.changedWeight = false;
      this.changedWeightGoal = false;
    });
  }

  // EVENTS
  ngOnInit() {
    this.storage.get(Constants.STORAGE_USER_GOAL).then((data: UserGoalModel) => {
      this.userGoal = new UserGoalModel();
      if (data) {
        this.userGoal = data;
        this.listGoals.forEach(x => x.checked = (x.value === data.goal));

        this.loadGoal(GoalsTypeEnum.FAT);
        this.loadGoal(GoalsTypeEnum.WEITGHT);
        this.loadFat(this.userGoal.fat);
      }
      this.slider.slideTo(0);
    });
  }

  async slideChange(event: any) {
    this.saveAndLoad(await this.slider.getActiveIndex());
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
    this.saveAndLoad(5);
    this.router.navigateByUrl(RoutesConstants.URL_TARGET);
  }

  // SAVE

  saveAndLoad(indexSlide) {
    switch (indexSlide) {
      case 2:
        this.saveWeightGoal();
        break;
      case 3:
        this.saveFatGoal();
        break;
      case 4:
        this.saveWeight();
        break;
      case 5:
        this.saveFat();
        break;
    }
    this.storage.set(Constants.STORAGE_USER_GOAL, this.userGoal);
  }

  saveFat() {
    if (this.changedFat) {
      this.userGoal.fat.date = new Date();
      this.loginFitbitService.postFitbit(this.loginFitbitService.getURLApi(Constants.URL_FITBIT_UPDATE_FAT),
        new FatFitbitRequestModel(this.userGoal.fat.date, this.userGoal.fat.percentageFat)).then((value: Observable<any[]>) => {
        if (value) {
          value.subscribe((data: any) => {
            console.log('SAVE FAT ' + data);
          });
        }
      });
    }
  }

  saveWeight() {
    if (this.changedWeight) {
      this.userGoal.fat.date = new Date();
      this.loginFitbitService.postFitbit(this.loginFitbitService.getURLApi(Constants.URL_FITBIT_UPDATE_WEIGHT),
        new WeightFitbitRequestModel(this.userGoal.weight.startDate, this.userGoal.weight.weight)).then((value: Observable<any[]>) => {
        if (value) {
          value.subscribe((data: any) => {
            console.log('SAVE WEIGHT ' + data);
          });
        }
      });
    }
  }

  saveFatGoal() {
    if (this.changedFatGoal) {
      this.loginFitbitService.postFitbit(this.loginFitbitService.getURLApi(Constants.URL_FITBIT_UPDATE_FAT_GOAL),
        new FatGoalFitbitResponseModel(this.userGoal.fat.goalPercentageFat)).then((value: Observable<any[]>) => {
        if (value) {
          value.subscribe((data: any) => {
            console.log('SAVE FAT GOAL ' + data);
          });
        }
      });
    }
  }

  saveWeightGoal() {
    if (this.changedWeightGoal) {
      this.userGoal.weight.startDate = new Date();
      this.loginFitbitService.postFitbit(this.loginFitbitService.getURLApi(Constants.URL_FITBIT_UPDATE_WEIGHT_GOAL),
        new WeightGoalFitbitResponseModel(this.userGoal.weight.startDate,
          this.userGoal.weight.goalWeight)).then((value: Observable<any[]>) => {
        if (value) {
          value.subscribe((data: any) => {
            console.log('SAVE WEIGHT GOAL ' + data);
          });
        }
      });
    }
  }

  // LOAD

  loadFat(fat: UserFatModel) {
    if (fat && fat.percentageFat !== null) {
      const url = this.loginFitbitService.getURLApi(Constants.URL_FITBIT_GET_RANGE_FAT)
        .replace('{base-date}', this.calendarService.getDateFormatFitbit(fat.date))
        .replace('{end-date}', this.calendarService.getDateFormatFitbit(new Date()));
      this.loginFitbitService.getFitbit(url).then((result: Observable<any>) => {
        result.subscribe((value: BaseFatFitbitResponseModel) => {
          if (value && value.fat && value.fat.length > 0) {
            const lastFat: FatFitbitRequestModel = value.fat[value.fat.length - 1];
            this.userGoal.fat.date = new Date(lastFat.date);
            this.userGoal.fat.percentageFat = this.commonService.formatDecimal(lastFat.fat);
            this.changedFat = false;
          }
        });
      });
    }
  }

  loadGoal(type: GoalsTypeEnum) {
    const url = this.loginFitbitService.getURLApi(Constants.URL_FITBIT_GET_GOAL)
        .replace('{goal-type}', type);
    this.loginFitbitService.getFitbit(url).then((result: Observable<any>) => {
      result.subscribe((value: any) => {
          if (type === GoalsTypeEnum.FAT) {
            const goalFat: BaseFatGoalFitbitResponseModel = (value as BaseFatGoalFitbitResponseModel);
            if (goalFat && goalFat.goal && goalFat.goal.fat) {
              this.userGoal.fat.goalPercentageFat = this.commonService.formatDecimal(goalFat.goal.fat);
              this.changedFatGoal = false;
            }
          } else {
            const goalWeight: BaseWeightGoalFitbitResponseModel = (value as BaseWeightGoalFitbitResponseModel);
            if (goalWeight && goalWeight.goal && goalWeight.goal.weight) {
              this.userGoal.weight.goalWeight = this.commonService.formatDecimal(goalWeight.goal.startWeight);
              this.userGoal.weight.weight = this.commonService.formatDecimal(goalWeight.goal.weight);
              this.changedWeight = false;
              this.changedWeightGoal = false;
            }
          }
        });
    });
  }
}
