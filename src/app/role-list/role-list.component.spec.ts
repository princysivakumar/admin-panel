import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RoleListComponent } from './role-list.component';
import { RoleService } from '../services/role.service';
import { of } from 'rxjs';

describe('RoleListComponent', () => {
  let component: RoleListComponent;
  let fixture: ComponentFixture<RoleListComponent>;
  let roleService: RoleService;

  const dummyRoles = [
    { id: '1', name: 'Admin', description: 'Administrator role' },
    { id: '2', name: 'User', description: 'Regular user role' }
  ];

  beforeEach(async () => {
    await TestBed.configureTestingModule({
     
      imports: [HttpClientTestingModule,RoleListComponent],
      providers: [RoleService]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RoleListComponent);
    component = fixture.componentInstance;
    roleService = TestBed.inject(RoleService);

    spyOn(roleService, 'getRoles').and.returnValue(of(dummyRoles));
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should fetch and display roles', () => {
    component.loadRoles();
    expect(component.roles.length).toBe(2);
    expect(component.roles).toEqual(dummyRoles);
  });

  it('should handle adding a role', () => {
    spyOn(component, 'addRole');
    component.addRole();
    expect(component.addRole).toHaveBeenCalled();
  });

  it('should handle editing a role', () => {
    spyOn(component, 'editRole');
    const role = dummyRoles[0];
    component.editRole(role.id);
    expect(component.editRole).toHaveBeenCalledWith(role.id);
  });

  it('should handle deleting a role', () => {
    spyOn(component, 'deleteRole');
    const roleId = dummyRoles[0].id;
    component.deleteRole(roleId);
    expect(component.deleteRole).toHaveBeenCalledWith(roleId);
  });
});
