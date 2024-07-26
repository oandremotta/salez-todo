import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular/standalone';
import { User } from '../user.interface';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { UserService } from '../user.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, ReactiveFormsModule]
})
export class UserFormComponent implements OnInit {

  userForm: FormGroup;

  @Input() user: User = { name: '', role: 'user' };
  @Input() isEdit: boolean = false;

  constructor(private modalController: ModalController, private userService: UserService) {
    this.userForm = new FormGroup({
      name: new FormControl(this.user.name || '', Validators.required),
      role: new FormControl(this.user.role || 'user', Validators.required)
    });
  }

  ngOnInit(): void {
    if (this.isEdit) {
      this.userForm.patchValue(this.user);
    }
  }

  save() {
    if (this.userForm.valid) {
      const formValue = this.userForm.value;
      // Garantir que role é um valor válido
      const userData: User = {
        name: formValue.name || '',
        role: formValue.role as 'admin' | 'user' // Assegura que role é do tipo 'admin' | 'user'
      };
      if (this.isEdit) {
        console.log(this.user);
        if (this.user && this.user.id) {
          this.userService.updateUser(this.user.id, userData);
          this.modalController.dismiss({ userData, reload: true });
        }
      } else {
        this.userService.addUser(userData).then(() => {
          this.modalController.dismiss({ userData, reload: true });
        }).catch(error => {
          console.error("Error saving user: ", error);
        });
      }
    } else {
      console.log("Form is invalid");
    }
  }

  close() {
    this.modalController.dismiss({ reload: false });
    this.modalController.dismiss();
  }


}