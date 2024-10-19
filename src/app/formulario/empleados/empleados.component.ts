import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common'; 
import { ChangeDetectorRef } from '@angular/core';


interface Empleado {
  matricula: string;
  nombre: string;
  correo: string;
  edad: number;
  horasTrabajadas: number;
  sueldoBase: number;
  horasExtras: number;
  subTotal: number;
}

@Component({
  selector: 'app-empleados',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule], 
  templateUrl: './empleados.component.html',
  styleUrl: './empleados.component.css'
})
export default class EmpleadosComponent implements OnInit {
  empleados: Empleado[] = [];
  formGroup!: FormGroup;
  horasNormales = 40;
  pagoPorHora = 70;
  pagoPorHoraExtra = 140;
  empleadoEnEdicion: Empleado | null = null;  

  constructor(private fb: FormBuilder, private cd: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.formGroup = this.fb.group({
      matricula: ['', Validators.required],
      nombre: ['', Validators.required],
      correo: ['', [Validators.required, Validators.email]],
      edad: ['', Validators.required],
      horasTrabajadas: ['', Validators.required]
    });
  
    
    this.empleados = [];  
  }
  

  registrarOActualizarEmpleado(): void {
    if (this.empleadoEnEdicion) {
      // Si estamos editando, actualizamos el empleado
      this.modificarEmpleado();
    } else {
      // Si no, registramos un nuevo empleado
      this.registrarEmpleado();
    }
  }

  calcularSueldoBase(horasTrabajadas: number): number {
    const horasNormales = Math.min(horasTrabajadas, this.horasNormales);
    return horasNormales * this.pagoPorHora;
  }
  
  calcularHorasExtras(horasTrabajadas: number): number {
  return horasTrabajadas > this.horasNormales ? horasTrabajadas - this.horasNormales : 0;
}
  
  calcularSubTotal(horasTrabajadas: number): number {
    const sueldoBase = this.calcularSueldoBase(horasTrabajadas);
    const horasExtras = this.calcularHorasExtras(horasTrabajadas);
    return sueldoBase + (horasExtras * this.pagoPorHoraExtra);
  }

  calcularTotalPagar(): number {
    return this.empleados.reduce((total, emp) => {
      const subTotal = emp.subTotal ?? this.calcularSubTotal(emp.horasTrabajadas); 
      return total + (subTotal || 0); 
    }, 0);
  }
  

  registrarEmpleado(): void {
    const { matricula, nombre, correo, edad, horasTrabajadas } = this.formGroup.value;
  
   
    const sueldoBase = this.calcularSueldoBase(horasTrabajadas);
    const horasExtras = this.calcularHorasExtras(horasTrabajadas);
    const subTotal = sueldoBase + horasExtras * this.pagoPorHoraExtra;
  
    const nuevoEmpleado: Partial<Empleado> = {
      matricula,
      nombre,
      correo,
      edad,
      horasTrabajadas
    };
  
    // Almacenar en localStorage
    let empleadosGuardados = localStorage.getItem('empleados');
    const empleados = empleadosGuardados ? JSON.parse(empleadosGuardados) : [];
    empleados.push(nuevoEmpleado);
    localStorage.setItem('empleados', JSON.stringify(empleados));
  
    // Limpiar formulario después de registrar
    this.formGroup.reset();
  }
  
  

  modificarEmpleado(): void {
    const { matricula, nombre, correo, edad, horasTrabajadas } = this.formGroup.value;
    
  
    const empleadoIndex = this.empleados.findIndex(emp => emp.matricula === matricula);
  
    if (empleadoIndex !== -1) {
      
      this.empleados[empleadoIndex].nombre = nombre;
      this.empleados[empleadoIndex].correo = correo;
      this.empleados[empleadoIndex].edad = edad;
      this.empleados[empleadoIndex].horasTrabajadas = horasTrabajadas;
  
     
      this.empleados[empleadoIndex].sueldoBase = this.calcularSueldoBase(horasTrabajadas);
      this.empleados[empleadoIndex].horasExtras = this.calcularHorasExtras(horasTrabajadas);
      this.empleados[empleadoIndex].subTotal = this.empleados[empleadoIndex].sueldoBase + (this.empleados[empleadoIndex].horasExtras * this.pagoPorHoraExtra);
  
      
      localStorage.setItem('empleados', JSON.stringify(this.empleados));
  
      this.cd.detectChanges(); 
    } else {
      console.log('Empleado no encontrado para modificar.');
    }
  
  
    this.formGroup.reset();
  }
  
  


  buscarEmpleadoPorMatricula(): void {
    const matricula = this.formGroup.get('matricula')?.value;
    const empleado = this.empleados.find(emp => emp.matricula === matricula);

    if (empleado) {
      this.empleadoEnEdicion = empleado;
      this.formGroup.setValue({
        matricula: empleado.matricula,
        nombre: empleado.nombre,
        correo: empleado.correo,
        edad: empleado.edad,
        horasTrabajadas: empleado.horasTrabajadas
      });
    } else {
      alert("Empleado no encontrado.");
      this.empleadoEnEdicion = null;
    }
  }

  eliminarEmpleadoPorMatricula(): void {
    const matricula = this.formGroup.get('matricula')?.value;
    const empleadoIndex = this.empleados.findIndex(emp => emp.matricula === matricula);

    if (empleadoIndex !== -1) {
      this.empleados.splice(empleadoIndex, 1);
      this.actualizarLocalStorage();
      this.formGroup.reset();
      this.cd.detectChanges();
    } else {
      alert("Empleado no encontrado.");
    }
  }


  actualizarLocalStorage(): void {
    localStorage.setItem('empleados', JSON.stringify(this.empleados));
  }

  trackByMatricula(index: number, empleado: Empleado): string {
    return empleado.matricula;
  }

  imprimirTabla(): void {
    
    const empleadosGuardados = localStorage.getItem('empleados');
    
    if (empleadosGuardados) {
      this.empleados = JSON.parse(empleadosGuardados);  
      this.cd.detectChanges(); 
 
    } else {
      console.log('No hay empleados almacenados en LocalStorage.');
    }
  }
  
  
  
}
