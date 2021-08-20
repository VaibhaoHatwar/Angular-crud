import { Observable, of, throwError } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  baseUrl: string = 'https://jsonplaceholder.cypress.io/';

  constructor(private router: Router, private http: HttpClient) { }

  listUsers() {
    return this.http.get(this.baseUrl + 'users');
  }

  viewUser(id: string) {
    return this.http.get(this.baseUrl + 'users/' + id);
  }

  addUser(userObj: any) {
    return this.http.post(this.baseUrl + 'users', userObj);
  }

  deleteUser(id: any) {
    return this.http.delete(this.baseUrl + 'users/' + id);
  }

  updateUser(id:any, userObj: any) {
    return this.http.put(this.baseUrl + 'users/' + id, userObj);
  }


  setToken(token: string): void {
    localStorage.setItem('token', token);
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  isLoggedIn() {
    return this.getToken() !== null;
  }

  logout() {
    localStorage.removeItem('token');
    this.router.navigate(['login']);
  }

  login({ email, password }: any): Observable<any> {
    if (email === 'admin@gmail.com' && password === 'admin123') {
      this.setToken('abcdefghijklmnopqrstuvwxyz');
      return of({ name: 'Vaibhao Hatwar', email: 'admin@gmail.com' });
    }
    return throwError(new Error('Failed to login'));
  }
}
