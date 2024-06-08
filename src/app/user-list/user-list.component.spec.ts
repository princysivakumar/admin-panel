import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { of } from 'rxjs';
import { UserListComponent } from './user-list.component';
import { UserService } from '../services/user.service';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';


describe('UserListComponent', () => {
  let component: UserListComponent;
  let fixture: ComponentFixture<UserListComponent>;
  let userService: UserService;

  const dummyUsers = [
        { id: '1', name: 'John Doe', email: 'john@example.com', role: 'Admin', status: 'active', password:'test1' },
        { id: '2', name: 'Jane Doe', email: 'jane@example.com', role: 'User', status: 'inactive',password:'test2' }
      ];


  beforeEach(async () => {
    await TestBed.configureTestingModule({
     
      imports: [HttpClientTestingModule,UserListComponent, MatIconModule,
                MatIconModule,
                MatTooltipModule,],
      providers: [UserService]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserListComponent);
    component = fixture.componentInstance;
    userService = TestBed.inject(UserService);

    spyOn(userService, 'getUsers').and.returnValue(of(dummyUsers));
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should fetch and display users', () => {
    component.fetchUsers();
    expect(component.users.length).toBe(2);
    expect(component.users).toEqual(dummyUsers);
  });

  it('should handle adding a user', () => {
    spyOn(component, 'addUser');
    component.addUser();
    expect(component.addUser).toHaveBeenCalled();
  });

  it('should handle editing a user', () => {
    spyOn(component, 'editUser');
    const user = dummyUsers[0];
    component.editUser(user.id);
    expect(component.editUser).toHaveBeenCalledWith(user.id);
  });

  it('should handle deleting a user', () => {
    spyOn(component, 'deleteUser');
    const userId = dummyUsers[0].id;
    component.deleteUser(userId);
    expect(component.deleteUser).toHaveBeenCalledWith(userId);
  });
});