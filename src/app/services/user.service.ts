import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private apiUrl = 'http://localhost:3000/users';
  constructor(private http: HttpClient) {};

  public getUsers(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  public addUser(user: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, user);
  }

  public updateUser(userId: string, user: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${userId}`, user);
  }

  public deleteUser(id: string): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${id}`);
  }

}
