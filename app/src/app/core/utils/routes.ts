export class RoutesConstants {
    static HOME = 'home';
    static TARGET = 'target';
    static PROFILE = 'profile';
    static TABS = 'tabs';
    static EDIT_TARGET = 'edit-target';
    static LOGIN = 'login';
    static ADD_FOOD = 'add-food';
    static FEEDING = 'feeding';
}

export class UrlsConstants {
    static URL_LOGIN = `/${RoutesConstants.LOGIN}`;
    static URL_HOME = `/${RoutesConstants.TABS}/${RoutesConstants.HOME}`;
    static URL_TARGET = `/${RoutesConstants.TABS}/${RoutesConstants.TARGET}`;
    static URL_PROFILE = `/${RoutesConstants.TABS}/${RoutesConstants.PROFILE}`;
    static URL_EDIT_TARGET = `/${RoutesConstants.EDIT_TARGET}`;
    static URL_ADD_FOOD = `/${RoutesConstants.ADD_FOOD}`;
    static URL_FEEDING = `/${RoutesConstants.FEEDING}`;
}
