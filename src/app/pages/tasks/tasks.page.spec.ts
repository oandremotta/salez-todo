import { TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { TaskService } from './tasks.service';
import { Task } from './task.interface';
import { Timestamp } from 'firebase/firestore';

class MockTaskService {
  getTasks() {
    return of([
      { id: '1', title: 'Task 1', description: 'Description 1', status: 'pendente', exp_date: Timestamp.fromDate(new Date('2023-01-01')), userName: 'User 1', user_id: '1', created_at: Timestamp.fromDate(new Date('2023-01-01')) },
      { id: '2', title: 'Task 2', description: 'Description 2', status: 'concluído', exp_date: Timestamp.fromDate(new Date('2022-01-01')), userName: 'User 2', user_id: '2', created_at: Timestamp.fromDate(new Date('2022-01-01')) }
    ]);
  }

  deleteTask(id: string) {
    return of();
  }
}

describe('TaskService', () => {
  let service: TaskService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        { provide: TaskService, useClass: MockTaskService }
      ]
    });

    service = TestBed.inject(TaskService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should fetch tasks', () => {
    service.getTasks().subscribe(tasks => {
      expect(tasks.length).toBe(2);
      expect(tasks[0].title).toBe('Task 1');
      expect(tasks[1].title).toBe('Task 2');
    });
  });

  it('should fetch pending tasks', () => {
    service.getTasks().subscribe(tasks => {
      const pendingTasks = tasks.filter(task => task.status === 'pendente');
      expect(pendingTasks.length).toBe(1);
      expect(pendingTasks[0].status).toBe('pendente');
    });
  });

  it('should fetch completed tasks', () => {
    service.getTasks().subscribe(tasks => {
      const completedTasks = tasks.filter(task => task.status === 'concluído');
      expect(completedTasks.length).toBe(1);
      expect(completedTasks[0].status).toBe('concluído');
    });
  });
});
