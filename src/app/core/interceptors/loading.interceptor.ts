import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { Store } from '@ngrx/store';
import { finalize } from 'rxjs';
import { showLoading, hideLoading } from '../../store/ui/ui.actions';

export const loadingInterceptor: HttpInterceptorFn = (req, next) => {
  const spinnerService = inject(NgxSpinnerService);
  const store = inject(Store);

  const excludedUrls = ['/api/health', '/api/ping'];
  const shouldShowLoading = !excludedUrls.some((url) => req.url.includes(url));

  if (shouldShowLoading) {
    spinnerService.show();
    store.dispatch(showLoading());
  }

  return next(req).pipe(
    finalize(() => {
      if (shouldShowLoading) {
        spinnerService.hide();
        store.dispatch(hideLoading());
      }
    })
  );
};
