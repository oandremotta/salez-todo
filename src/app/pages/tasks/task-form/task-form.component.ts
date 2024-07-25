import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { TaskService } from '../tasks.service';
import { IonicModule, ModalController } from '@ionic/angular';
import { Task } from '../task.interface';
import { CommonModule } from '@angular/common';
import { User } from 'firebase/auth';
import { UserService } from '../../users/user.service';
import { Observable } from 'rxjs';
import { Timestamp } from 'firebase/firestore';

@Component({
  selector: 'app-task-form',
  templateUrl: './task-form.component.html',
  styleUrls: ['./task-form.component.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, ReactiveFormsModule]
})
export class TaskFormComponent implements OnInit {

  taskForm: FormGroup;
  users$!: Observable<any[]>;

  @Input() task: Task = { title: '', description: '', status: 'pendente', created_at: Timestamp.now(), exp_date: Timestamp.now(), user_id: '' };
  @Input() isEdit: boolean = false;

  constructor(private modalController: ModalController, private taskService: TaskService, private userService: UserService) {
    this.taskForm = new FormGroup({
      title: new FormControl(this.task.title || '', { nonNullable: true }),
      description: new FormControl(this.task.description || ''),
      status: new FormControl(this.task.status || 'pending'),
      exp_date: new FormControl(this.task.exp_date || ''),
      user_id: new FormControl(this.task.user_id || '', { nonNullable: true })
    });
  }

  ngOnInit(): void {
    this.users$ = this.userService.getUsers();
    if (this.isEdit) {
      this.taskForm.patchValue(this.task);
      console.log(this.task.exp_date.toDate().toISOString().substring(0, 10));
    }
  }

  save() {
    if (this.taskForm.valid) {
      const formValue = this.taskForm.value;
      const taskData: Task = {
        title: formValue.title,
        description: formValue.description,
        status: formValue.status as 'pendente' | 'em andamento' | 'concluído',
        exp_date: Timestamp.fromDate(new Date(formValue.exp_date)),
        created_at: this.task.created_at || Timestamp.now(),
        user_id: formValue.user_id
      };
      if (this.isEdit) {
        if (this.task && this.task.id) {
          this.taskService.updateTask(this.task.id, taskData).then(() => {
            this.modalController.dismiss({ taskData, reload: true });
          }).catch((error: any) => {
            console.error("Error updating task: ", error);
          });
        }
      } else {
        this.taskService.addTask(taskData).then(() => {
          this.modalController.dismiss({ taskData, reload: true });
        }).catch((error: any) => {
          console.error("Error saving task: ", error);
        });
      }
    } else {
      console.log("Form is invalid");
    }
  }

  close() {
    this.modalController.dismiss({ reload: false });
  }
}
