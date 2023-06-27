import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import { HomesComponent } from './components/homes/homes.component';

const routes: Routes = [
  {path:'', component: HomesComponent},
  {path:'login', component: LoginComponent},
  {path: 'sign', component: SignupComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
