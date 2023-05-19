import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  menuName: string = 'Login'
  userName!: null
  logedIn: boolean = false
  constructor(private _router: Router, private _auth: AuthService) {
    this._router.events.subscribe({
      next: (res) => {
        if (res instanceof NavigationEnd) {
          this.menuName = res.url.replace('/', '')
        }
      }
    });
    if (this._auth.user.value !== null) {
      console.log(_auth.user.value);
      this.logedIn = true
      this.userName = _auth.user.value.first_name
      console.log(this.userName);

    }
  }
  ngOnInit(): void {

  }
  logOut(): void {
    console.log(

      this._auth.user.value
    );
    localStorage.removeItem("_noteToken")
    this._router.navigate(["/login"])

  }


}
