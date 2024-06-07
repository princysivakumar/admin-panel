import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { UserListComponent } from './user-list.component';
import { UserService } from '../services/user.service';
import { of } from 'rxjs';
import { By } from '@angular/platform-browser';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatTooltipModule } from '@angular/material/tooltip';

describe('UserListComponent', () => {
  let component: UserListComponent;
  let fixture: ComponentFixture<UserListComponent>;
  let userService: UserService;

   const dummyUsers = [
    { id: '1', name: 'John Doe', email: 'john@example.com', role: 'Admin', status: 'active', password:'test1' },
    { id: '2', name: 'Jane Doe', email: 'jane@example.com', role: 'User', status: 'inactive',password:'test2' }
  ];


  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        MatIconModule,
        MatButtonModule,
        MatTooltipModule,
        UserListComponent
      ],
    
      providers: [UserService]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserListComponent);
    component = fixture.componentInstance;
    userService = TestBed.inject(UserService);

    spyOn(userService, 'getUsers').and.returnValue(of(dummyUsers));
  });

  it('should create', () => {
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  it('should fetch and display users', waitForAsync(() => {
    fixture.detectChanges();
    fixture.whenStable().then(() => {
      expect(component.users.length).toBe(2);
      expect(component.users).toEqual(dummyUsers);

      fixture.detectChanges();
      const userElements = fixture.debugElement.queryAll(By.css('.user-row'));
      expect(userElements.length).toBe(2);
    });
  }));

  it('should call editUser', waitForAsync(() => {
    fixture.detectChanges();
    fixture.whenStable().then(() => {
      spyOn(component, 'editUser');
      const user = dummyUsers[0];

      fixture.detectChanges(); // Ensure the DOM is updated

      const editButton = fixture.debugElement.query(By.css('.edit-button'));
      expect(editButton).not.toBeNull();

      if (editButton) {
        editButton.nativeElement.click();
        fixture.detectChanges(); // Update the DOM after click
        expect(component.editUser).toHaveBeenCalledWith(user);
      }
    });
  }));

  it('should call deleteUser', waitForAsync(() => {
    fixture.detectChanges();
    fixture.whenStable().then(() => {
      spyOn(component, 'deleteUser');
      const userId = dummyUsers[0].id;

      fixture.detectChanges(); // Ensure the DOM is updated

      const deleteButton = fixture.debugElement.query(By.css('.delete-button'));
      expect(deleteButton).not.toBeNull();

      if (deleteButton) {
        deleteButton.nativeElement.click();
        fixture.detectChanges(); // Update the DOM after click
        expect(component.deleteUser).toHaveBeenCalledWith(userId);
      }
    });
  }));
});
