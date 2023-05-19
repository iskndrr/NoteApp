import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import jwtDecode from 'jwt-decode';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private _httpClient: HttpClient,
    private _router:Router) { 
    this.userData()
  }

  user: BehaviorSubject<any> = new BehaviorSubject(null)

  register(formData: object): Observable<any> {
    return this._httpClient.post(environment.baseUrl + `signup`, formData)
  }
  login(formData: object): Observable<any> {
    return this._httpClient.post(environment.baseUrl + `signin`, formData)
  }

  userData(): void {
    const token = localStorage.getItem("_noteToken")
    if (token) {
      const decodedToken = jwtDecode(token)
      this.user.next(decodedToken);
      this._router.navigate(["/home"])
    }
  }
}
