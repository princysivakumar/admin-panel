import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { MatIconModule } from '@angular/material/icon';
import {MatTooltipModule} from '@angular/material/tooltip';
import { Router } from '@angular/router';
import { CommonModule, TitleCasePipe } from '@angular/common';
import { User } from '../interfaces/user.interface';

@Component({
  selector: 'app-user-list',
  standalone: true,
  imports: [MatIconModule, MatTooltipModule,CommonModule],
  templateUrl: './user-list.component.html',
  styleUrl: './user-list.component.scss',
  
})
export class UserListComponent implements OnInit {
  users: User[] = [];

  constructor(private userService: UserService, private router: Router) {}

 
  ngOnInit(): void {
    this.fetchUsers();
  }

  public fetchUsers(){
    this.userService.getUsers().subscribe(users => {
      this.users = users;
    });
  }

  public editUser(user: any) {
    // Navigate to  user form with user data
    this.router.navigate(['/user-form'], { queryParams: { id: user.id } });
  }

  public deleteUser(id: string) {
    this.userService.deleteUser(id).subscribe(() => {
      this.users = this.users.filter(user => user.id !== id);
    });
  }

  public addUser(){
    this.router.navigate(['/user-form'])
  }



}
