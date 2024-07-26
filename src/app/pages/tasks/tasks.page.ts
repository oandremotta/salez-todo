import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar } from '@ionic/angular/standalone';
import { TaskService } from './tasks.service';
import { Observable } from 'rxjs';
import { HeaderComponent } from 'src/app/shared/components/header/header.component';
import { IonicModule, ModalController } from '@ionic/angular';
import { LucideAngularModule } from 'lucide-angular';
import { TaskFormComponent } from './task-form/task-form.component';
import { Task } from './task.interface';
import { Timestamp } from 'firebase/firestore';
import * as moment from 'moment';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.page.html',
  styleUrls: ['./tasks.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, HeaderComponent, LucideAngularModule]
})
export class TasksPage implements OnInit {

  tasks: Task[] = [];
  searchTerm: string = '';
  userNameFilter: string = '';

  constructor(private taskService: TaskService, private modalCtrl: ModalController) { }

  ngOnInit() {
    this.getTasks();
  }

  async openModal() {
    const modal = await this.modalCtrl.create({
      component: TaskFormComponent,
      componentProps: { isEdit: false }
    });

    modal.present!();

    const { data } = await modal.onWillDismiss();

    if (data?.reload) {
      this.getTasks();
    }
  }

  getTasks() {
    this.taskService.getTasks().subscribe({
      next: (tasks) => {
        this.tasks = tasks;
        console.log(this.tasks);
      },
      error: (error) => {
        console.error('Error getting tasks: ', error);
      }
    })
  }

  async openEditModal(task: Task) {
    const modal = await this.modalCtrl.create({
      component: TaskFormComponent,
      componentProps: { task: task, isEdit: true }
    });

    modal.present();

    const { data } = await modal.onWillDismiss();
    console.log(data);

    if (data?.reload) {
      this.getTasks();
    }
  }

  convertTimestampToDate(timestamp: Timestamp): string {
    const formattedDate = moment(timestamp).format('YYYY-MM-DD');

    return formattedDate;
  }

}
