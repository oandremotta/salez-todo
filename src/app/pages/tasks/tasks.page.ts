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

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.page.html',
  styleUrls: ['./tasks.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, HeaderComponent, LucideAngularModule]
})
export class TasksPage implements OnInit {

  tasks$!: Observable<any[]>;
  searchTerm: string = '';

  constructor(private taskService: TaskService, private modalCtrl: ModalController) { }

  ngOnInit() {
    this.tasks$ = this.taskService.getTasks();
  }

  async openModal() {
    const modal = await this.modalCtrl.create({
      component: TaskFormComponent,
      componentProps: { isEdit: false }
    });

    modal.present!();

    const { data } = await modal.onWillDismiss();

    if (data?.reload) {
      this.tasks$ = this.taskService.getTasks();
    }
  }

  onSearchChange() {
    this.tasks$ = this.taskService.getTasks(this.searchTerm);
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
      this.tasks$ = this.taskService.getTasks();
    }
  }

}
