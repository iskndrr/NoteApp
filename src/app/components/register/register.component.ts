import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
// import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
 
  hide = true;

  registerForm!: FormGroup

  constructor(
    private _formBuilder: FormBuilder,
     private _auth: AuthService,
    // private _toaster: ToastrService,
     private _router: Router) { }


  ngOnInit(): void {
    this.createForm()
  }


  createForm(): void {
    this.registerForm = this._formBuilder.group({
      first_name: ['', [Validators.required]],
      last_name: ['', [Validators.required]],
      email: ['', [Validators.email, Validators.required]],
      password: ['', [Validators.required, Validators.pattern(/^[A-Z][a-z0-9]{3,8}$/)]],
      age: ['', [Validators.required]],
    })
  }

  register(formData: FormGroup) {
    if (formData.valid) {
      this._auth.register(formData.value).subscribe({
        next: (res) => {
          console.log(res);
          if (res.message === 'success') {
            this._router.navigate(["/login"])
           }
          
        },
        error:(err)=>{
          console.log(err);
          
        }
      })
    }

  }




}
