import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';

interface Usuarios{
  nombre:string;
  edad:number;
  email:string;
}

@Component({
  selector: 'app-ejemplo1',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './ejemplo1.component.html',
  // template: `
  //   <p>
  //     ejemplo1 works!
  //   </p>
  // `,
  styles: ``
})
export class Ejemplo1Component implements OnInit{
  formGroup!:FormGroup;

  materia='pwa'
  tem=''
  alumnos:Usuarios={
    nombre:'',
    edad:0,
    email:''
  }

  constructor(private fb:FormBuilder){}

  ngOnInit(): void {
    this.formGroup=this.initForm();
  }
  initForm():FormGroup{
    return this.fb.group({
      nombre:[''],
      edad:[''],
      email:[''],
    })
  }
  onSubmit():void{
    //desestructuracion
    const{nombre,edad,email}=this.formGroup.value;
    this.alumnos.nombre=nombre;
    this.alumnos.edad=edad;
    this.alumnos.email=email;

    console.log(this.formGroup.value);
    localStorage.setItem('materia',this.materia);
  }

  subImprimir():void{
    //se le agrega el ! porque no sabemos cual es el valor que va a llegar de tem
    this.tem=localStorage.getItem('materia')!
    const alumnoGuardado=localStorage.getItem('alumno')
    //local storage
    if(alumnoGuardado){
      const alumno:Usuarios=JSON.parse(alumnoGuardado)
    }
    //console.log(this.alumnos);
  }
}
