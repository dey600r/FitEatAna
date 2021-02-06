export class UserProfileModel {
    displayName: string;
    age: number;
    fullName: string;
    dateOfBirth: Date;
    timeZone: string;
    avatar: string;
    constructor(display: string = '', age: number = 0, fullName: string = '',
                date: Date = new Date(), timeZone: string = '', avatar = '') {
        this.displayName = display;
        this.age = age;
        this.fullName = fullName;
        this.dateOfBirth = new Date(date);
        this.timeZone = timeZone;
        this.avatar = avatar;
    }
}
