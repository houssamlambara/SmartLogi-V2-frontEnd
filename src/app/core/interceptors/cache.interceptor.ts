import { HttpInterceptorFn, HttpResponse } from '@angular/common/http';
import { inject } from '@angular/core';
import { of, tap, shareReplay } from 'rxjs';

const cache = new Map<string, { response: HttpResponse<any>; timestamp: number }>();
const CACHE_DURATION = 5 * 60 * 1000;

export const cacheInterceptor: HttpInterceptorFn = (req, next) => {
  if (req.method !== 'GET') {
    return next(req);
  }

  const noCacheUrls = ['/auth/', '/logout'];
  if (noCacheUrls.some((url) => req.url.includes(url))) {
    return next(req);
  }

  const cachedResponse = cache.get(req.urlWithParams);

  if (cachedResponse) {
    const age = Date.now() - cachedResponse.timestamp;

    if (age < CACHE_DURATION) {
      return of(cachedResponse.response.clone());
    } else {
      cache.delete(req.urlWithParams);
    }
  }

  return next(req).pipe(
    tap((event) => {
      if (event instanceof HttpResponse) {
        cache.set(req.urlWithParams, {
          response: event.clone(),
          timestamp: Date.now(),
        });
      }
    }),
    shareReplay(1)
  );
};

export function clearCache(): void {
  cache.clear();
}

export function removeCacheEntry(url: string): void {
  cache.delete(url);
}
