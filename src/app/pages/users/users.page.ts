import { CUSTOM_ELEMENTS_SCHEMA, Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { LucideAngularModule } from 'lucide-angular';
import { Firestore, collection, getDocs } from '@angular/fire/firestore';
import { ActionSheetController, IonicModule, ModalController } from '@ionic/angular';
import { FormComponent } from './form/form.component';
import { UserService } from './user.service';
import { Observable } from 'rxjs';
import { User } from './user.interface';
import { HeaderComponent } from 'src/app/shared/components/header/header.component';
import { ConfirmationModalComponent } from 'src/app/shared/components/confirmation-modal/confirmation-modal.component';

@Component({
  selector: 'app-users',
  templateUrl: './users.page.html',
  styleUrls: ['./users.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, LucideAngularModule, HeaderComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]

})
export class UsersPage implements OnInit {

  users$!: Observable<any[]>;
  searchTerm: string = '';

  constructor(private modalCtrl: ModalController, private userService: UserService) { }
  isEdit: boolean = false;
  currentUserId: string | null = null;


  ngOnInit() {
    this.users$ = this.userService.getUsers();
  }

  onSearchChange() {
    // Atualiza a lista de usuários com base no termo de busca
    this.users$ = this.userService.getUsers(this.searchTerm);
  }

  async openModal() {
    const modal = await this.modalCtrl.create({
      component: FormComponent,
      componentProps: { isEdit: false }
    });

    modal.present!();

    const { data } = await modal.onWillDismiss();
    console.log(data);

    if (data?.reload) {
      console.log("Hhhhh");
      this.users$ = this.userService.getUsers();
    }
  }

  async openEditModal(user: User) {
    const modal = await this.modalCtrl.create({
      component: FormComponent,
      componentProps: { user: user, isEdit: true }
    });

    modal.present();

    const { data } = await modal.onWillDismiss();
    console.log(data);

    if (data?.reload) {
      this.users$ = this.userService.getUsers();
    }
  }

  async deleteUser(userId: string) {
    const confirmationModal = await this.modalCtrl.create({
      component: ConfirmationModalComponent
    });

    await confirmationModal.present();

    const { data } = await confirmationModal.onWillDismiss();
    if (data?.confirmed) {
      await this.userService.deleteUser(userId);

      this.users$ = this.userService.getUsers();
    } else {
      console.log('Exclusão cancelada');
    }

  }
}

