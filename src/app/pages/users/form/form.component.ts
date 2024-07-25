import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular/standalone';
import { User } from '../user.interface';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { UserService } from '../user.service';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss'],
  standalone: true,
  imports: [IonicModule, FormsModule, ReactiveFormsModule]
})
export class FormComponent implements OnInit {

  userForm: FormGroup;

  @Input() user: User = { name: '', role: 'user' };
  @Input() isEdit: boolean = false;

  constructor(private modalController: ModalController, private userService: UserService) {
    this.userForm = new FormGroup({
      name: new FormControl(this.user.name || ''),
      role: new FormControl(this.user.role || 'user')
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
