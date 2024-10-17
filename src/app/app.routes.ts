import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path:'auth',
        loadChildren:()=> import('./auth/features/authroutes')
    },
    {
        path:'formulario',
        loadChildren:()=> import('./formulario/formulario.routes')
    },
    {
        path:'*',
        redirectTo:''
    },
];
