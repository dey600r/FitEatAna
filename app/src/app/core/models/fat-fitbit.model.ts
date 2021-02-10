import * as Moment from 'moment';
import { Constants } from '@utils/index';

export class BaseFatFitbitResponseModel {
    fat: FatFitbitRequestModel[];
}

export class FatFitbitRequestModel {
    date: string;
    fat: number;
    time: string;
    constructor(date: Date, fat: number) {
        this.date = Moment(date).format(Constants.FORMAT_DATE_FITBIT);
        this.fat = fat;
        this.time = Moment(date).format(Constants.FORMAT_TIME_FITBIT);
    }
}

export class BaseFatGoalFitbitResponseModel {
    goal: FatGoalFitbitResponseModel;
}

export class FatGoalFitbitResponseModel {
    fat: number;
    constructor(f: number) {
        this.fat = f;
    }
}
