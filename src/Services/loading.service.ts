import { Injectable } from '@angular/core';
import { LoadingController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class LoadingService {
  private loading:LoadingController
  constructor(loading:LoadingController) {
    this.loading=loading;
  }
  async presentLoading(){
    const load = await this.loading.create({
      message:'Guardando'
    })
    await load.present();
  }
  async dismissLoading(){
    this.loading.dismiss();
  }
}
