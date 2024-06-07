import { Routes } from '@angular/router';
import { AppComponent } from '../app/app.component';

export const routes: Routes = [
  {
    path: 'users',
    loadComponent: () =>
      import('../app/user-list/user-list.component').then((c) => c.UserListComponent),
  },
  {
    path: 'roles',
    loadComponent: () =>
        import('../app/role-list/role-list.component').then((c) => c.RoleListComponent),
  },
  {
    path: 'user-form',
    loadComponent: () =>
        import('../app/user-form/user-form.component').then((c) => c.UserFormComponent),
  },
  {
    path: 'role-form',
    loadComponent: () =>
        import('../app/role-form/role-form.component').then((c) => c.RoleFormComponent),
  },

  { path: '', redirectTo: '/users', pathMatch: 'full' }

];
