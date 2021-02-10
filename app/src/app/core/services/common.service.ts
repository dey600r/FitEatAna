import { Injectable } from '@angular/core';
import { Platform } from '@ionic/angular';

// LIBRARIES
import CryptoJS from 'crypto-js';

@Injectable({
  providedIn: 'root'
})
export class CommonService {

  constructor() { }

  getCryptoKey(key: string): string {
    return btoa(CryptoJS.SHA256(key.charCodeAt(0)));
  }

  getRandomKey(): string {
    return Math.random().toString(36) + window.crypto.getRandomValues(new Uint8Array(8)).join('') + Math.random().toString(36);
  }

  formatDecimal(value: number, decimals: number = 2): number {
    return Number(value.toFixed(decimals));
  }

}
