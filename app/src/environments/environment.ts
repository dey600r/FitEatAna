// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  pathTranslate: './assets/i18n/',
  fitbit: {
    urlApi: 'https://api.fitbit.com',
    urlAuthorization: '/oauth2/authorize',
    urlToken: '/oauth2/token',
    urlSignUp: 'https://accounts.fitbit.com/signup',
    clientId: '22C7D3',
    secretAuthorizationId: 'MjJDN0QzOmUxMDZlNTJiYjYyNWYzM2VlYmQ5ZmQ0YWRjZTY5MTA3',
    redirectUri: 'http://localhost:8100/tabs/home'
  }
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
