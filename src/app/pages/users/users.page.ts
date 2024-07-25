import { CUSTOM_ELEMENTS_SCHEMA, Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { LucideAngularModule } from 'lucide-angular';
import { HeaderComponent } from "../../components/header/header.component";
import { Firestore } from '@angular/fire/firestore';
import { collection, getDoc, getDocs } from 'firebase/firestore';
import { ActionSheetController, IonicModule, ModalController } from '@ionic/angular';
import { FormComponent } from './form/form.component';

@Component({
  selector: 'app-users',
  templateUrl: './users.page.html',
  styleUrls: ['./users.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, LucideAngularModule, HeaderComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]

})
export class UsersPage implements OnInit {

  users: any = [];
  constructor(private firestore: Firestore, private modalCtrl: ModalController) { }
  isEdit: boolean = false;
  currentUserId: string | null = null;


  ngOnInit() {
    this.getUsers();
  }

  async getUsers() {
    try {
      const dataRef: any = collection(this.firestore, 'users');
      const querySnapshot = await getDocs(dataRef);
      this.users = await querySnapshot.docs.map((doc) => {
        let user: any = doc.data();
        return user;
      });
      console.log(this.users);
    } catch (e) { }
  }

  async openModal() {
    const modal = await this.modalCtrl.create({
      component: FormComponent,
      componentProps: { isEdit: false }
    });

    modal.present!();
    const { data, role } = await modal.onWillDismiss();
  }

  // async editUser(user: User) {
  //   const modal = await this.modalController.create({
  //     component: UserFormComponent,
  //     componentProps: { user, isEdit: true }
  //   });
  //   await modal.present();
  //   const { data } = await modal.onWillDismiss();
  //   if (data) {
  //     try {
  //       const userRef = doc(this.firestore, 'users', user.id!);
  //       await updateDoc(userRef, data);
  //       this.getUsers();
  //     } catch (e) {
  //       console.error("Error updating user: ", e);
  //     }
  //   }
  // }

  // async deleteUser(userId: string) {
  //   try {
  //     await deleteDoc(doc(this.firestore, 'users', userId));
  //     this.getUsers();
  //   } catch (e) {
  //     console.error("Error deleting user: ", e);
  //   }
  // }

}
