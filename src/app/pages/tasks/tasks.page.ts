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
import { SkeletonComponent } from 'src/app/shared/components/skeleton/skeleton.component';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.page.html',
  styleUrls: ['./tasks.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, HeaderComponent, LucideAngularModule, SkeletonComponent]
})
export class TasksPage implements OnInit {

  tasks: Task[] = [];
  searchTerm: string = '';
  userNameFilter: string = '';
  filteredTasks: Task[] = [];
  statusFilter: string = '';
  sortByDate: boolean = false;
  sortOrder: 'asc' | 'desc' = 'asc';
  loaded: boolean = false;


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
        console.log("Entrou");
        console.log('Tasks: ', tasks);
        this.applyFilters();
      },
      error: (error) => {
        console.error('Error getting tasks: ', error);
      }
    })
  }

  applyFilters() {
    let result = this.tasks;

    if (this.statusFilter) {
      result = result.filter(task => task.status === this.statusFilter);
    }

    if (this.userNameFilter) {
      result = result.filter(task => task.userName?.toLowerCase().includes(this.userNameFilter.toLowerCase()));
    }

    if (this.sortByDate) {
      result = this.sortTasksByDate(result);
    }

    this.loaded = true;
    this.filteredTasks = result;
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

  sortTasksByDate(tasks: Task[]): Task[] {
    return tasks.sort((a, b) => {
      const dateA = a.exp_date instanceof Timestamp ? a.exp_date.toDate() : new Date(a.exp_date);
      const dateB = b.exp_date instanceof Timestamp ? b.exp_date.toDate() : new Date(b.exp_date);
      const diff = dateA.getTime() - dateB.getTime();

      return this.sortOrder === 'asc' ? diff : -diff; // Ordena conforme a direção
    });
  }

  toggleSortOrder() {
    this.sortByDate = true;
    this.sortOrder = this.sortOrder === 'asc' ? 'desc' : 'asc';
    this.applyFilters();
  }

  delete(task: Task) {
    this.taskService.deleteTask(task.id).then(() => {
      this.getTasks();
    }).catch((error: any) => {
      console.error('Error deleting task: ', error);
    });
  }

}
