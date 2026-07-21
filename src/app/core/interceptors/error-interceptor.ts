import { HttpInterceptorFn, HttpErrorResponse } from '@angular/common/http';
import { catchError, throwError } from 'rxjs';

export const errorInterceptor: HttpInterceptorFn = (req, next) => {
  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      console.error(`HTTP ${error.status} on ${req.url}: ${error.message}`);
      // ...here is where you'd redirect on 401, toast on 5xx, etc.
      return throwError(() => error);
    }),
  );
};
