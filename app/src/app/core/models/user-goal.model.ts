import { GoalsEnum } from '@utils/index';

export class UserGoalModel {
    goal: GoalsEnum;
    goalWeight: number;
    goalPercentageFat: number;
    weight: number;
    percentageFat: number;
    constructor(g: GoalsEnum = GoalsEnum.GAIN, gw: number = 0, gpf: number = 0,
                w: number = 0, pf: number = 0) {
        this.goal = g;
        this.goalWeight = gw;
        this.goalPercentageFat = gpf;
        this.weight = w;
        this.percentageFat = pf;
    }
}
