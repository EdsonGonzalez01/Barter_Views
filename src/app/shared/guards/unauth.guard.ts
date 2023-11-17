import { CanActivateFn, Router } from '@angular/router';
import { TokenService } from '../services/token.service';
import { inject } from '@angular/core';

export const unauthGuard: CanActivateFn = (route, state) => {
  const tokenService = inject(TokenService);
  const router = inject(Router);
  if(!tokenService.isLoggedIn()){
    return true;
  }
  else{
    router.navigate([''])
    return false;
  }
};
