import { Component, Input, OnInit } from '@angular/core';
import { ModalController, IonButton, IonModal, IonHeader, IonToolbar, IonTitle, IonButtons, IonContent, IonItem } from '@ionic/angular/standalone';
import { User } from '../user.interface';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss'],
  standalone: true
})
export class FormComponent implements OnInit {

  @Input() user: User = { name: '', role: 'user' };
  @Input() isEdit: boolean = false;

  constructor(private modalController: ModalController) { }

  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }

  save() {
    this.modalController.dismiss(this.user);
  }

  close() {
    this.modalController.dismiss();
  }
}
