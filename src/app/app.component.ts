import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Ejemplo1Component } from './formulario/ejemplo1/ejemplo1.component';
import ZodiacoComponent from './formulario/zodiaco/zodiaco.component';
import EmpleadosComponent from './formulario/empleados/empleados.component';
// import { ZodiacoComponent } from "./formulario/zodiaco/zodiaco.component";

//en imports se agregan las librerias
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, Ejemplo1Component, ZodiacoComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'angularSegundo';
}
