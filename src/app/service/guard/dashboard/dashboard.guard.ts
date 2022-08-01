import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { UserService } from "../../user/user.service";
import { CommonDataService } from "../../common-data/common-data.service";

@Injectable({
  providedIn: 'root'
})
export class DashboardGuard implements CanActivate {

  constructor(
    private userService: UserService,
    private commonDataService: CommonDataService,
    private router: Router,
  ) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

      // let guardRedirect = route.data['guardRedirect']
      let guardRedirect = this.commonDataService.guardRedirects.dashboard;

      if (this.userService.getCurrentUser()) {
        return true;
      } else {
        this.router.navigate([guardRedirect]);
        return false;
      }
  }

}
