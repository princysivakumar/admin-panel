import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { RoleService } from '../services/role.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-role-form',
  standalone: true,
  imports: [FormsModule,ReactiveFormsModule],
  templateUrl: './role-form.component.html',
  styleUrl: './role-form.component.scss'
})
export class RoleFormComponent {
  roleForm: FormGroup;
  roleId: string | null = null;

  constructor(
    private fb: FormBuilder,
    private roleService: RoleService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.roleForm = this.fb.group({
      name: ['', Validators.required],
      description: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.roleId = params['id'] ? params['id'] : null;
      if (this.roleId) {
        this.loadRole();
      }
    });
  }

  private loadRole() {
    this.roleService.getRoles().subscribe({
      next: (res) => {
        const filterData = res.filter((el) => el.id == this.roleId );
              this.roleForm.patchValue({
        name: filterData[0].name,
        description: filterData[0].description
      });
      }
    })
  }

 public saveRole(){
    if (this.roleForm.invalid) {
      this.roleForm.markAllAsTouched();
      return
    }
      if (this.roleId) {
        this.roleService.updateRole(this.roleId,this.roleForm.value).subscribe(() => {
          this.router.navigate(['/roles']);
        });
      } else {
        this.roleService.addRole(this.roleForm.value).subscribe(() => {
          this.router.navigate(['/roles']);
        });
      }
    
  }

}
