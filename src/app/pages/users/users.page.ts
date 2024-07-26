import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { LucideAngularModule } from 'lucide-angular';
import { ModalController } from '@ionic/angular';
import { Observable, BehaviorSubject } from 'rxjs';
import { UserService } from './user.service';
import { User } from './user.interface';
import { HeaderComponent } from 'src/app/shared/components/header/header.component';
import { ConfirmationModalComponent } from 'src/app/shared/components/confirmation-modal/confirmation-modal.component';
import { UserFormComponent } from './user-form/user-form.component';
import { SkeletonComponent } from 'src/app/shared/components/skeleton/skeleton.component';
import { IonContent } from "@ionic/angular/standalone";

@Component({
  selector: 'app-users',
  templateUrl: './users.page.html',
  styleUrls: ['./users.page.scss'],
  standalone: true,
  imports: [IonContent, CommonModule, FormsModule, LucideAngularModule, HeaderComponent, SkeletonComponent],
})
export class UsersPage implements OnInit {

  users$!: Observable<User[]>;
  userNameFilter: string = '';
  filteredUsers: User[] = [];

  constructor(private modalCtrl: ModalController, private userService: UserService) { }

  ngOnInit() {
    this.users$ = this.userService.getUsers();
    this.users$.subscribe(users => this.filteredUsers = users);
  }

  applyFilters() {
    this.users$.subscribe(users => {
      this.filteredUsers = users.filter(user =>
        (!this.userNameFilter || user.name.toLowerCase().includes(this.userNameFilter.toLowerCase()))
      );
    });
  }

  async openModal() {
    const modal = await this.modalCtrl.create({
      component: UserFormComponent,
      componentProps: { isEdit: false }
    });

    await modal.present();
    const { data } = await modal.onWillDismiss();

    if (data?.reload) {
      this.users$ = this.userService.getUsers();
      this.users$.subscribe(users => this.filteredUsers = users);
    }
  }

  async openEditModal(user: User) {
    const modal = await this.modalCtrl.create({
      component: UserFormComponent,
      componentProps: { user: user, isEdit: true },
    });

    await modal.present();
    const { data } = await modal.onWillDismiss();

    if (data?.reload) {
      this.users$ = this.userService.getUsers();
      this.users$.subscribe(users => this.filteredUsers = users);
    }
  }

  async deleteUser(user: User) {
    const confirmationModal = await this.modalCtrl.create({
      component: ConfirmationModalComponent
    });

    await confirmationModal.present();
    const { data } = await confirmationModal.onWillDismiss();

    if (data?.confirmed && user.id) {
      await this.userService.deleteUser(user.id);
      this.users$ = this.userService.getUsers();
      this.users$.subscribe(users => this.filteredUsers = users);
    } else {
      console.log('Exclusão cancelada');
    }
  }
}
