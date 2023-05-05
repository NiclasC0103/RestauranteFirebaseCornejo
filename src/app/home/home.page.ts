import { BdService } from './../../Services/bd.service';
import { Component } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { Item } from 'src/Models/item';
import { FormsModule } from '@angular/forms';
import { ToastService } from 'src/Services/toast.service';
import { LoadingService } from 'src/Services/loading.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: true,
  imports: [IonicModule, FormsModule, CommonModule],
})
export class HomePage {
  private enlace: string = 'Platos';
  public Platos: Item[] = [];
  public newPlato: Item = {
    id: '',
    precio: '',
    nombre: '',
    calorias: '',
    cantidad: '',
    foto: '', // Agregamos la propiedad foto al objeto newPlato
  };

  constructor(
    private bd: BdService,
    private toast: ToastService,
    private load: LoadingService
  ) {}

  ngOnInit() {
    this.bd.get<Item>(this.enlace).subscribe((p) => {
      this.Platos = p;
    });
  }

  save() {
    this.load.presentLoading();
    this.newPlato.id = this.bd.createId(this.enlace);
    const data = this.newPlato;
    this.bd
      .add<Item>(data, this.enlace, this.newPlato.id)
      .then(() => {
        this.toast.showToast('Éxito al guardar', 'success', 'checkbox-outline');
        this.load.dismissLoading();
        this.clean();
      })
      .catch(() => {
        this.toast.showToast('Error al guardar', 'danger', 'sad-outline');
      });
  }

  delete(p: Item) {
    this.load.presentLoading();
    this.bd
      .delete(`Platos`, p.id)
      .then(() => {
        this.toast.showToast('Éxito al Borrar', 'success', 'trash-outline');
        this.load.dismissLoading();
      })
      .catch(() => {
        this.toast.showToast('Error al Borrar', 'danger', 'sad-outline');
      });
  }

  handleFileInput(event: any) {
    const file = event.target.files[0];
    this.uploadFile(file);
  }

  uploadFile(file: any) {
    const reader = new FileReader();
    reader.onload = (e: any) => {
      this.newPlato.foto = e.target.result as string;
    };
    reader.readAsDataURL(file);
  }

  clean(){
    this.newPlato.id="";
    this.newPlato.precio="";
    this.newPlato.nombre="";
    this.newPlato.calorias="";
    this.newPlato.cantidad="";
    }
  }


