import { TestBed, ComponentFixture } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';
import { By } from '@angular/platform-browser';
import { RouterOutlet } from '@angular/router';

describe('AppComponent', () => {
  let fixture: ComponentFixture<AppComponent>;
  let component: AppComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterTestingModule, AppComponent]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the app', () => {
    expect(component).toBeTruthy();
  });

  it('should render User Management button with correct text', () => {
    const userButton = fixture.debugElement.query(By.css('button')).nativeElement;
    expect(userButton.textContent).toContain('User Management');
  });

  it('should render Role Management button with correct text', () => {
    const buttons = fixture.debugElement.queryAll(By.css('button'));
    const roleButton = buttons[1].nativeElement;
    expect(roleButton.textContent).toContain('Role Management');
  });

  it('should disable User Management button when isUserManagementActive is true', () => {
    component.isUserManagementActive = true;
    fixture.detectChanges();
    const userButton = fixture.debugElement.query(By.css('button')).nativeElement;
    expect(userButton.disabled).toBeTruthy();
  });

  it('should disable Role Management button when isRoleManagementActive is true', () => {
    component.isRoleManagementActive = true;
    fixture.detectChanges();
    const buttons = fixture.debugElement.queryAll(By.css('button'));
    const roleButton = buttons[1].nativeElement;
    expect(roleButton.disabled).toBeTruthy();
  });

  it('should call navigateTo with "/users" when User Management button is clicked', () => {
    spyOn(component, 'navigateTo');
    const userButton = fixture.debugElement.query(By.css('button')).nativeElement;
    userButton.click();
    expect(component.navigateTo).toHaveBeenCalledWith('/users');
  });

  it('should call navigateTo with "/roles" when Role Management button is clicked', () => {
    spyOn(component, 'navigateTo');
    const buttons = fixture.debugElement.queryAll(By.css('button'));
    const roleButton = buttons[1].nativeElement;
    roleButton.click();
    expect(component.navigateTo).toHaveBeenCalledWith('/roles');
  });

  it('should render router outlet', () => {
    const routerOutlet = fixture.debugElement.query(By.directive(RouterOutlet));
    expect(routerOutlet).not.toBeNull();
  });
});



