import { HttpClient} from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,MatIconModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  title = 'admin-panel';
  isUserManagementActive: boolean = false;
  isRoleManagementActive: boolean = false;

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.isUserManagementActive = event.url.includes('/users');
        this.isRoleManagementActive = event.url.includes('/roles');
      }
    });
  }

  navigateTo(path: string): void {
    this.router.navigate([path]);
  }



}
