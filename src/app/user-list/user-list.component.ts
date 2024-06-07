import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { MatIconModule } from '@angular/material/icon';
import {MatTooltipModule} from '@angular/material/tooltip';
import { Router } from '@angular/router';
import { CommonModule, TitleCasePipe } from '@angular/common';

@Component({
  selector: 'app-user-list',
  standalone: true,
  imports: [MatIconModule, MatTooltipModule,CommonModule],
  templateUrl: './user-list.component.html',
  styleUrl: './user-list.component.scss',
  
})
export class UserListComponent implements OnInit {
  users: any[] = [];

  constructor(private userService: UserService, private router: Router) {}

 
  ngOnInit(): void {
    this.userService.getUsers().subscribe(users => {
      this.users = users;
    });
  }

  editUser(user: any): void {
    // Navigate to  user form with user data
    this.router.navigate(['/user-form'], { queryParams: { id: user.id } });
  }

  deleteUser(id: number): void {
    this.userService.deleteUser(id).subscribe(() => {
      this.users = this.users.filter(user => user.id !== id);
    });
  }

  addUser(){
    this.router.navigate(['/user-form'])
  }



}
