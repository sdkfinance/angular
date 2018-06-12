import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router} from '@angular/router';
import {AuthorizationService} from '../authorization.service';
import {Injectable} from '@angular/core';

@Injectable()
export class NoRoleGuard implements CanActivate {

    constructor(private authorizationService: AuthorizationService, private router: Router) {
    }

    canActivate(route: ActivatedRouteSnapshot,
                state: RouterStateSnapshot) {
        if (this.authorizationService.userProfile.hasRole('anonym')) {
            this.router.navigate(['auth']);
            return false;
        } else if (this.authorizationService.userProfile.hasRole('administrator')) {
            this.router.navigate(['administrator']);
        } else if (this.authorizationService.userProfile.hasRole('merchant')) {
            this.router.navigate(['merchant']);
        } else if (this.authorizationService.userProfile.hasRole('individual')) {
            this.router.navigate(['individual']);
        } else if (this.authorizationService.userProfile.hasRole('compliance_specialist')) {
            this.router.navigate(['compliance']);
        } else if (this.authorizationService.userProfile.hasRole('cfo')) {
            this.router.navigate(['cfo']);
        } else if (this.authorizationService.userProfile.hasRole('accountant')) {
            this.router.navigate(['accountant']);
        } else if (this.authorizationService.userProfile.hasRole('cashier')) {
            this.router.navigate(['cashier']);
        }
    }

}
