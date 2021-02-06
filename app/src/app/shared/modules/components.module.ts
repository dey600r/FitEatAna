import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

// LIBRARIES IONIC
import { IonicModule } from '@ionic/angular';

// LIBRARIES ANGULAR
import { TranslateModule } from '@ngx-translate/core';
import { HttpClientModule } from '@angular/common/http';

// PLUGINS
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';

// UTILS
import { CommonService } from '@services/index';

// COMPONENTS
import { InfoComponent } from '@components/info/info.component';

@NgModule({
  declarations: [
    InfoComponent,
  ],
  entryComponents: [],
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    HttpClientModule,
    TranslateModule.forChild()
  ],
  exports: [
    InfoComponent
  ],
  providers: [
    CommonService,
    InAppBrowser
  ]
})
export class ComponentsModule { }
