import {Routes} from "@angular/router";

export default[
    {
        path:'zodiaco',
        loadComponent:()=> import('./zodiaco/zodiaco.component'),
    },
    {
        path:'empleados',
        loadComponent:()=> import('./empleados/empleados.component'),
    },
]as Routes