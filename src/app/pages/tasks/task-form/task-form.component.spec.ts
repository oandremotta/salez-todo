import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import { ReactiveFormsModule } from '@angular/forms';
import { TaskFormComponent } from './task-form.component';
import { TaskService } from '../tasks.service';
import { UserService } from '../../users/user.service';
import { of, from } from 'rxjs';
import { Timestamp } from 'firebase/firestore';

// Mock do TaskService
class MockTaskService {
  getTasks() {
    return Promise.resolve([]); // Mock de retorno de tarefas vazias
  }
  addTask(task: any) {
    return Promise.resolve(task); // Mock de adicionar tarefa
  }
  updateTask(id: string, task: any) {
    return Promise.resolve(task); // Mock de atualizar tarefa
  }
}

// Mock do UserService
class MockUserService {
  getUsers() {
    return Promise.resolve([]); // Mock de retorno de usuários vazios
  }
}

describe('TaskFormComponent', () => {
  let component: TaskFormComponent;
  let fixture: ComponentFixture<TaskFormComponent>;
  let taskService: TaskService;
  let userService: UserService;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [IonicModule.forRoot(), ReactiveFormsModule],
      providers: [
        { provide: TaskService, useClass: MockTaskService },
        { provide: UserService, useClass: MockUserService }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(TaskFormComponent);
    component = fixture.componentInstance;
    taskService = TestBed.inject(TaskService);
    userService = TestBed.inject(UserService);
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have a form with title, description, status, exp_date, and user_id', () => {
    expect(component.taskForm.contains('title')).toBeTrue();
    expect(component.taskForm.contains('description')).toBeTrue();
    expect(component.taskForm.contains('status')).toBeTrue();
    expect(component.taskForm.contains('exp_date')).toBeTrue();
    expect(component.taskForm.contains('user_id')).toBeTrue();
  });

  it('should make the title and exp_date fields required', () => {
    const titleControl = component.taskForm.get('title');
    titleControl?.setValue('');
    expect(titleControl?.valid).toBeFalse();

    const expDateControl = component.taskForm.get('exp_date');
    expDateControl?.setValue('');
    expect(expDateControl?.valid).toBeFalse();
  });

  it('should update form values for editing', () => {
    component.isEdit = true;
    component.task = {
      title: 'Test Task',
      description: 'Test Description',
      status: 'pendente',
      created_at: Timestamp.now(),
      exp_date: Timestamp.now(),
      user_id: '123'
    };

    component.ngOnInit();

    console.log('Form values:', component.taskForm.value);

    const expDateControl = component.taskForm.get('exp_date');
    console.log('expDateControl value:', expDateControl?.value);

    expect(component.taskForm.value).toEqual({
      title: 'Test Task',
      description: 'Test Description',
      status: 'pendente',
      exp_date: 'Invalid date',
      user_id: '123'
    });

    expect(expDateControl?.value).toBe('Invalid date');
  });

});
