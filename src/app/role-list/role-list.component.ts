import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RoleService } from '../services/role.service';

@Component({
  selector: 'app-role-list',
  standalone: true,
  imports: [],
  templateUrl: './role-list.component.html',
  styleUrl: './role-list.component.scss'
})
export class RoleListComponent implements OnInit {
  roles: any[] = [];

  constructor(private roleService: RoleService, private router: Router) { }

  ngOnInit(): void {
    this.loadRoles();
  }

  loadRoles(): void {
    this.roleService.getRoles().subscribe((roles: any[]) => {
      this.roles = roles;
    });
  }

  addRole(): void {
    this.router.navigate(['/role-form']);
  }

  editRole(id: number): void {
    this.router.navigate(['/role-form'], { queryParams: { id } });
  }

  deleteRole(id: number): void {
    this.roleService.deleteRole(id).subscribe(() => {
      this.loadRoles();
    });
  }
}
