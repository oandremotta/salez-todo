import { TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { UserService } from './user.service';
import { User } from './user.interface';

class MockUserService {
  getUsers() {
    return of([{ name: 'John Doe', role: 'admin' },
    { name: 'André Motta', role: 'user' }]);
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

  it('should fetch users', () => {
    service.getUsers().subscribe(users => {
      expect(users.length).toBe(2);
    });
  });

});
