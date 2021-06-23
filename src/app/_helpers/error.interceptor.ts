import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';
import { AuthenticationService } from '../_services';
import { ToastService } from '../_services/toast.service';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
    constructor(private authenticationService: AuthenticationService,
        private toastrservice: ToastrService,private toast: ToastService) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(request).pipe(catchError(err => {
            if (err.status === 401)
            {
                // auto logout if 401 response returned from api
                this.authenticationService.logout();
                location.reload(true);
            }

            if (err.status === 403) {
                // auto logout if 401 response returned from api
                 this.authenticationService.logout();
                 location.reload(true);
            }

            const error = err.error.message || err.statusText;
            this.toast.error(err.error, 'Error');
            return throwError(error);
        }))
    }
}
