import { GoalsEnum } from '@utils/index';

export class UserGoalModel {
    goal: GoalsEnum;
    weight: UserWeightModel;
    fat: UserFatModel;
    constructor(g: GoalsEnum = GoalsEnum.GAIN, w: UserWeightModel = new UserWeightModel(),
                f: UserFatModel = new UserFatModel()) {
        this.goal = g;
        this.weight = w;
        this.fat = f;
    }
}

export class UserFatModel {
    percentageFat: number;
    date: Date;
    goalPercentageFat: number;
    constructor(f: number = 0, g: number = 0, d: Date = new Date()) {
        this.percentageFat = f;
        this.goalPercentageFat = g;
        this.date = d;
    }
}

export class UserWeightModel {
    weight: number;
    goalWeight: number;
    startDate: Date;
    startWeight: number;
    constructor(w: number = 0, g: number = 0, s: number = 0, d: Date = new Date()) {
        this.weight = w;
        this.goalWeight = g;
        this.startWeight = s;
        this.startDate = d;
    }
}
