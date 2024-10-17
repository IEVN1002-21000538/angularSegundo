import {Routes} from "@angular/router";

export default[
    {
        path:'zodiaco',
        loadComponent:()=> import('./zodiaco/zodiaco.component'),
    },
]as Routes