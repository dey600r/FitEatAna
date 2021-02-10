export class Constants {
    // STORAGE
    static STORAGE_USER_GOAL = 'user-goal';
    static STORAGE_USER_TOKEN = 'user-token';
    static STORAGE_USER_PROFILE = 'user-profile';

    // EXPIRATION TIME LOGIN
    static AUTHORIZATION_EXPIRE_IN = 28800;
    static AUTENTICATION_EXPIRE_IN = 3600;

    // POSITION TOAST
    static TOAST_POSITION_TOP = 'top';
    static TOAST_POSITION_MIDDLE = 'middle';
    static TOAST_POSITION_BOTTOM = 'bottom';
    static TOAST_POSITION_STANDARD = 'bottom';

    // DELAYS TOAST
    static DELAY_TOAST = 1300;
    static DELAY_TOAST_IS_FREE = 2500;
    static DELAY_TOAST_NORMAL = 3500;
    static DELAY_TOAST_HIGH = 5000;
    static DELAY_TOAST_HIGHER = 7000;

    // URL FITBIT
    static URL_FITBIT_GET_PROFILE = '/1/user/-/profile.json';
    static URL_FITBIT_UPDATE_FAT = '/1/user/-/body/log/fat.json';
    static URL_FITBIT_GET_RANGE_FAT = '/1/user/-/body/log/fat/date/{base-date}/{end-date}.json';
    static URL_FITBIT_UPDATE_FAT_GOAL = '/1/user/-/body/log/fat/goal.json';
    static URL_FITBIT_GET_GOAL = '/1/user/-/body/log/{goal-type}/goal.json';
    static URL_FITBIT_UPDATE_WEIGHT = '/1/user/-/body/log/weight.json';
    static URL_FITBIT_UPDATE_WEIGHT_GOAL = '/1/user/-/body/log/weight/goal.json';

    // FORMAT DATE
    static FORMAT_DATE_FITBIT = 'YYYY-MM-DD';
    static FORMAT_TIME_FITBIT = 'HH:mm:ss';
}
