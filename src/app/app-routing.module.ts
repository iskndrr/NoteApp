import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BlankLayoutComponent } from './layout/blank-layout/blank-layout.component';
import { HomeComponent } from './components/home/home.component';
import { AuthLayoutComponent } from './layout/auth-layout/auth-layout.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { NotfoundComponent } from './components/notfound/notfound.component';
import { auth } from './core/gurds/auth.guard';

const routes: Routes = [
  {path:'',
  canActivate:[auth] ,
  component:BlankLayoutComponent,children:[
    {path:'',redirectTo:'home',pathMatch:'full'},

    {path:'home',component:HomeComponent, title:"Home"}
  ]},
  {path:'', component:AuthLayoutComponent,children:[
    {path:'',redirectTo:'login',pathMatch:'full'},
    {path:'login',component:LoginComponent,title:'LogIn'},
    {path:'register',component:RegisterComponent,title:'Register'}
  ]},{path:'**' , component:NotfoundComponent,title:'Error 404'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes , {useHash:true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
