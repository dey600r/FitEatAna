import { Injectable } from '@angular/core';
import { ToastController, AlertController } from '@ionic/angular';

// LIBRARY ANGULAR
import { TranslateService } from '@ngx-translate/core';

// UTILS
import { Constants } from '@utils/index';

@Injectable({
  providedIn: 'root'
})
export class ControlService {

  constructor(private translator: TranslateService,
              private alertController: AlertController,
              private toastController: ToastController) { }

  // CONFIRMS

  async showConfirm(title: string, msg: string, buttonAccept: any) {
    const alert = await this.alertController.create({
        header: title,
        message: msg,
        buttons: [
        {
            text: this.translator.instant('COMMON.CANCEL'),
            role: 'cancel',
            cssClass: 'secondary',
            handler: () => {}
        }, buttonAccept
        ]
    });

    await alert.present();
}

// TOAST

showToast(msg: string, data: any = null, delay: number = Constants.DELAY_TOAST,
          pos: string = Constants.TOAST_POSITION_STANDARD) {
    this.showMsgToast(this.translator.instant(msg, data), delay, pos);
}

async showMsgToast(msg: string, delay: number = Constants.DELAY_TOAST,
                   pos: any = Constants.TOAST_POSITION_STANDARD) {
    const toast = await this.toastController.create({
        message: msg,
        duration: delay,
        position: pos
    });
    toast.present();
}

// ALERTS

alertInfo(msg: string, header: string = 'ALERT.INFO') {
    this.alert(header, msg);
}

async alert(header: string, msg: string) {
    const alert = await this.alertController.create({
        header: this.translator.instant(header),
        subHeader: '',
        message: this.translator.instant(msg),
        buttons: [this.translator.instant(`COMMON.ACCEPT`)]
    });
    await alert.present();
}
}
