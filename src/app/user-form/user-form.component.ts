import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { RoleService } from '../services/role.service';

@Component({
  selector: 'app-user-form',
  standalone: true,
  imports: [FormsModule,ReactiveFormsModule],
  templateUrl: './user-form.component.html',
  styleUrl: './user-form.component.scss'
})
export class UserFormComponent implements OnInit {
  public userForm: FormGroup;
  public roles: any[] = [];
  public isEditMode: boolean = false;
  userId: string | null = null;

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private roleService: RoleService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.userForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      role: ['', Validators.required],
      status: ['active', Validators.required],
    });

  }

  ngOnInit(): void {
    // Fetch roles for the dropdown
    this.roleService.getRoles().subscribe(roles => {
      this.roles = roles;
    });
 // Check if we are in edit mode
 this.route.queryParams.subscribe(params => {
 
  this.userId = params['id'] ? params['id'] : null;
  if (this.userId) {
    this.isEditMode = true;
    // this.userService.getUser(+id).subscribe(user => {
    //   console.log('user data',user);
      
    //   this.userForm.patchValue(user);
    //   // Remove password control in edit mode
    //   this.userForm.removeControl('password');
    // });
    // this.userForm.get('id')?.setValue(id)
    this.userService.getUsers().subscribe({
      next: (res) => {
        const filterData = res.filter((el) => el.id == this.userId );
        this.userForm.patchValue(filterData[0])
         // Remove password control in edit mode
      this.userForm.removeControl('password');
      }
    })
  }
});


}


saveUser(): void {
  if (this.userForm.invalid) {
    this.userForm.markAllAsTouched();
   
    return;
  }

  if (this.isEditMode && this.userId) {
    this.userService.updateUser(this.userId, this.userForm.value).subscribe(() => {
      alert('User updated successfully!');
      this.router.navigate(['/users']);
    }, error => {
      alert('Failed to update user.');
      console.error(error);
    });
  } else {
    this.userService.addUser(this.userForm.value).subscribe(() => {
      alert('User added successfully!');
      this.router.navigate(['/users']);
    }, error => {
      alert('Failed to add user.');
      console.error(error);
    });
  }
}
}
