import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { ModalController } from '@ionic/angular/standalone';
import { LucideAngularModule } from 'lucide-angular';

@Component({
  selector: 'app-confirmation-modal',
  templateUrl: './confirmation-modal.component.html',
  styleUrls: ['./confirmation-modal.component.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, LucideAngularModule]
})
export class ConfirmationModalComponent implements OnInit {

  constructor(private modalCtrl: ModalController) { }

  dismiss(confirmed: boolean) {
    this.modalCtrl.dismiss({ confirmed });
  }
  ngOnInit() { }

  close() {
    this.modalCtrl.dismiss();
  }

}
