import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth.guard';

export const routes: Routes = [
    // {
    //     path: 'dashboard',
    //     redirectTo: 'dashboard'
    //     pathMatch: 'full'
    // },
    {
        path: 'auth',
        loadChildren: () => import('./features/auth/auth.routes').then(m => m.AUTH_ROUTES)
    },
    // {
    //     path: 'dashboard',
    //     loadChildren: () => import('./features/dashboard/dashboard.routes').then(m => m.DASHBOARD_ROUTES),
    //     canActivate: [authGuard]
    // },
    // {
    //     path: 'parcels',
    //     loadChildren: () => import('./features/parcel/parcel.routes').then(m => m.PARCEL_ROUTES),
    //     canActivate: [authGuard]
    // },
    // {
    //     path: 'tracking',
    //     loadChildren: () => import('./features/tracking/tracking.routes').then(m => m.TRACKING_ROUTES)
    // },
    // {
    //     path: '**',
    //     redirectTo: 'dashboard'
    // }
];
