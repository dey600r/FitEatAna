import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Platform } from '@ionic/angular';

// EXTERNAL LIBRARIES
import { TranslateService } from '@ngx-translate/core';
import { BrowserTab } from '@ionic-native/browser-tab/ngx';
import CryptoJS from 'crypto-js';
import { InAppBrowser, InAppBrowserObject } from '@ionic-native/in-app-browser/ngx';
 


import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss']
})
export class HomePage implements OnInit {

  getUrl: any;

  code = '';
  token: any = { access_token: ''};
  profile: any = { user: {}};
  browser: InAppBrowserObject;

  constructor(private platform: Platform,
              private translator: TranslateService,
              private router: ActivatedRoute,
              private http: HttpClient,
              private browserTab: BrowserTab,
              private iab: InAppBrowser) {
    this.platform.ready().then(() => {
      let userLang = navigator.language.split('-')[0];
      userLang = /(es|en)/gi.test(userLang) ? userLang : 'en';
      this.translator.use(userLang);
    }).finally(() => {
    });
  }

  ngOnInit() {
    this.code = this.router.snapshot.queryParams['code'];
    if (this.code) {
      this.getToken();
    }
  }

  getToken() {
    const base64auth: string = btoa('22C7D3:e106e52bb625f33eebd9fd4adce69107');
    const head = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded',
      Authorization: `Basic ${base64auth}`
    });

    const body: any = {
      'Content-Type': 'application/x-www-form-urlencoded',
      Authorization: `Basic ${base64auth}`
    }

    var code_veri = "dsakjdhsjakdghjaskbcjkahdskabhjdkjbaskdjksa";
    const param: any = {
      client_id: '22C7D3',
      grant_type: 'authorization_code',
      redirect_uri: 'http://localhost:8100/tabs/home',
      code: this.code,
      code_verifier: code_veri
    }

    this.http.post(`https://api.fitbit.com/oauth2/token`, body,
      { headers: head, params: param })
        .subscribe( resp => {
          console.log(resp);
          this.token = resp;
          this.getProfile();
        }, error => {
          console.log('ERROR ' + error);
        });


  }

  getProfile() {
    if (this.token.access_token) {
      const head = new HttpHeaders({
        Authorization: `Bearer  ${this.token.access_token}`,
      });
      this.http.get(`https://api.fitbit.com/1/user/-/profile.json`, { headers: head })
          .subscribe( resp => {
            console.log(resp);
            this.profile = resp;
          }, error => {
            console.log('ERROR ' + error);
          });
    }
  }

  click() {
    var code_verifier = btoa(CryptoJS.SHA256("dsakjdhsjakdghjaskbcjkahdskabhjdkjbaskdjksa".charCodeAt(0)));

    let url = 'https://www.fitbit.com/oauth2/authorize?';
    url += 'client_id=22C7D3&';
    url += 'redirect_uri=http://localhost:8100/tabs/home&';
    url += 'response_type=code&';
    url += 'scope=activity%20social%20profile&';
    url += `code_challange=${code_verifier}&`;
    url += 'code_challenge_method=S256';
    if (this.platform.is('android') || this.platform.is('ios')) {
      // this.browserTab.isAvailable()
      // .then(isAvailable => {
      //   if (isAvailable) {
      //     const listener = this.browserTab.openUrl(url);
      //   } else {
      //     console.log('ERROR browser tab');
      //   }
      // });

      this.browser = this.iab.create(url);
      this.browser.show();
      // browser.executeScript(...);

      // browser.insertCSS(...);
      this.browser.on('loadstop').subscribe(event => {
        //browser.insertCSS({ code: "body{color: red;" });
        console.log('stop');
      });

      this.browser.on('loadstart').subscribe(event => {
        //browser.insertCSS({ code: "body{color: red;" });
        console.log('start');
        if (event.url && event.url.includes('?code=')) {
          this.code = event.url.split('code=')[1].split('#_=_')[0];
          this.getToken();
          this.browser.close();
        }
      });

      this.browser.on('exit').subscribe(event => {
        //browser.insertCSS({ code: "body{color: red;" });
        console.log('exit');
      });

      //browser.close();
    } else {
      window.close();
      window.open(url);
    }
  
    // const fitbitAuth = new ClientOAuth2({
    //   clientId: '22C7D3',
    //   clientSecret: 'e106e52bb625f33eebd9fd4adce69107',
    //   accessTokenUri: 'https://api.fitbit.com/oauth2/token',
    //   authorizationUri: 'https://www.fitbit.com/oauth2/authorize',
    //   redirectUri: 'http://localhost:8100/tabs/home',
    //   scopes: ['activity', 'social', 'profile'],
    //   state: 'dey125r',
    //   code_challange
    // });
    // const url = fitbitAuth.code.getUri();
    
  }

}
