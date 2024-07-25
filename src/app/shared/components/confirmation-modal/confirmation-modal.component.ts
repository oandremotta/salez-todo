import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { ModalController } from '@ionic/angular/standalone';

@Component({
  selector: 'app-confirmation-modal',
  templateUrl: './confirmation-modal.component.html',
  styleUrls: ['./confirmation-modal.component.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule]
})
export class ConfirmationModalComponent implements OnInit {

  constructor(private modalCtrl: ModalController) { }

  dismiss(confirmed: boolean) {
    this.modalCtrl.dismiss({ confirmed });
  }
  ngOnInit() { }

}
