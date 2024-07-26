import { TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { UserService } from '../user.service';
import { User } from '../user.interface';

class MockUserService {
  getUsers() {
    return of([{ name: 'John Doe', role: 'admin' }]);
  }
}

describe('UserService', () => {
  let service: UserService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        { provide: UserService, useClass: MockUserService }
      ]
    });

    service = TestBed.inject(UserService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should be John Doe', () => {
    service.getUsers().subscribe(users => {
      const user = users[0];
      expect(user.name).toBe('John Doe');
    });
  });

  it('should be an admin', () => {
    service.getUsers().subscribe(users => {
      const user = users[0];
      expect(user.role).toBe('admin');
    });
  });

});
