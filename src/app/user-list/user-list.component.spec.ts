import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { UserListComponent } from './user-list.component';
import { UserService } from '../services/user.service';
import { of } from 'rxjs';
import { By } from '@angular/platform-browser';

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
      declarations: [UserListComponent],
      imports: [HttpClientTestingModule],
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

    fixture.detectChanges();
    const userElements = fixture.debugElement.queryAll(By.css('.user-row'));
    expect(userElements.length).toBe(2);
  });

  it('should call editUser', () => {
    spyOn(component, 'editUser');
    const user = dummyUsers[0];
    const editButton = fixture.debugElement.query(By.css('.edit-button')).nativeElement;
    editButton.click();
    expect(component.editUser).toHaveBeenCalledWith(user);
  });

  it('should call deleteUser', () => {
    spyOn(component, 'deleteUser');
    const userId = dummyUsers[0].id;
    const deleteButton = fixture.debugElement.query(By.css('.delete-button')).nativeElement;
    deleteButton.click();
    expect(component.deleteUser).toHaveBeenCalledWith(userId);
  });
});
