import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: '/login' },
  { path: 'welcome', loadChildren: () => import('./routes/welcome/welcome.module').then(m => m.WelcomeModule) },
  { path: 'dashboard', loadChildren: () => import('./routes/dashboard/dashboard.module').then(m => m.DashboardModule)},
  { path: 'login', loadChildren: () => import('./routes/login/login.module').then(m => m.LoginModule)},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
