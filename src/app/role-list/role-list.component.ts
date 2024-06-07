import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RoleService } from '../services/role.service';
import { Role } from '../interfaces/role.interface';

@Component({
  selector: 'app-role-list',
  standalone: true,
  imports: [],
  templateUrl: './role-list.component.html',
  styleUrl: './role-list.component.scss'
})
export class RoleListComponent implements OnInit {
  roles: Role[] = [];

  constructor(private roleService: RoleService, private router: Router) { }

  ngOnInit(): void {
    this.loadRoles();
  }

  private loadRoles() {
    this.roleService.getRoles().subscribe((roles: any[]) => {
      this.roles = roles;
    });
  }

  public addRole() {
    this.router.navigate(['/role-form']);
  }

  public editRole(id: string) {
    this.router.navigate(['/role-form'], { queryParams: { id } });
  }

  public deleteRole(id: string) {
    this.roleService.deleteRole(id).subscribe(() => {
      this.loadRoles();
    });
  }
}
