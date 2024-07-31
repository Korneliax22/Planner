import {HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Injectable} from '@angular/core';
import { TokenStorageService } from './token-storage.service';

const TOKEN_KEY = 'Authorization';
@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private tokenStorage: TokenStorageService) { }
    intercept(req: HttpRequest<any>, next: HttpHandler){

        const token = this.tokenStorage.getToken();
        if(token != null) {
          req = req.clone({
            headers:req.headers.set(TOKEN_KEY, 'Bearer ' + token)
          });
        }
      return next.handle(req);
    }

}
