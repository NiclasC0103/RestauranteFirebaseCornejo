import { Injectable } from '@angular/core';
import { ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class ToastService {
  toast:ToastController
  constructor(toast:ToastController) {
    this.toast=toast;
   }

  async showToast(msg:string,color:string,icon:string){
    const err=await this.toast.create({
      duration:1500,
      message:msg,
      color:color,
      icon:icon,
    });
    err.present()
  }

}
