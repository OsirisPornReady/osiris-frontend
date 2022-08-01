import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardLazyLoadGuard } from "./service/guard/dashboard-lazy-load/dashboard-lazy-load.guard";
import { DashboardGuard } from "./service/guard/dashboard/dashboard.guard";

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: '/login' },
  { path: 'welcome', loadChildren: () => import('./routes/welcome/welcome.module').then(m => m.WelcomeModule) },
  { path: 'dashboard',
    canLoad: [DashboardLazyLoadGuard],
    canActivate:[DashboardGuard],
    // data:{ //传参普适性差，最好用service
    //   guardRedirect: '/login',
    // },
    loadChildren: () => import('./routes/dashboard/dashboard.module').then(m => m.DashboardModule)},
  { path: 'login', loadChildren: () => import('./routes/login/login.module').then(m => m.LoginModule)},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
