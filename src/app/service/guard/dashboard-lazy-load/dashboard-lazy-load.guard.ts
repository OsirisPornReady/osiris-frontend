import { Injectable } from '@angular/core';
import { CanLoad, Route, UrlSegment, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { UserService } from "../../user/user.service";
import { CommonDataService } from "../../common-data/common-data.service";

@Injectable({
  providedIn: 'root'
})
export class DashboardLazyLoadGuard implements CanLoad {

  constructor(
    private userService: UserService,
    private commonService: CommonDataService,
    private router: Router,
  ) { }

  canLoad(
    route: Route,
    segments: UrlSegment[]): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

      let guardRedirect = this.commonService.guardRedirects.dashboardLazyLoad;

      if (this.userService.getCurrentUser()) {
        return true;
      } else {
        this.router.navigate([guardRedirect])
        return false;
      }
  }

}
