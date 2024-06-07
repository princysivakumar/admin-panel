import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RoleService {
 
  private apiUrl = 'http://localhost:3000/roles';

  constructor(private http: HttpClient) {}

  public getRoles(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  public addRole(role: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, role);
  }

  public updateRole(role: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${role.id}`, role);
  }

  public deleteRole(id: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${id}`);
  }

}
