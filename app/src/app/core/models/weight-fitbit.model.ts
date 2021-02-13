import * as Moment from 'moment';
import { Constants } from '@utils/index';

export class WeightFitbitRequestModel {
    date: string;
    weight: number;
    time: string;
    constructor(date: Date, weight: number) {
        this.date = Moment(date).format(Constants.FORMAT_DATE_FITBIT);
        this.weight = weight;
        this.time = Moment(date).format(Constants.FORMAT_TIME_FITBIT);
    }
}

export class BaseWeightGoalFitbitResponseModel {
    goal: WeightGoalFitbitResponseModel;
}

export class WeightGoalFitbitResponseModel {
    weight: number;
    startDate: string;
    startWeight: number;
    constructor(date: Date, wgoal: number, weight: number = -1) {
        this.startDate = Moment(date).format(Constants.FORMAT_DATE_FITBIT);
        this.startWeight = wgoal;
        if (weight !== -1) {
            this.weight = weight;
        }
    }
}
