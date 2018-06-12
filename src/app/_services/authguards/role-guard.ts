import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router} from '@angular/router';
import {AuthorizationService} from '../authorization.service';
import {Injectable} from '@angular/core';

@Injectable()
export class RoleGuard implements CanActivate {

    constructor(private authorizationService: AuthorizationService, private router: Router) {
    }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {

        let roles = route.data['roles'] as Array<string>;

        for (let role of roles) {
            if (this.authorizationService.userProfile.hasRole(role)) {
                return true;
            }
        }

        // redirect merchant to the same page if individual office is opened
        if (route.data['office'] === 'individual' && this.authorizationService.userProfile.hasRole('merchant')) {
            const path = 'merchant/' + location.href.split('individual/')[1];
            this.router.navigate([path]);
            return false;
        }

        if (this.authorizationService.userProfile.hasRole('anonym')) {
            this.router.navigate(['auth']);
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

        return false;
    }

}
