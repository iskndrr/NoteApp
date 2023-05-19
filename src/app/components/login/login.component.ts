import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  hide = true;

  loginForm!: FormGroup

  constructor(
    private _formBuilder: FormBuilder,
     private _auth: AuthService,
    // private _toaster: ToastrService,
     private _router: Router) { }


  ngOnInit(): void {
    this.createForm()
  }


  createForm(): void {
    this.loginForm = this._formBuilder.group({
      email: ['', [Validators.email, Validators.required]],
      password: ['', [Validators.required, Validators.pattern(/^[A-Z][a-z0-9]{3,8}$/)]],
    })
  }

  login(formData: FormGroup) {
    if (formData.valid) {
      this._auth.login(formData.value).subscribe({
        next: (res) => {
          console.log(res);
          if (res.message === 'success') {
           
            console.log(res);
           
            localStorage.setItem("_noteToken", res.token)
           
            this._auth.userData()
           
            this._router.navigate(["/home"])
           }
          
        },
        error:(err)=>{
          console.log(err);
          
        }
      })
    }

  }

}
